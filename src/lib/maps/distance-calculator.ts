import { getGoogleMapsClient } from './google-maps-client';

export interface DistanceResult {
  distance: {
    text: string;
    value: number; // meters
  };
  duration: {
    text: string;
    value: number; // seconds
  };
  status: string;
}

export interface DistanceMatrixRequest {
  origins: Array<{ lat: number; lng: number } | string>;
  destinations: Array<{ lat: number; lng: number } | string>;
  travelMode?: google.maps.TravelMode;
  unitSystem?: google.maps.UnitSystem;
  avoidHighways?: boolean;
  avoidTolls?: boolean;
}

export class DistanceCalculator {
  private static instance: DistanceCalculator;
  private maps: typeof google.maps | null = null;

  private constructor() {}

  public static getInstance(): DistanceCalculator {
    if (!DistanceCalculator.instance) {
      DistanceCalculator.instance = new DistanceCalculator();
    }
    return DistanceCalculator.instance;
  }

  private async ensureMapsLoaded(): Promise<typeof google.maps> {
    if (!this.maps) {
      const client = getGoogleMapsClient();
      this.maps = await client.load();
    }
    return this.maps;
  }

  public async calculateDistance(request: DistanceMatrixRequest): Promise<DistanceResult[]> {
    const maps = await this.ensureMapsLoaded();

    const service = new maps.DistanceMatrixService();

    const distanceMatrixRequest: google.maps.DistanceMatrixRequest = {
      origins: request.origins,
      destinations: request.destinations,
      travelMode: request.travelMode || maps.TravelMode.DRIVING,
      unitSystem: request.unitSystem || maps.UnitSystem.METRIC,
      avoidHighways: request.avoidHighways || false,
      avoidTolls: request.avoidTolls || false,
    };

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(distanceMatrixRequest, (response, status) => {
        if (status === maps.DistanceMatrixStatus.OK && response) {
          const results: DistanceResult[] = [];

          for (let i = 0; i < response.rows.length; i++) {
            const row = response.rows[i];
            for (let j = 0; j < row.elements.length; j++) {
              const element = row.elements[j];
              results.push({
                distance: {
                  text: element.distance?.text || 'N/A',
                  value: element.distance?.value || 0,
                },
                duration: {
                  text: element.duration?.text || 'N/A',
                  value: element.duration?.value || 0,
                },
                status: element.status,
              });
            }
          }

          resolve(results);
        } else {
          reject(new Error(`Distance Matrix API error: ${status}`));
        }
      });
    });
  }

  public async calculateDistanceBetweenPoints(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    travelMode: google.maps.TravelMode = google.maps.TravelMode.DRIVING
  ): Promise<DistanceResult> {
    const results = await this.calculateDistance({
      origins: [origin],
      destinations: [destination],
      travelMode,
    });

    if (results.length === 0) {
      throw new Error('No distance results found');
    }

    return results[0];
  }

  // Calculate straight-line distance using Haversine formula (fallback when API fails)
  public calculateHaversineDistance(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): { distance: number; unit: 'km' | 'miles' } {
    const R = 6371; // Earth's radius in kilometers

    const dLat = this.toRadians(destination.lat - origin.lat);
    const dLon = this.toRadians(destination.lng - origin.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(origin.lat)) * Math.cos(this.toRadians(destination.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return {
      distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
      unit: 'km',
    };
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

// Utility function to get distance calculator instance
export const getDistanceCalculator = (): DistanceCalculator => {
  return DistanceCalculator.getInstance();
};