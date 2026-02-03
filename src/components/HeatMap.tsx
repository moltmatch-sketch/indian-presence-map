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
    // Guard against style not being ready (happens during HMR)
    try {
      if (!map.current.getStyle()) return;
      const source = map.current.getSource("indian-population") as maplibregl.GeoJSONSource;
      if (source) {
        source.setData(toGeoJSON(data) as any);
      }
    } catch (error) {
      console.warn("Map not ready for data update:", error);
    }
  }, [data, isLoaded]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-98, 39],
      zoom: 4,
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

      // 1. DENSITY GLOW (Ambient Filler)
      map.current.addLayer({
        id: "population-glow",
        type: "circle",
        source: "indian-population",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 60, 10, 240],
          "circle-color": "#FF9933",
          "circle-blur": 2.5,
          "circle-opacity": 0.1,
        },
      });

      // 2. FLUID HEATMAP
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
            0.3,
            100000,
            0.7,
            800000,
            1,
          ],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 5, 3, 9, 5],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0,0,0,0)",
            0.1,
            "rgba(30, 64, 175, 0.2)",
            0.3,
            "rgba(255, 153, 51, 0.5)",
            0.6,
            "rgba(255, 87, 34, 0.8)",
            0.9,
            "rgba(255, 255, 255, 0.9)",
            1,
            "rgba(255, 255, 255, 1)",
          ],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 35, 4, 100, 7, 130, 9, 50],
          "heatmap-opacity": 0.85,
        },
      });

      // 3. EMISSIVE POINTS
      map.current.addLayer({
        id: "indian-population-point",
        type: "circle",
        source: "indian-population",
        minzoom: 5,
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 10000, 2, 800000, 8],
            10,
            ["interpolate", ["linear"], ["to-number", ["get", "indianPopulation"]], 10000, 8, 800000, 35],
          ],
          "circle-color": "#FF9933",
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-opacity": 0.5,
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 5, 0, 7, 0.8],
          "circle-blur": 0.1,
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

        // This HTML structure now uses explicit white/slate colors to avoid "empty box" looks
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

    return () => map.current?.remove();
  }, []);

  useEffect(() => {
    updateMapData();
  }, [updateMapData]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#05080a]">
      <div ref={mapContainer} className="absolute inset-0 grayscale-[10%] contrast-[110%] brightness-[90%]" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-orange-500">Analysing Geo-Data</p>
          </div>
        </div>
      )}
    </div>
  );
};
