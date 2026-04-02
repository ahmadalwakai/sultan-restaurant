import { getDistanceCalculator } from '../../maps/distance-calculator';
import { getMapsCache, MapsCache } from '../../maps/cache';
import { getMapsErrorHandler, handleMapsError } from '../../maps/error-handler';
import type { DistanceResult, DistanceMatrixOptions } from '../../maps/types';

export class DistanceService {
  private static instance: DistanceService;
  private distanceCalculator = getDistanceCalculator();
  private cache = getMapsCache();
  private errorHandler = getMapsErrorHandler();

  private constructor() {}

  public static getInstance(): DistanceService {
    if (!DistanceService.instance) {
      DistanceService.instance = new DistanceService();
    }
    return DistanceService.instance;
  }

  public async calculateDistance(options: DistanceMatrixOptions): Promise<DistanceResult[]> {
    try {
      // Check cache first
      const cacheKey = MapsCache.generateDistanceKey(
        options.origins,
        options.destinations,
        options.travelMode
      );
      const cachedResult = this.cache.get<DistanceResult[]>(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      // Perform distance calculation
      const distanceRequest = {
        ...options,
        travelMode: this.convertTravelMode(options.travelMode),
        unitSystem: options.unitSystem ? this.convertUnitSystem(options.unitSystem) : undefined,
      };
      const result = await this.distanceCalculator.calculateDistance(distanceRequest);

      // Cache result
      this.cache.set(cacheKey, result);

      return result;
    } catch (error) {
      throw handleMapsError(error, 'distance calculation');
    }
  }

  public async calculateDistanceBetweenPoints(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    travelMode: 'driving' | 'walking' | 'transit' | 'bicycling' = 'driving'
  ): Promise<DistanceResult> {
    const results = await this.calculateDistance({
      origins: [origin],
      destinations: [destination],
      travelMode,
      unitSystem: 'imperial',
    });

    if (results.length === 0) {
      throw new Error('No distance results found');
    }

    return results[0];
  }

  public async calculateMultipleDistances(
    origins: Array<{ lat: number; lng: number }>,
    destinations: Array<{ lat: number; lng: number }>,
    travelMode: 'driving' | 'walking' | 'transit' | 'bicycling' = 'driving'
  ): Promise<DistanceResult[]> {
    return this.calculateDistance({
      origins,
      destinations,
      travelMode,
      unitSystem: 'imperial',
    });
  }

  // Get distance with fallback to Haversine formula
  public async calculateDistanceWithFallback(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    travelMode: 'driving' | 'walking' | 'transit' | 'bicycling' = 'driving'
  ): Promise<DistanceResult> {
    try {
      return await this.calculateDistanceBetweenPoints(origin, destination, travelMode);
    } catch (error) {
      // Fallback to Haversine distance
      console.warn('Using Haversine fallback for distance calculation:', error);
      const haversineResult = this.distanceCalculator.calculateHaversineDistance(origin, destination);

      return {
        distance: {
          text: `${haversineResult.distance} ${haversineResult.unit}`,
          value: haversineResult.unit === 'km' ? haversineResult.distance * 1000 : haversineResult.distance * 1609.34,
        },
        duration: {
          text: 'N/A',
          value: 0,
        },
        status: 'OK',
      };
    }
  }

  // Batch distance calculations
  public async batchCalculateDistances(
    requests: Array<{
      origin: { lat: number; lng: number };
      destination: { lat: number; lng: number };
      travelMode?: 'driving' | 'walking' | 'transit' | 'bicycling';
    }>
  ): Promise<DistanceResult[]> {
    const results: DistanceResult[] = [];

    // Process in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchPromises = batch.map(request =>
        this.calculateDistanceBetweenPoints(
          request.origin,
          request.destination,
          request.travelMode
        )
      );

      try {
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
      } catch (error) {
        console.error('Batch distance calculation error:', error);
        // Continue with next batch even if one fails
      }

      // Small delay between batches
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return results;
  }

  // Get distance matrix for multiple origins and destinations
  public async getDistanceMatrix(
    origins: Array<{ lat: number; lng: number } | string>,
    destinations: Array<{ lat: number; lng: number } | string>,
    travelMode: 'driving' | 'walking' | 'transit' | 'bicycling' = 'driving'
  ): Promise<DistanceResult[]> {
    return this.calculateDistance({
      origins,
      destinations,
      travelMode,
      unitSystem: 'imperial',
    });
  }

  private convertTravelMode(mode: string): google.maps.TravelMode {
    switch (mode) {
      case 'driving':
        return google.maps.TravelMode.DRIVING;
      case 'walking':
        return google.maps.TravelMode.WALKING;
      case 'transit':
        return google.maps.TravelMode.TRANSIT;
      case 'bicycling':
        return google.maps.TravelMode.BICYCLING;
      default:
        return google.maps.TravelMode.DRIVING;
    }
  }

  private convertUnitSystem(unit: string): google.maps.UnitSystem {
    switch (unit) {
      case 'metric':
        return google.maps.UnitSystem.METRIC;
      case 'imperial':
        return google.maps.UnitSystem.IMPERIAL;
      default:
        return google.maps.UnitSystem.IMPERIAL;
    }
  }
}

// Utility functions
export const calculateDistance = async (
  options: DistanceMatrixOptions
): Promise<DistanceResult[]> => {
  return DistanceService.getInstance().calculateDistance(options);
};

export const calculateDistanceBetweenPoints = async (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  travelMode?: 'driving' | 'walking' | 'transit' | 'bicycling'
): Promise<DistanceResult> => {
  return DistanceService.getInstance().calculateDistanceBetweenPoints(origin, destination, travelMode);
};

export const getDistanceMatrix = async (
  origins: Array<{ lat: number; lng: number } | string>,
  destinations: Array<{ lat: number; lng: number } | string>,
  travelMode?: 'driving' | 'walking' | 'transit' | 'bicycling'
): Promise<DistanceResult[]> => {
  return DistanceService.getInstance().getDistanceMatrix(origins, destinations, travelMode);
};