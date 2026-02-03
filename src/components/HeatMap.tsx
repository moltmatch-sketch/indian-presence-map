import { useRef, useEffect, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LocationData, toGeoJSON } from '@/data/demographicData';

// Free dark map style from Carto
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

interface HeatMapProps {
  data: LocationData[];
  onLocationSelect?: (location: LocationData | null) => void;
  selectedLocation?: LocationData | null;
}

export const HeatMap = ({ data, onLocationSelect, selectedLocation }: HeatMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);
  const dataRef = useRef<LocationData[]>(data);
  const [isLoaded, setIsLoaded] = useState(false);

  // Keep dataRef in sync with prop
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Update map data when filtered data changes
  const updateMapData = useCallback(() => {
    if (!map.current || !isLoaded) return;

    const source = map.current.getSource('indian-population') as maplibregl.GeoJSONSource;
    if (source) {
      const geoJSON = toGeoJSON(dataRef.current);
      console.log('Updating map with', dataRef.current.length, 'locations');
      source.setData(geoJSON as any);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-98, 45], // Center between US and Canada
      zoom: 3.5,
      minZoom: 2,
      maxZoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Initialize with EMPTY data - the updateMapData effect will populate it
      map.current.addSource('indian-population', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      // Add layers on top of basemap (default behavior adds to top)

      // Add heat map layer with to-number coercion for string safety
      map.current.addLayer(
        {
          id: 'indian-population-heat',
          type: 'heatmap',
          source: 'indian-population',
          maxzoom: 9,
          paint: {
            // Use to-number to handle string values from GeoJSON properties
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['to-number', ['get', 'indianPopulation']],
              0, 0,
              50000, 0.7,
              100000, 0.9,
              300000, 1,
              850000, 1
            ],
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 1,
              5, 2,
              9, 3
            ],
          'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(0, 0, 0, 0)',
              0.1, 'rgba(255, 152, 67, 0.4)',
              0.3, 'rgba(255, 120, 50, 0.6)',
              0.5, 'rgba(255, 87, 34, 0.75)',
              0.7, 'rgba(244, 67, 54, 0.85)',
              0.9, 'rgba(211, 47, 47, 0.95)',
              1, 'rgba(183, 28, 28, 1)'
            ],
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 25,
              3, 40,
              5, 55,
              9, 70
            ],
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              6, 1,
              8, 0.6,
              9, 0
            ],
          },
        },
      );

      // Add circle layer with to-number coercion
      map.current.addLayer(
        {
          id: 'indian-population-point',
          type: 'circle',
          source: 'indian-population',
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['to-number', ['get', 'indianPopulation']],
              10000, 5,
              50000, 9,
              100000, 13,
              250000, 18,
              850000, 24
            ],
            'circle-color': [
              'interpolate',
              ['linear'],
              ['to-number', ['get', 'percentIndian']],
              0, '#FF8A65',
              8, '#FF7043',
              15, '#FF5722',
              25, '#E64A19',
              35, '#D84315'
            ],
            'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
            'circle-stroke-width': 1.5,
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 0.5,
              5, 0.7,
              8, 0.95
            ],
          },
        },
      );

      // Add labels for cities (on top)
      map.current.addLayer({
        id: 'indian-population-labels',
        type: 'symbol',
        source: 'indian-population',
        minzoom: 7,
        layout: {
          'text-field': ['get', 'city'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-offset': [0, 1.5],
          'text-anchor': 'top',
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#000000',
          'text-halo-width': 1,
          'text-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 0,
            8, 1
          ],
        },
      });

      setIsLoaded(true);

      // Create popup
      popup.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'indian-map-popup',
      });

      // Add hover interactions
      map.current.on('mouseenter', 'indian-population-point', (e) => {
        if (!map.current || !e.features?.[0]) return;
        
        map.current.getCanvas().style.cursor = 'pointer';
        
        const feature = e.features[0];
        const coords = (feature.geometry as any).coordinates.slice();
        const props = feature.properties as any;
        
        const popupContent = `
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-lg text-white mb-1">${props.city}, ${props.state}</h3>
            <p class="text-orange-400 font-semibold text-xl">${Number(props.indianPopulation).toLocaleString()}</p>
            <p class="text-gray-400 text-sm">Indian Population</p>
            <div class="mt-2 pt-2 border-t border-gray-700">
              <p class="text-gray-300 text-sm">${Number(props.percentIndian).toFixed(1)}% of total population</p>
            </div>
          </div>
        `;
        
        popup.current?.setLngLat(coords).setHTML(popupContent).addTo(map.current!);
      });

      map.current.on('mouseleave', 'indian-population-point', () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = '';
        popup.current?.remove();
      });

      // Add click interactions - use a ref to get current data
      map.current.on('click', 'indian-population-point', (e) => {
        if (!e.features?.[0] || !onLocationSelect) return;
        
        const props = e.features[0].properties as any;
        // Find location by id from current data
        const source = map.current?.getSource('indian-population') as maplibregl.GeoJSONSource;
        if (source) {
          onLocationSelect({
            id: props.id,
            city: props.city,
            state: props.state,
            country: props.country,
            latitude: (e.features[0].geometry as any).coordinates[1],
            longitude: (e.features[0].geometry as any).coordinates[0],
            indianPopulation: Number(props.indianPopulation),
            totalPopulation: Number(props.totalPopulation),
            percentIndian: Number(props.percentIndian),
            communities: JSON.parse(props.communities || '[]'),
            pointsOfInterest: JSON.parse(props.pointsOfInterest || '[]'),
          });
        }
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [onLocationSelect]);

  // Update data when it changes or map loads
  useEffect(() => {
    if (isLoaded) {
      updateMapData();
    }
  }, [isLoaded, data, updateMapData]);

  // Fly to selected location
  useEffect(() => {
    if (selectedLocation && map.current) {
      map.current.flyTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 9,
        duration: 1500,
      });
    }
  }, [selectedLocation]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Custom popup styles */}
      <style>{`
        .indian-map-popup .maplibregl-popup-content {
          background: hsl(220 18% 12%);
          border: 1px solid hsl(220 15% 22%);
          border-radius: 8px;
          padding: 0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .indian-map-popup .maplibregl-popup-tip {
          border-top-color: hsl(220 18% 12%);
        }
      `}</style>
    </div>
  );
};
