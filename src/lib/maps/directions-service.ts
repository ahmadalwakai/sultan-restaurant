import { getGoogleMapsClient } from './google-maps-client';

export interface DirectionsRequest {
  origin: { lat: number; lng: number } | string;
  destination: { lat: number; lng: number } | string;
  travelMode?: google.maps.TravelMode;
  waypoints?: Array<{ lat: number; lng: number } | string>;
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  optimizeWaypoints?: boolean;
  provideRouteAlternatives?: boolean;
}

export interface DirectionsResult {
  routes: Array<{
    summary: string;
    legs: Array<{
      distance: {
        text: string;
        value: number; // meters
      };
      duration: {
        text: string;
        value: number; // seconds
      };
      duration_in_traffic?: {
        text: string;
        value: number; // seconds
      };
      start_location: { lat: number; lng: number };
      end_location: { lat: number; lng: number };
      start_address: string;
      end_address: string;
      steps: Array<{
        distance: { text: string; value: number };
        duration: { text: string; value: number };
        instructions: string;
        maneuver?: string;
        start_location: { lat: number; lng: number };
        end_location: { lat: number; lng: number };
        polyline: string;
        travel_mode: string;
      }>;
      via_waypoints: Array<{ lat: number; lng: number }>;
    }>;
    overview_polyline: string;
    bounds: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
    copyrights: string;
    warnings: string[];
  }>;
  status: string;
  geocoded_waypoints: Array<{
    geocoder_status: string;
    place_id: string;
    types: string[];
  }>;
}

export class DirectionsService {
  private static instance: DirectionsService;
  private maps: typeof google.maps | null = null;

  private constructor() {}

  public static getInstance(): DirectionsService {
    if (!DirectionsService.instance) {
      DirectionsService.instance = new DirectionsService();
    }
    return DirectionsService.instance;
  }

  private async ensureMapsLoaded(): Promise<typeof google.maps> {
    if (!this.maps) {
      const client = getGoogleMapsClient();
      this.maps = await client.load();
    }
    return this.maps;
  }

  public async getDirections(request: DirectionsRequest): Promise<DirectionsResult> {
    const maps = await this.ensureMapsLoaded();

    const directionsService = new maps.DirectionsService();

    const directionsRequest: google.maps.DirectionsRequest = {
      origin: request.origin,
      destination: request.destination,
      travelMode: request.travelMode || maps.TravelMode.DRIVING,
      waypoints: request.waypoints?.map(wp => ({ location: wp, stopover: true })),
      avoidHighways: request.avoidHighways || false,
      avoidTolls: request.avoidTolls || false,
      optimizeWaypoints: request.optimizeWaypoints || false,
      provideRouteAlternatives: request.provideRouteAlternatives || false,
    };

    return new Promise((resolve, reject) => {
      directionsService.route(directionsRequest, (response, status) => {
        if (status === maps.DirectionsStatus.OK && response) {
          const result: DirectionsResult = {
            routes: response.routes.map(route => ({
              summary: route.summary,
              legs: route.legs.map(leg => ({
                distance: {
                  text: leg.distance?.text || '',
                  value: leg.distance?.value || 0,
                },
                duration: {
                  text: leg.duration?.text || '',
                  value: leg.duration?.value || 0,
                },
                duration_in_traffic: leg.duration_in_traffic ? {
                  text: leg.duration_in_traffic.text,
                  value: leg.duration_in_traffic.value,
                } : undefined,
                start_location: {
                  lat: leg.start_location.lat(),
                  lng: leg.start_location.lng(),
                },
                end_location: {
                  lat: leg.end_location.lat(),
                  lng: leg.end_location.lng(),
                },
                start_address: leg.start_address,
                end_address: leg.end_address,
                steps: leg.steps.map(step => ({
                  distance: {
                    text: step.distance?.text || '',
                    value: step.distance?.value || 0,
                  },
                  duration: {
                    text: step.duration?.text || '',
                    value: step.duration?.value || 0,
                  },
                  instructions: step.instructions,
                  maneuver: step.maneuver || undefined,
                  start_location: {
                    lat: step.start_location.lat(),
                    lng: step.start_location.lng(),
                  },
                  end_location: {
                    lat: step.end_location.lat(),
                    lng: step.end_location.lng(),
                  },
                  polyline: step.polyline?.points || '',
                  travel_mode: step.travel_mode,
                })),
                via_waypoints: leg.via_waypoints.map(wp => ({
                  lat: wp.lat(),
                  lng: wp.lng(),
                })),
              })),
              overview_polyline: route.overview_polyline || '',
              bounds: {
                northeast: {
                  lat: route.bounds.getNorthEast().lat(),
                  lng: route.bounds.getNorthEast().lng(),
                },
                southwest: {
                  lat: route.bounds.getSouthWest().lat(),
                  lng: route.bounds.getSouthWest().lng(),
                },
              },
              copyrights: route.copyrights,
              warnings: route.warnings,
            })),
            status,
            geocoded_waypoints: response.geocoded_waypoints?.map((wp: any) => ({
              geocoder_status: wp.geocoder_status || wp.geocoderStatus || '',
              place_id: wp.place_id || wp.placeId || '',
              types: wp.types || [],
            })) || [],
          };

          resolve(result);
        } else {
          reject(new Error(`Directions API error: ${status}`));
        }
      });
    });
  }

  public async getDrivingDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsRequest>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      ...options,
    });
  }

  public async getWalkingDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsRequest>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: google.maps.TravelMode.WALKING,
      ...options,
    });
  }

  public async getTransitDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsRequest>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: google.maps.TravelMode.TRANSIT,
      ...options,
    });
  }

  public async getCyclingDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string,
    options?: Partial<DirectionsRequest>
  ): Promise<DirectionsResult> {
    return this.getDirections({
      origin,
      destination,
      travelMode: google.maps.TravelMode.BICYCLING,
      ...options,
    });
  }
}

// Utility function to get directions service instance
export const getDirectionsService = (): DirectionsService => {
  return DirectionsService.getInstance();
};