'use client';

import { useEffect, useRef, useState } from 'react';
import { getGoogleMapsClient } from '@/lib/maps/google-maps-client';
import { getServiceRadiusManager } from '@/lib/maps/service-radius';
import { RESTAURANT_COORDINATES } from '@/data/maps/restaurant-coordinates';
import type { MapConfig } from '@/lib/maps/types';

interface ServiceAreaMapProps {
  width?: string;
  height?: string;
  zoom?: number;
  className?: string;
  showServiceArea?: boolean;
  showRestaurantMarker?: boolean;
  userLocation?: { lat: number; lng: number };
  onMapLoad?: (map: google.maps.Map) => void;
  onServiceAreaClick?: () => void;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  width = '100%',
  height = '400px',
  zoom = 13,
  className = '',
  showServiceArea = true,
  showRestaurantMarker = true,
  userLocation,
  onMapLoad,
  onServiceAreaClick,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [serviceAreaPolygon, setServiceAreaPolygon] = useState<google.maps.Polygon | null>(null);
  const [restaurantMarker, setRestaurantMarker] = useState<google.maps.Marker | null>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
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

        // Add service area polygon
        if (showServiceArea) {
          const serviceRadiusManager = getServiceRadiusManager();
          const polygonPaths = serviceRadiusManager.getPolygon();

          const polygon = new googleMaps.Polygon({
            paths: polygonPaths,
            strokeColor: '#e53e3e',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#fed7d7',
            fillOpacity: 0.3,
            clickable: true,
          });

          polygon.setMap(mapInstance);

          if (onServiceAreaClick) {
            polygon.addListener('click', onServiceAreaClick);
          }

          setServiceAreaPolygon(polygon);
        }

        // Add restaurant marker
        if (showRestaurantMarker) {
          const marker = new googleMaps.Marker({
            position: RESTAURANT_COORDINATES,
            map: mapInstance,
            title: 'Sultan Restaurant',
            icon: {
              url: '/images/map-markers/restaurant.png',
              scaledSize: new googleMaps.Size(40, 40),
            },
          });

          setRestaurantMarker(marker);
        }

        // Add user location marker
        if (userLocation) {
          const userMarkerInstance = new googleMaps.Marker({
            position: userLocation,
            map: mapInstance,
            title: 'Your Location',
            icon: {
              url: '/images/map-markers/user.png',
              scaledSize: new googleMaps.Size(30, 30),
            },
          });

          setUserMarker(userMarkerInstance);

          // Fit bounds to show both restaurant and user location
          const bounds = new googleMaps.LatLngBounds();
          bounds.extend(RESTAURANT_COORDINATES);
          bounds.extend(userLocation);
          mapInstance.fitBounds(bounds);
        }

        if (onMapLoad) {
          onMapLoad(mapInstance);
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to load service area map:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map');
        setLoading(false);
      }
    };

    initializeMap();
  }, [zoom, showServiceArea, showRestaurantMarker, userLocation, onMapLoad, onServiceAreaClick]);

  // Update user marker when userLocation changes
  useEffect(() => {
    if (!map || !userLocation) return;

    if (userMarker) {
      userMarker.setPosition(userLocation);
    } else {
      const client = getGoogleMapsClient();
      client.load().then(googleMaps => {
        const newUserMarker = new googleMaps.Marker({
          position: userLocation,
          map,
          title: 'Your Location',
          icon: {
            url: '/images/map-markers/user.png',
            scaledSize: new googleMaps.Size(30, 30),
          },
        });
        setUserMarker(newUserMarker);
      });
    }
  }, [map, userLocation, userMarker]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <p className="text-gray-500 mb-2">Service area map unavailable</p>
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
      {showServiceArea && (
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow text-sm">
          <span className="text-red-600">●</span> Delivery Area
        </div>
      )}
    </div>
  );
};