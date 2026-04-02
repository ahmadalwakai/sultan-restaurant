import { getGoogleMapsClient } from './google-maps-client';

export interface NearbyPlacesRequest {
  location: { lat: number; lng: number };
  radius?: number; // meters, max 50000
  type?: string;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  openNow?: boolean;
  rankBy?: 'prominence' | 'distance';
}

export interface NearbyPlace {
  place_id: string;
  name: string;
  vicinity: string;
  types: string[];
  geometry: {
    location: { lat: number; lng: number };
    viewport: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
    html_attributions: string[];
  }>;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  distance?: number; // meters from search location
  duration?: number; // seconds from search location (walking/driving)
}

export interface NearbyPlacesResult {
  places: Array<{
    id: string;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    rating?: number;
    priceLevel?: number;
    types: string[];
    distance?: number;
    duration?: number;
    openNow?: boolean;
    photoUrl?: string;
    placeId: string;
  }>;
  status: string;
}

export class NearbyPlacesService {
  private static instance: NearbyPlacesService;
  private maps: typeof google.maps | null = null;

  private constructor() {}

  public static getInstance(): NearbyPlacesService {
    if (!NearbyPlacesService.instance) {
      NearbyPlacesService.instance = new NearbyPlacesService();
    }
    return NearbyPlacesService.instance;
  }

  private async ensureMapsLoaded(): Promise<typeof google.maps> {
    if (!this.maps) {
      const client = getGoogleMapsClient();
      this.maps = await client.load();
    }
    return this.maps;
  }

  public async findNearbyPlaces(request: NearbyPlacesRequest): Promise<NearbyPlacesResult> {
    const maps = await this.ensureMapsLoaded();

    const placesService = new maps.places.PlacesService(document.createElement('div'));

    const placesRequest: google.maps.places.PlaceSearchRequest = {
      location: new maps.LatLng(request.location.lat, request.location.lng),
      radius: request.radius || 2000,
      type: request.type as string,
      keyword: request.keyword,
      minPriceLevel: request.minPrice,
      maxPriceLevel: request.maxPrice,
      openNow: request.openNow,
      rankBy: request.rankBy === 'distance' ? maps.places.RankBy.DISTANCE : maps.places.RankBy.PROMINENCE,
    };

    return new Promise((resolve, reject) => {
      placesService.nearbySearch(placesRequest, (results, status, pagination) => {
        if (status === maps.places.PlacesServiceStatus.OK && results) {
          const processedPlaces = results.map(result => ({
            id: result.place_id!,
            name: result.name!,
            address: result.vicinity!,
            coordinates: {
              lat: result.geometry!.location!.lat(),
              lng: result.geometry!.location!.lng(),
            },
            rating: result.rating,
            priceLevel: result.price_level,
            types: result.types || [],
            openNow: result.opening_hours?.isOpen(),
            photoUrl: result.photos?.[0]?.getUrl ? result.photos[0].getUrl({}) : undefined,
            placeId: result.place_id!,
          }));

          const result: NearbyPlacesResult = {
            places: processedPlaces,
            status,
          };

          resolve(result);
        } else {
          reject(new Error(`Places API error: ${status}`));
        }
      });
    });
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

  // Calculate distance from search location to each place
  public calculateDistances(
    searchLocation: { lat: number; lng: number },
    places: NearbyPlace[]
  ): NearbyPlace[] {
    return places.map(place => ({
      ...place,
      distance: this.calculateHaversineDistance(
        searchLocation,
        place.geometry.location
      ),
    }));
  }

  // Calculate straight-line distance using Haversine formula
  private calculateHaversineDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371000; // Earth's radius in meters
    const dLat = this.toRadians(point2.lat - point1.lat);
    const dLon = this.toRadians(point2.lng - point1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

// Utility functions
export const getNearbyPlacesService = (): NearbyPlacesService => {
  return NearbyPlacesService.getInstance();
};

export const findNearbyPlaces = async (
  location: { lat: number; lng: number },
  type?: string,
  radius?: number
): Promise<NearbyPlacesResult> => {
  return getNearbyPlacesService().findNearbyPlaces({ location, type, radius });
};