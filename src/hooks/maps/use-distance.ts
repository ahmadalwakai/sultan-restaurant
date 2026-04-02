'use client';

import { useState, useEffect, useCallback } from 'react';
import { calculateDistanceBetweenPoints } from '@/lib/services/maps/distance.service';
import type { DistanceResult } from '@/lib/maps/types';

interface UseDistanceOptions {
  travelMode?: 'driving' | 'walking' | 'transit' | 'bicycling';
  enabled?: boolean;
}

interface UseDistanceReturn {
  distance: DistanceResult | null;
  loading: boolean;
  error: string | null;
  calculateDistance: (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => Promise<void>;
  clearDistance: () => void;
}

export const useDistance = (options: UseDistanceOptions = {}): UseDistanceReturn => {
  const [distance, setDistance] = useState<DistanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { travelMode = 'driving', enabled = true } = options;

  const calculateDistance = useCallback(async (
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await calculateDistanceBetweenPoints(origin, destination, travelMode);
      setDistance(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate distance';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [travelMode, enabled]);

  const clearDistance = useCallback(() => {
    setDistance(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    distance,
    loading,
    error,
    calculateDistance,
    clearDistance,
  };
};