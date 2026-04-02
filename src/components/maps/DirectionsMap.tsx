'use client';

import { useEffect, useRef, useState } from 'react';
import { getGoogleMapsClient } from '@/lib/maps/google-maps-client';
import { RESTAURANT_COORDINATES } from '@/data/maps/restaurant-coordinates';
import { useDirections } from '@/hooks/maps/use-directions';
import type { DirectionsOptions } from '@/lib/maps/types';

interface DirectionsMapProps {
  origin?: { lat: number; lng: number } | string;
  destination?: { lat: number; lng: number } | string;
  travelMode?: 'driving' | 'walking' | 'transit' | 'bicycling';
  width?: string;
  height?: string;
  zoom?: number;
  className?: string;
  showDirections?: boolean;
  onDirectionsLoad?: (directions: google.maps.DirectionsResult) => void;
}

export const DirectionsMap: React.FC<DirectionsMapProps> = ({
  origin,
  destination = RESTAURANT_COORDINATES,
  travelMode = 'driving',
  width = '100%',
  height = '400px',
  zoom = 13,
  className = '',
  showDirections = true,
  onDirectionsLoad,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { directions, loading: directionsLoading, error: directionsError, getDirections } = useDirections();

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const client = getGoogleMapsClient();
        const googleMaps = await client.load();

        if (!mapRef.current) return;

        const mapConfig: google.maps.MapOptions = {
          center: typeof destination === 'object' ? destination : RESTAURANT_COORDINATES,
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

        // Initialize directions renderer
        const renderer = new googleMaps.DirectionsRenderer({
          map: mapInstance,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#e53e3e',
            strokeWeight: 5,
            strokeOpacity: 0.8,
          },
        });
        setDirectionsRenderer(renderer);

        setLoading(false);
      } catch (err) {
        console.error('Failed to load directions map:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map');
        setLoading(false);
      }
    };

    initializeMap();
  }, [zoom, destination]);

  // Load directions when origin and destination are available
  useEffect(() => {
    if (!showDirections || !origin || !destination || !directionsRenderer) return;

    const loadDirections = async () => {
      try {
        await getDirections({
          origin,
          destination,
          travelMode,
        });
      } catch (err) {
        console.error('Failed to load directions:', err);
      }
    };

    loadDirections();
  }, [origin, destination, travelMode, showDirections, directionsRenderer, getDirections]);

  // Update directions renderer when directions change
  useEffect(() => {
    if (directions && directionsRenderer) {
      directionsRenderer.setDirections(directions as any);
      if (onDirectionsLoad) {
        onDirectionsLoad(directions as any);
      }
    }
  }, [directions, directionsRenderer, onDirectionsLoad]);

  const displayError = error || directionsError;

  if (displayError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <p className="text-gray-500 mb-2">Directions map unavailable</p>
          <p className="text-sm text-gray-400">{displayError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {(loading || directionsLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      )}
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg"
        style={{ minHeight: '200px' }}
      />
      {directions && (
        <div className="absolute top-2 left-2 bg-white px-3 py-2 rounded shadow text-sm">
          <div className="font-medium text-gray-900">
            {directions.routes[0]?.legs?.[0]?.distance?.text}
          </div>
          <div className="text-gray-600">
            {directions.routes[0]?.legs?.[0]?.duration?.text}
          </div>
        </div>
      )}
    </div>
  );
};