import { getDirectionsService } from '../../maps/directions-service';
import { getMapsCache, MapsCache } from '../../maps/cache';
import { getMapsErrorHandler, handleMapsError } from '../../maps/error-handler';
import type { DirectionsResult, DirectionsOptions } from '../../maps/types';

export class DirectionsService {
  private static instance: DirectionsService;
  private directionsService = getDirectionsService();
  private cache = getMapsCache();
  private errorHandler = getMapsErrorHandler();

  private constructor() {}

  public static getInstance(): DirectionsService {
    if (!DirectionsService.instance) {
      DirectionsService.instance = new DirectionsService();
    }
    return DirectionsService.instance;
  }

  public async getDirections(options: DirectionsOptions): Promise<DirectionsResult> {
    try {
      // Check cache first
      const cacheKey = MapsCache.generateDirectionsKey(
        options.origin,
        options.destination,
        options.travelMode
      );
      const cachedResult = this.cache.get<DirectionsResult>(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      // Perform directions request
      const directionsRequest = {
        ...options,
        travelMode: this.convertTravelMode(options.travelMode),
      };
      const result = await this.directionsService.getDirections(directionsRequest);

      // Cache result
      this.cache.set(cacheKey, result);

      return result;
    } catch (error) {
      throw handleMapsError(error, 'directions request');
    }
  }

  public async getDrivingDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsOptions>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: 'driving',
      ...options,
    });
  }

  public async getWalkingDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsOptions>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: 'walking',
      ...options,
    });
  }

  public async getTransitDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsOptions>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: 'transit',
      ...options,
    });
  }

  public async getCyclingDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsOptions>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: 'bicycling',
      ...options,
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

  // Get directions with alternatives
  public async getDirectionsWithAlternatives(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    travelMode: 'driving' | 'walking' | 'transit' | 'bicycling' = 'driving'
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode,
      provideRouteAlternatives: true,
    });
  }

  // Extract route summary
  public extractRouteSummary(result: DirectionsResult): {
    distance: string;
    duration: string;
    durationInTraffic?: string;
    summary: string;
  } | null {
    if (result.routes.length === 0) return null;

    const route = result.routes[0];
    const leg = route.legs[0];

    return {
      distance: leg.distance.text,
      duration: leg.duration.text,
      durationInTraffic: leg.duration_in_traffic?.text,
      summary: route.summary,
    };
  }

  // Get turn-by-turn instructions
  public extractTurnByTurnInstructions(result: DirectionsResult): Array<{
    instruction: string;
    distance: string;
    duration: string;
  }> {
    if (result.routes.length === 0) return [];

    const leg = result.routes[0].legs[0];
    return leg.steps.map(step => ({
      instruction: step.instructions,
      distance: step.distance.text,
      duration: step.duration.text,
    }));
  }

  // Calculate estimated arrival time
  public calculateEstimatedArrival(
    result: DirectionsResult,
    departureTime: Date = new Date()
  ): Date {
    if (result.routes.length === 0) return departureTime;

    const duration = result.routes[0].legs[0].duration.value;
    return new Date(departureTime.getTime() + duration * 1000);
  }
}

// Utility functions
export const getDirections = async (
  options: DirectionsOptions
): Promise<DirectionsResult> => {
  return DirectionsService.getInstance().getDirections(options);
};

export const getDrivingDirections = async (
  origin: { lat: number; lng: number } | string,
  destination: { lat: number; lng: number } | string,
  options?: Partial<DirectionsOptions>
): Promise<DirectionsResult> => {
  return DirectionsService.getInstance().getDrivingDirections(origin, destination, options);
};

export const getWalkingDirections = async (
  origin: { lat: number; lng: number } | string,
  destination: { lat: number; lng: number } | string,
  options?: Partial<DirectionsOptions>
): Promise<DirectionsResult> => {
  return DirectionsService.getInstance().getWalkingDirections(origin, destination, options);
};