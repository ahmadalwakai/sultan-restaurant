'use client';

import { useState, useEffect, useCallback } from 'react';
import { geocodeAddress, reverseGeocode } from '@/lib/services/maps/geocode.service';
import type { GeocodeResult } from '@/lib/maps/types';

interface UseGeocodeOptions {
  enabled?: boolean;
  debounceMs?: number;
}

interface UseGeocodeReturn {
  geocodeResult: GeocodeResult | null;
  loading: boolean;
  error: string | null;
  geocodeAddress: (address: string, region?: string) => Promise<void>;
  reverseGeocode: (lat: number, lng: number) => Promise<void>;
  clearGeocode: () => void;
}

export const useGeocode = (options: UseGeocodeOptions = {}): UseGeocodeReturn => {
  const [geocodeResult, setGeocodeResult] = useState<GeocodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { enabled = true, debounceMs = 300 } = options;

  const geocodeAddressHandler = useCallback(async (address: string, region: string = 'GB') => {
    if (!enabled || !address.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await geocodeAddress(address, region);
      setGeocodeResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to geocode address';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const reverseGeocodeHandler = useCallback(async (lat: number, lng: number) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await reverseGeocode({ lat, lng });
      setGeocodeResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reverse geocode';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const clearGeocode = useCallback(() => {
    setGeocodeResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    geocodeResult,
    loading,
    error,
    geocodeAddress: geocodeAddressHandler,
    reverseGeocode: reverseGeocodeHandler,
    clearGeocode,
  };
};