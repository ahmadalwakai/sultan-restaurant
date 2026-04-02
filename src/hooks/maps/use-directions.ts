'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDirections } from '@/lib/services/maps/directions.service';
import type { DirectionsResult, DirectionsOptions } from '@/lib/maps/types';

interface UseDirectionsOptions {
  enabled?: boolean;
  autoFetch?: boolean;
}

interface UseDirectionsReturn {
  directions: DirectionsResult | null;
  loading: boolean;
  error: string | null;
  getDirections: (options: DirectionsOptions) => Promise<void>;
  clearDirections: () => void;
}

export const useDirections = (options: UseDirectionsOptions = {}): UseDirectionsReturn => {
  const [directions, setDirections] = useState<DirectionsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { enabled = true, autoFetch = false } = options;

  const fetchDirections = useCallback(async (directionsOptions: DirectionsOptions) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getDirections(directionsOptions);
      setDirections(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get directions';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const clearDirections = useCallback(() => {
    setDirections(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    directions,
    loading,
    error,
    getDirections: fetchDirections,
    clearDirections,
  };
};