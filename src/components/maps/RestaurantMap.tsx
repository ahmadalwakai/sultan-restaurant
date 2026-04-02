'use client';

import { useEffect, useRef, useState } from 'react';
import { getGoogleMapsClient } from '@/lib/maps/google-maps-client';
import { RESTAURANT_COORDINATES } from '@/data/maps/restaurant-coordinates';
import type { MapConfig } from '@/lib/maps/types';

interface RestaurantMapProps {
  width?: string;
  height?: string;
  zoom?: number;
  className?: string;
  showMarker?: boolean;
  markerTitle?: string;
  onMapLoad?: (map: google.maps.Map) => void;
  onMarkerClick?: () => void;
}

export const RestaurantMap: React.FC<RestaurantMapProps> = ({
  width = '100%',
  height = '400px',
  zoom = 15,
  className = '',
  showMarker = true,
  markerTitle = 'Sultan Restaurant',
  onMapLoad,
  onMarkerClick,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const client = getGoogleMapsClient();
        const googleMaps = await client.load();

        if (!mapRef.current) return;

        const mapConfig: google.maps.MapOptions = {
          center: RESTAURANT_COORDINATES,
          zoom,
          mapTypeId: googleMaps.MapTypeId.ROADMAP,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
        };

        const mapInstance = new googleMaps.Map(mapRef.current, mapConfig);
        setMap(mapInstance);

        if (showMarker) {
          const markerInstance = new googleMaps.Marker({
            position: RESTAURANT_COORDINATES,
            map: mapInstance,
            title: markerTitle,
            icon: {
              url: '/images/map-markers/restaurant.png',
              scaledSize: new googleMaps.Size(40, 40),
            },
          });

          if (onMarkerClick) {
            markerInstance.addListener('click', onMarkerClick);
          }

          setMarker(markerInstance);
        }

        if (onMapLoad) {
          onMapLoad(mapInstance);
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to load map:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map');
        setLoading(false);
      }
    };

    initializeMap();
  }, [zoom, showMarker, markerTitle, onMapLoad, onMarkerClick]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <p className="text-gray-500 mb-2">Map unavailable</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      )}
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};