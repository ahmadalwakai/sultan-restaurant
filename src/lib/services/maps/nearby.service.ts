import { getNearbyPlacesService } from '../../maps/nearby-places-service';
import { getMapsCache, MapsCache } from '../../maps/cache';
import { getMapsErrorHandler, handleMapsError } from '../../maps/error-handler';
import type { NearbyPlacesResult, NearbySearchOptions } from '../../maps/types';

export class NearbyService {
  private static instance: NearbyService;
  private nearbyService = getNearbyPlacesService();
  private cache = getMapsCache();
  private errorHandler = getMapsErrorHandler();

  private constructor() {}

  public static getInstance(): NearbyService {
    if (!NearbyService.instance) {
      NearbyService.instance = new NearbyService();
    }
    return NearbyService.instance;
  }

  public async findNearbyPlaces(options: NearbySearchOptions): Promise<NearbyPlacesResult> {
    try {
      // Check cache first
      const cacheKey = MapsCache.generateNearbyPlacesKey(
        options.location,
        options.type || 'restaurant',
        options.radius || 2000
      );
      const cachedResult = this.cache.get<NearbyPlacesResult>(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      // Perform nearby search
      const result = await this.nearbyService.findNearbyPlaces(options);

      // Cache result
      this.cache.set(cacheKey, result);

      return result;
    } catch (error) {
      throw handleMapsError(error, 'nearby places search');
    }
  }

  public async findNearbyRestaurants(
    location: { lat: number; lng: number },
    radius: number = 2000
  ): Promise<NearbyPlacesResult> {
    return this.findNearbyPlaces({
      location,
      radius,
      type: 'restaurant',
      rankBy: 'distance',
    });
  }

  public async findNearbyParking(
    location: { lat: number; lng: number },
    radius: number = 1000
  ): Promise<NearbyPlacesResult> {
    return this.findNearbyPlaces({
      location,
      radius,
      type: 'parking',
      rankBy: 'distance',
    });
  }

  public async findNearbySupermarkets(
    location: { lat: number; lng: number },
    radius: number = 2000
  ): Promise<NearbyPlacesResult> {
    return this.findNearbyPlaces({
      location,
      radius,
      type: 'supermarket',
      rankBy: 'distance',
    });
  }

  public async findNearbyPharmacies(
    location: { lat: number; lng: number },
    radius: number = 2000
  ): Promise<NearbyPlacesResult> {
    return this.findNearbyPlaces({
      location,
      radius,
      type: 'pharmacy',
      rankBy: 'distance',
    });
  }

  public async findNearbyBanks(
    location: { lat: number; lng: number },
    radius: number = 2000
  ): Promise<NearbyPlacesResult> {
    return this.findNearbyPlaces({
      location,
      radius,
      type: 'bank',
      rankBy: 'distance',
    });
  }

  public async findNearbyATMs(
    location: { lat: number; lng: number },
    radius: number = 1000
  ): Promise<NearbyPlacesResult> {
    return this.findNearbyPlaces({
      location,
      radius,
      type: 'atm',
      rankBy: 'distance',
    });
  }

  // Get multiple types of nearby places
  public async findNearbyAmenities(
    location: { lat: number; lng: number },
    radius: number = 2000
  ): Promise<{
    restaurants: NearbyPlacesResult;
    parking: NearbyPlacesResult;
    supermarkets: NearbyPlacesResult;
    pharmacies: NearbyPlacesResult;
  }> {
    const [restaurants, parking, supermarkets, pharmacies] = await Promise.all([
      this.findNearbyRestaurants(location, radius),
      this.findNearbyParking(location, radius),
      this.findNearbySupermarkets(location, radius),
      this.findNearbyPharmacies(location, radius),
    ]);

    return {
      restaurants,
      parking,
      supermarkets,
      pharmacies,
    };
  }

  // Search for places by keyword
  public async searchPlacesByKeyword(
    location: { lat: number; lng: number },
    keyword: string,
    radius: number = 5000
  ): Promise<NearbyPlacesResult> {
    return this.findNearbyPlaces({
      location,
      radius,
      keyword,
      rankBy: 'prominence',
    });
  }
}

// Utility functions
export const findNearbyPlaces = async (
  options: NearbySearchOptions
): Promise<NearbyPlacesResult> => {
  return NearbyService.getInstance().findNearbyPlaces(options);
};

export const findNearbyRestaurants = async (
  location: { lat: number; lng: number },
  radius?: number
): Promise<NearbyPlacesResult> => {
  return NearbyService.getInstance().findNearbyRestaurants(location, radius);
};

export const findNearbyAmenities = async (
  location: { lat: number; lng: number },
  radius?: number
) => {
  return NearbyService.getInstance().findNearbyAmenities(location, radius);
};