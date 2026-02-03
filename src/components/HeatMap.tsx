import { useRef, useEffect, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LocationData, toGeoJSON } from "@/data/demographicData";

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

  const updateMapData = useCallback(() => {
    // During initial load and during style reloads (common with HMR), MapLibre's
    // internal `style` can be temporarily undefined; calling getSource() then throws.
    if (!map.current || !isLoaded) return;

    try {
      if (!map.current.getStyle()) return;

      const source = map.current.getSource("indian-population") as maplibregl.GeoJSONSource | undefined;
      if (!source) return;
      source.setData(toGeoJSON(data) as any);
    } catch {
      // Intentionally ignore transient errors while the map is re-initializing.
      return;
    }
  }, [data, isLoaded]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Detect mobile for initial view
    const isMobile = window.innerWidth < 768;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: isMobile ? [-95, 45] : [-98, 39], // Shift center for mobile
      zoom: isMobile ? 2.5 : 3.8, // Zoom out more on mobile
      minZoom: 2,
      maxZoom: 12,
      antialias: true,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      map.current.addSource("indian-population", {
        type: "geojson",
        data: toGeoJSON(data) as any,
      });

      // 1. AMBIENT GLOW (Reduced for mobile)
      map.current.addLayer({
        id: "population-glow",
        type: "circle",
        source: "indian-population",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 30, 10, 120],
          "circle-color": "#FF9933",
          "circle-blur": 2.0,
          "circle-opacity": 0.05,
        },
      });

      // 2. REFINED HEATMAP (Scale reduced for mobile)
      map.current.addLayer({
        id: "indian-population-heat",
        type: "heatmap",
        source: "indian-population",
        maxzoom: 9,
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["to-number", ["get", "indianPopulation"]],
            0,
            0,
            10000,
            0.2,
            500000,
            1,
          ],
          // REDUCED INTENSITY: Prevents the "whiteout" effect
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 0.5, 5, 1.2, 9, 2],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0,0,0,0)",
            0.15,
            "rgba(30, 64, 175, 0.2)",
            0.4,
            "rgba(255, 153, 51, 0.6)",
            0.7,
            "rgba(255, 87, 34, 0.85)",
            0.9,
            "rgba(255, 255, 255, 0.95)",
            1,
            "rgba(255, 255, 255, 1)",
          ],
          // REFINED RADIUS: Tighter blobs that don't overwhelm small screens
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 8, 3, 20, 5, 45, 8, 80, 12, 30],
          "heatmap-opacity": 0.8,
        },
      });

      // 3. EMISSIVE POINTS (More visible on hover/zoom)
      map.current.addLayer({
        id: "indian-population-point",
        type: "circle",
        source: "indian-population",
        minzoom: 4,
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            3,
            10,
            ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 10000, 8, 800000, 30],
          ],
          "circle-color": "#FF9933",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0, 6, 0.8],
        },
      });

      setIsLoaded(true);

      popup.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "professional-popup",
        offset: 15,
      });

      map.current.on("mouseenter", "indian-population-point", (e) => {
        if (!map.current || !e.features?.[0]) return;
        map.current.getCanvas().style.cursor = "crosshair";
        const props = e.features[0].properties as any;

        popup.current
          ?.setLngLat((e.features[0].geometry as any).coordinates)
          .setHTML(
            `
            <div class="popup-inner">
              <div class="popup-loc-tag">${props.city}, ${props.state}</div>
              <div class="popup-val-container">
                <span class="popup-main-val">${Number(props.indianPopulation).toLocaleString()}</span>
                <span class="popup-sub-tag">MEMBERS</span>
              </div>
              <div class="popup-stat">
                <span class="stat-label">LOCAL DENSITY</span>
                <span class="stat-val">${props.percentIndian}%</span>
              </div>
            </div>
          `,
          )
          .addTo(map.current!);
      });

      map.current.on("mouseleave", "indian-population-point", () => {
        map.current!.getCanvas().style.cursor = "";
        popup.current?.remove();
      });
    });

    return () => {
      popup.current?.remove();
      popup.current = null;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    updateMapData();
  }, [updateMapData]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#05080a]">
      <div ref={mapContainer} className="absolute inset-0 grayscale-[10%] contrast-[110%] brightness-[95%]" />

      {/* Mobile-Friendly Legend */}
      <div className="absolute bottom-6 right-6 md:right-12 z-10 glass-panel p-3 rounded-lg border border-white/10 hidden sm:block">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Population Density</p>
        <div className="h-2 w-32 bg-gradient-to-r from-blue-900 via-orange-500 to-white rounded-full" />
        <div className="flex justify-between mt-1 text-[8px] text-slate-500 font-bold">
          <span>LOW</span>
          <span>HIGH</span>
        </div>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-orange-500">Mapping Diaspora</p>
          </div>
        </div>
      )}
    </div>
  );
};
