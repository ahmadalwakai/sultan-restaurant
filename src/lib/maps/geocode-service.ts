import { getGoogleMapsClient } from './google-maps-client';

export interface GeocodeRequest {
  address: string;
  region?: string;
  bounds?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
  componentRestrictions?: {
    country?: string;
    postalCode?: string;
    administrativeArea?: string;
    locality?: string;
  };
}

export interface GeocodeResult {
  address: string;
  coordinates: { lat: number; lng: number };
  components: {
    streetNumber?: string;
    streetName?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  formattedAddress: string;
  placeId?: string;
  types: string[];
}

export class GeocodeService {
  private static instance: GeocodeService;
  private maps: typeof google.maps | null = null;

  private constructor() {}

  public static getInstance(): GeocodeService {
    if (!GeocodeService.instance) {
      GeocodeService.instance = new GeocodeService();
    }
    return GeocodeService.instance;
  }

  private async ensureMapsLoaded(): Promise<typeof google.maps> {
    if (!this.maps) {
      const client = getGoogleMapsClient();
      this.maps = await client.load();
    }
    return this.maps;
  }

  public async geocodeAddress(request: GeocodeRequest): Promise<GeocodeResult>;
  public async geocodeAddress(address: string, region?: string): Promise<GeocodeResult>;
  public async geocodeAddress(
    addressOrRequest: string | GeocodeRequest,
    region?: string
  ): Promise<GeocodeResult> {
    const maps = await this.ensureMapsLoaded();

    const geocoder = new maps.Geocoder();

    let request: google.maps.GeocoderRequest;

    if (typeof addressOrRequest === 'string') {
      request = {
        address: addressOrRequest,
        region: region || 'GB',
      };
    } else {
      request = {
        address: addressOrRequest.address,
        region: addressOrRequest.region || 'GB',
        bounds: addressOrRequest.bounds ? new maps.LatLngBounds(
          addressOrRequest.bounds.southwest,
          addressOrRequest.bounds.northeast
        ) : undefined,
        componentRestrictions: addressOrRequest.componentRestrictions,
      };
    }

    return new Promise((resolve, reject) => {
      geocoder.geocode(request, (results, status) => {
        if (status === maps.GeocoderStatus.OK && results && results.length > 0) {
          const result = results[0];
          
          // Extract address components
          const components: any = {};
          result.address_components.forEach(component => {
            if (component.types.includes('street_number')) {
              components.streetNumber = component.long_name;
            }
            if (component.types.includes('route')) {
              components.streetName = component.long_name;
            }
            if (component.types.includes('locality') || component.types.includes('postal_town')) {
              components.city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
              components.region = component.long_name;
            }
            if (component.types.includes('postal_code')) {
              components.postalCode = component.long_name;
            }
            if (component.types.includes('country')) {
              components.country = component.long_name;
            }
          });

          const processedResult: GeocodeResult = {
            address: result.formatted_address,
            coordinates: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            },
            components,
            formattedAddress: result.formatted_address,
            placeId: result.place_id,
            types: result.types,
          };

          resolve(processedResult);
        } else {
          reject(new Error(`Geocoding API error: ${status}`));
        }
      });
    });
  }

  public async reverseGeocode(
    location: { lat: number; lng: number },
    options?: { result_type?: string[]; location_type?: string[] }
  ): Promise<GeocodeResult> {
    const maps = await this.ensureMapsLoaded();

    const geocoder = new maps.Geocoder();

    const request: google.maps.GeocoderRequest = {
      location: new maps.LatLng(location.lat, location.lng),
      ...options,
    };

    return new Promise((resolve, reject) => {
      geocoder.geocode(request, (results, status) => {
        if (status === maps.GeocoderStatus.OK && results && results.length > 0) {
          const result = results[0];
          
          // Extract address components
          const components: any = {};
          result.address_components.forEach(component => {
            if (component.types.includes('street_number')) {
              components.streetNumber = component.long_name;
            }
            if (component.types.includes('route')) {
              components.streetName = component.long_name;
            }
            if (component.types.includes('locality') || component.types.includes('postal_town')) {
              components.city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
              components.region = component.long_name;
            }
            if (component.types.includes('postal_code')) {
              components.postalCode = component.long_name;
            }
            if (component.types.includes('country')) {
              components.country = component.long_name;
            }
          });

          const processedResult: GeocodeResult = {
            address: result.formatted_address,
            coordinates: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            },
            components,
            formattedAddress: result.formatted_address,
            placeId: result.place_id,
            types: result.types,
          };

          resolve(processedResult);
        } else {
          reject(new Error(`Reverse geocoding API error: ${status}`));
        }
      });
    });
  }

  // Extract postcode from geocode result
  public extractPostcode(result: GeocodeResult): string | null {
    return result.components.postalCode || null;
  }

  // Extract city/locality from geocode result
  public extractLocality(result: GeocodeResult): string | null {
    return result.components.city || null;
  }
}

// Utility functions
export const getGeocodeService = (): GeocodeService => {
  return GeocodeService.getInstance();
};

export const geocodeAddress = async (
  address: string,
  region?: string
): Promise<GeocodeResult> => {
  return getGeocodeService().geocodeAddress(address, region);
};

export const reverseGeocode = async (
  location: { lat: number; lng: number }
): Promise<GeocodeResult> => {
  return getGeocodeService().reverseGeocode(location);
};