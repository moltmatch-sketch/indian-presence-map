import { useRef, useEffect, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LocationData, toGeoJSON } from "@/data/demographicData";

/**
 * Professional HeatMap Component
 * Features:
 * - Thermal intensity gradients
 * - Glassmorphism popups
 * - Normalized population scaling
 */

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

interface HeatMapProps {
  data: LocationData[];
  onLocationSelect?: (location: LocationData | null) => void;
  selectedLocation?: LocationData | null;
}

export const HeatMap = ({ data, onLocationSelect, selectedLocation }: HeatMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync data updates to the map source
  const updateMapData = useCallback(() => {
    if (!map.current || !isLoaded) return;
    const source = map.current.getSource("indian-population") as maplibregl.GeoJSONSource;
    if (source) {
      source.setData(toGeoJSON(data) as any);
    }
  }, [data, isLoaded]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-98, 45],
      zoom: 3.8,
      minZoom: 2,
      maxZoom: 12,
      antialias: true,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.current.on("load", () => {
      if (!map.current) return;

      map.current.addSource("indian-population", {
        type: "geojson",
        data: toGeoJSON(data) as any,
      });

      // 1. THE HEATMAP LAYER - "Thermal Energy" style
      map.current.addLayer({
        id: "indian-population-heat",
        type: "heatmap",
        source: "indian-population",
        maxzoom: 9,
        paint: {
          // Weight based on population; casting to-number for safety
          "heatmap-weight": ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 0, 0, 850000, 1],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0,0,0,0)",
            0.1,
            "rgba(65, 105, 225, 0.15)", // Deep cool blue
            0.3,
            "rgba(255, 153, 51, 0.4)", // Saffron
            0.6,
            "rgba(255, 87, 34, 0.7)", // Deep Orange
            0.9,
            "rgba(255, 215, 0, 0.9)", // Golden Glow
            1,
            "rgba(255, 255, 255, 1)", // White Hot Center
          ],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 25, 9, 85],
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0.9, 9, 0],
        },
      });

      // 2. THE CIRCLE LAYER - "Emissive Glow" style
      map.current.addLayer({
        id: "indian-population-point",
        type: "circle",
        source: "indian-population",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 10000, 2, 850000, 12],
            10,
            ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 10000, 8, 850000, 40],
          ],
          "circle-color": "#FF9933", // Official Saffron
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-opacity": 0.4,
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.1, 8, 0.8],
          "circle-blur": 0.15,
        },
      });

      // 3. THE LABEL LAYER - Minimalist typography
      map.current.addLayer({
        id: "indian-population-labels",
        type: "symbol",
        source: "indian-population",
        minzoom: 6,
        layout: {
          "text-field": ["get", "city"],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 11,
          "text-offset": [0, 2],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "rgba(0,0,0,0.8)",
          "text-halo-width": 1.5,
          "text-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0, 7, 1],
        },
      });

      setIsLoaded(true);

      // Popup initialization
      popup.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "professional-popup",
        offset: 15,
      });

      // Hover logic with Data Hierarchy
      map.current.on("mouseenter", "indian-population-point", (e) => {
        if (!map.current || !e.features?.[0]) return;
        map.current.getCanvas().style.cursor = "crosshair";

        const feature = e.features[0];
        const coords = (feature.geometry as any).coordinates.slice();
        const props = feature.properties as any;

        popup.current
          ?.setLngLat(coords)
          .setHTML(
            `
            <div class="popup-inner">
              <div class="popup-loc-tag">${props.city}, ${props.state}</div>
              <div class="popup-val-container">
                <span class="popup-main-val">${Number(props.indianPopulation).toLocaleString()}</span>
                <span class="popup-sub-tag">MEMBERS</span>
              </div>
              <div class="popup-divider"></div>
              <div class="popup-stat">
                <span class="stat-label">DENSITY</span>
                <span class="stat-val">${props.percentIndian}%</span>
              </div>
            </div>
          `,
          )
          .addTo(map.current!);
      });

      map.current.on("mouseleave", "indian-population-point", () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = "";
        popup.current?.remove();
      });

      // Selection logic
      map.current.on("click", "indian-population-point", (e) => {
        if (!e.features?.[0]) return;
        const props = e.features[0].properties as any;
        const location = data.find((d) => d.id === props.id);
        if (location && onLocationSelect) onLocationSelect(location);
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    updateMapData();
  }, [updateMapData]);

  // Viewport sync for selected location
  useEffect(() => {
    if (selectedLocation && map.current) {
      map.current.flyTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 9,
        duration: 2000,
        essential: true,
      });
    }
  }, [selectedLocation]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950">
      <div ref={mapContainer} className="absolute inset-0 grayscale-[15%] contrast-[105%]" />

      {/* Loading State Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-500/80">
              Synchronizing Intelligence
            </p>
          </div>
        </div>
      )}

      {/* Embedded CSS for Popup styling (Easier to manage) */}
      <style>{`
        .professional-popup .maplibregl-popup-content {
          background: rgba(15, 23, 42, 0.85) !important;
          backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;
        }
        .professional-popup .maplibregl-popup-tip {
          border-top-color: rgba(15, 23, 42, 0.85) !important;
        }
        .popup-inner {
          padding: 16px;
          min-width: 200px;
          font-family: 'Inter', sans-serif;
        }
        .popup-loc-tag {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          margin-bottom: 2px;
        }
        .popup-val-container {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 12px;
        }
        .popup-main-val {
          font-size: 1.75rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
        }
        .popup-sub-tag {
          font-size: 10px;
          font-weight: 700;
          color: #FF9933;
        }
        .popup-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 10px;
        }
        .popup-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .stat-label {
          font-size: 9px;
          font-weight: 600;
          color: #64748b;
        }
        .stat-val {
          font-size: 11px;
          font-weight: 700;
          color: #f8fafc;
        }
      `}</style>
    </div>
  );
};
