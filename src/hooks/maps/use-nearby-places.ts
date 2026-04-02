'use client';

import { useState, useEffect, useCallback } from 'react';
import { findNearbyPlaces } from '@/lib/services/maps/nearby.service';
import type { NearbyPlacesResult, NearbySearchOptions } from '@/lib/maps/types';

interface UseNearbyPlacesOptions {
  enabled?: boolean;
  autoFetch?: boolean;
}

interface UseNearbyPlacesReturn {
  nearbyPlaces: NearbyPlacesResult | null;
  loading: boolean;
  error: string | null;
  findNearbyPlaces: (options: NearbySearchOptions) => Promise<void>;
  findNearbyRestaurants: (location: { lat: number; lng: number }, radius?: number) => Promise<void>;
  findNearbyParking: (location: { lat: number; lng: number }, radius?: number) => Promise<void>;
  findNearbyAmenities: (location: { lat: number; lng: number }, radius?: number) => Promise<void>;
  clearNearbyPlaces: () => void;
}

export const useNearbyPlaces = (options: UseNearbyPlacesOptions = {}): UseNearbyPlacesReturn => {
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlacesResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { enabled = true, autoFetch = false } = options;

  const findNearbyPlacesHandler = useCallback(async (searchOptions: NearbySearchOptions) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await findNearbyPlaces(searchOptions);
      setNearbyPlaces(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to find nearby places';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const findNearbyRestaurants = useCallback(async (
    location: { lat: number; lng: number },
    radius: number = 2000
  ) => {
    await findNearbyPlacesHandler({
      location,
      radius,
      type: 'restaurant',
      rankBy: 'distance',
    });
  }, [findNearbyPlacesHandler]);

  const findNearbyParking = useCallback(async (
    location: { lat: number; lng: number },
    radius: number = 1000
  ) => {
    await findNearbyPlacesHandler({
      location,
      radius,
      type: 'parking',
      rankBy: 'distance',
    });
  }, [findNearbyPlacesHandler]);

  const findNearbyAmenities = useCallback(async (
    location: { lat: number; lng: number },
    radius: number = 2000
  ) => {
    // This would typically call a batch service method
    // For now, we'll just search for restaurants as an example
    await findNearbyRestaurants(location, radius);
  }, [findNearbyRestaurants]);

  const clearNearbyPlaces = useCallback(() => {
    setNearbyPlaces(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    nearbyPlaces,
    loading,
    error,
    findNearbyPlaces: findNearbyPlacesHandler,
    findNearbyRestaurants,
    findNearbyParking,
    findNearbyAmenities,
    clearNearbyPlaces,
  };
};