'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserLocation } from '@/lib/maps/types';

interface UseUserLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watchPosition?: boolean;
}

interface UseUserLocationReturn {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
  clearLocation: () => void;
  isSupported: boolean;
}

export const useUserLocation = (options: UseUserLocationOptions = {}): UseUserLocationReturn => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState(() => 'geolocation' in navigator);

  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 300000, // 5 minutes
    watchPosition = false,
  } = options;

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const newLocation: UserLocation = {
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
      method: 'geolocation',
    };

    setLocation(newLocation);
    setLoading(false);
    setError(null);
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = '';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied by user';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out';
        break;
      default:
        errorMessage = 'An unknown location error occurred';
        break;
    }

    setError(errorMessage);
    setLoading(false);
  }, []);

  const requestLocation = useCallback(() => {
    if (!isSupported) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    const geoOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    if (watchPosition) {
      const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, geoOptions);
      // Store watchId for cleanup if needed
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geoOptions);
    }
  }, [isSupported, enableHighAccuracy, timeout, maximumAge, watchPosition, handleSuccess, handleError]);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
    setLoading(false);
  }, []);

  // Request location on mount if supported
  useEffect(() => {
    if (isSupported && !location && !error) {
      requestLocation();
    }
  }, [isSupported, location, error, requestLocation]);

  return {
    location,
    loading,
    error,
    requestLocation,
    clearLocation,
    isSupported,
  };
};