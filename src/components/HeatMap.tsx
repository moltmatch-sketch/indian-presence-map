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
      antialias: true, // Smoother rendering
    });

    map.current.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.current.on("load", () => {
      if (!map.current) return;

      map.current.addSource("indian-population", {
        type: "geojson",
        data: toGeoJSON(data) as any,
      });

      // 1. HEATMAP LAYER - "Thermal Energy" Style
      map.current.addLayer({
        id: "indian-population-heat",
        type: "heatmap",
        source: "indian-population",
        maxzoom: 9,
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 0, 0, 1000000, 1],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0, 0, 0, 0)",
            0.1,
            "rgba(65, 105, 225, 0.1)", // Deep blue base
            0.3,
            "rgba(255, 165, 0, 0.4)", // Saffron/Orange
            0.6,
            "rgba(255, 69, 0, 0.7)", // Red-Orange
            0.9,
            "rgba(255, 215, 0, 0.9)", // Golden Glow
            1,
            "rgba(255, 255, 255, 1)", // Pure White Core
          ],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 20, 9, 80],
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
        },
      });

      // 2. POINT LAYER - "Glowing Halo" Style
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
            ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 10000, 2, 1000000, 8],
            9,
            ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 10000, 6, 1000000, 25],
          ],
          "circle-color": "#FF9933", // Saffron
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-opacity": 0.5,
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.2, 8, 0.8],
          "circle-blur": 0.2, // Softens the edge for a light-emissive look
        },
      });

      setIsLoaded(true);

      popup.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "custom-map-popup",
        offset: 15,
      });

      // Hover Interaction
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
            <div class="popup-container">
              <div class="popup-header">${props.city}, ${props.state}</div>
              <div class="popup-value">${Number(props.indianPopulation).toLocaleString()}</div>
              <div class="popup-label">Community Members</div>
              <div class="popup-footer">${props.percentIndian}% of local population</div>
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
    });

    return () => map.current?.remove();
  }, []);

  useEffect(() => {
    updateMapData();
  }, [updateMapData]);

  return (
    <div className="w-full h-full relative group">
      <div ref={mapContainer} className="absolute inset-0 grayscale-[20%] contrast-[110%]" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-950/90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs uppercase tracking-widest text-orange-500 font-bold">Initializing Engine</span>
          </div>
        </div>
      )}
    </div>
  );
};
