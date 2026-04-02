'use client';

import { useState, useEffect, useCallback } from 'react';
import { checkServiceAreaCoverage, getDeliveryQuote } from '@/lib/services/maps/service-area.service';
import type { ServiceAreaCheckResult, DeliveryQuoteResponse } from '@/lib/maps/types';

interface UseServiceAreaOptions {
  enabled?: boolean;
  autoCheck?: boolean;
}

interface UseServiceAreaReturn {
  serviceArea: ServiceAreaCheckResult | null;
  deliveryQuote: DeliveryQuoteResponse | null;
  loading: boolean;
  error: string | null;
  checkServiceArea: (lat: number, lng: number) => Promise<void>;
  checkServiceAreaByPostcode: (postcode: string) => Promise<void>;
  getDeliveryQuote: (lat: number, lng: number, orderTotal?: number) => Promise<void>;
  getDeliveryQuoteByPostcode: (postcode: string, orderTotal?: number) => Promise<void>;
  clearServiceArea: () => void;
}

export const useServiceArea = (options: UseServiceAreaOptions = {}): UseServiceAreaReturn => {
  const [serviceArea, setServiceArea] = useState<ServiceAreaCheckResult | null>(null);
  const [deliveryQuote, setDeliveryQuote] = useState<DeliveryQuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { enabled = true, autoCheck = false } = options;

  const checkServiceAreaByCoords = useCallback(async (lat: number, lng: number) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await checkServiceAreaCoverage({ lat, lng });
      setServiceArea(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check service area';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const checkServiceAreaByPostcode = useCallback(async (postcode: string) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await checkServiceAreaCoverage({ postcode });
      setServiceArea(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check service area';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const getDeliveryQuoteByCoords = useCallback(async (lat: number, lng: number, orderTotal: number = 0) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getDeliveryQuote({ lat, lng }, orderTotal);
      setDeliveryQuote(result);
      // Also update service area info
      const areaResult = await checkServiceAreaCoverage({ lat, lng });
      setServiceArea(areaResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get delivery quote';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const getDeliveryQuoteByPostcode = useCallback(async (postcode: string, orderTotal: number = 0) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getDeliveryQuote({ postcode }, orderTotal);
      setDeliveryQuote(result);
      // Also update service area info
      const areaResult = await checkServiceAreaCoverage({ postcode });
      setServiceArea(areaResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get delivery quote';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const clearServiceArea = useCallback(() => {
    setServiceArea(null);
    setDeliveryQuote(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    serviceArea,
    deliveryQuote,
    loading,
    error,
    checkServiceArea: checkServiceAreaByCoords,
    checkServiceAreaByPostcode,
    getDeliveryQuote: getDeliveryQuoteByCoords,
    getDeliveryQuoteByPostcode,
    clearServiceArea,
  };
};