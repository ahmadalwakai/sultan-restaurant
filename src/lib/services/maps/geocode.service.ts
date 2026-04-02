import { getGeocodeService } from '../../maps/geocode-service';
import { getMapsCache, MapsCache } from '../../maps/cache';
import { getMapsErrorHandler, handleMapsError } from '../../maps/error-handler';
import type { GeocodeResult, GeocodeOptions } from '../../maps/types';

export class GeocodeService {
  private static instance: GeocodeService;
  private geocodeService = getGeocodeService();
  private cache = getMapsCache();
  private errorHandler = getMapsErrorHandler();

  private constructor() {}

  public static getInstance(): GeocodeService {
    if (!GeocodeService.instance) {
      GeocodeService.instance = new GeocodeService();
    }
    return GeocodeService.instance;
  }

  public async geocodeAddress(
    address: string,
    region: string = 'GB'
  ): Promise<GeocodeResult> {
    try {
      // Check cache first
      const cacheKey = MapsCache.generateGeocodeKey(address, region);
      const cachedResult = this.cache.get<GeocodeResult>(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      // Perform geocoding
      const result = await this.geocodeService.geocodeAddress(address, region);

      // Cache result
      this.cache.set(cacheKey, result);

      return result;
    } catch (error) {
      throw handleMapsError(error, 'address geocoding');
    }
  }

  public async reverseGeocode(
    location: { lat: number; lng: number }
  ): Promise<GeocodeResult> {
    try {
      const result = await this.geocodeService.reverseGeocode(location);
      return result;
    } catch (error) {
      throw handleMapsError(error, 'reverse geocoding');
    }
  }

  public async geocodeWithOptions(options: GeocodeOptions): Promise<GeocodeResult> {
    try {
      const result = await this.geocodeService.geocodeAddress(options);
      return result;
    } catch (error) {
      throw handleMapsError(error, 'advanced geocoding');
    }
  }

  // Extract useful information from geocode result
  public extractAddressComponents(result: GeocodeResult) {
    return {
      streetNumber: result.components.streetNumber,
      streetName: result.components.streetName,
      locality: result.components.city,
      city: result.components.city,
      region: result.components.region,
      country: result.components.country,
      postcode: result.components.postalCode,
      formattedAddress: result.formattedAddress,
      coordinates: result.coordinates,
    };
  }

  // Batch geocode multiple addresses
  public async batchGeocode(
    addresses: string[],
    region: string = 'GB'
  ): Promise<GeocodeResult[]> {
    const results: GeocodeResult[] = [];

    // Process in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < addresses.length; i += batchSize) {
      const batch = addresses.slice(i, i + batchSize);
      const batchPromises = batch.map(address => this.geocodeAddress(address, region));

      try {
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
      } catch (error) {
        console.error('Batch geocoding error:', error);
        // Continue with next batch even if one fails
      }

      // Small delay between batches
      if (i + batchSize < addresses.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return results;
  }
}

// Utility functions
export const geocodeAddress = async (
  address: string,
  region?: string
): Promise<GeocodeResult> => {
  return GeocodeService.getInstance().geocodeAddress(address, region);
};

export const reverseGeocode = async (
  location: { lat: number; lng: number }
): Promise<GeocodeResult> => {
  return GeocodeService.getInstance().reverseGeocode(location);
};

export const batchGeocode = async (
  addresses: string[],
  region?: string
): Promise<GeocodeResult[]> => {
  return GeocodeService.getInstance().batchGeocode(addresses, region);
};