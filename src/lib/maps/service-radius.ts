import { RESTAURANT_COORDINATES } from '@/data/maps/restaurant-coordinates';
import { SERVICE_AREA_POLYGON } from '@/data/maps/service-area-polygon';

export interface ServiceRadius {
  center: {
    lat: number;
    lng: number;
  };
  radius: number; // in meters
  polygon: Array<{ lat: number; lng: number }>;
  deliveryFee: {
    base: number; // £
    perKm: number; // £ per km
    freeDeliveryThreshold: number; // £
  };
  estimatedDeliveryTime: {
    min: number; // minutes
    max: number; // minutes
  };
}

export class ServiceRadiusManager {
  private static instance: ServiceRadiusManager;
  private serviceRadius: ServiceRadius;

  private constructor() {
    this.serviceRadius = {
      center: RESTAURANT_COORDINATES,
      radius: 5000, // 5km radius
      polygon: [...SERVICE_AREA_POLYGON],
      deliveryFee: {
        base: 2.99,
        perKm: 0.50,
        freeDeliveryThreshold: 25.00,
      },
      estimatedDeliveryTime: {
        min: 25,
        max: 45,
      },
    };
  }

  public static getInstance(): ServiceRadiusManager {
    if (!ServiceRadiusManager.instance) {
      ServiceRadiusManager.instance = new ServiceRadiusManager();
    }
    return ServiceRadiusManager.instance;
  }

  public getServiceRadius(): ServiceRadius {
    return { ...this.serviceRadius };
  }

  public getCenter(): { lat: number; lng: number } {
    return { ...this.serviceRadius.center };
  }

  public getRadius(): number {
    return this.serviceRadius.radius;
  }

  public getPolygon(): Array<{ lat: number; lng: number }> {
    return [...this.serviceRadius.polygon];
  }

  public getDeliveryFee(): ServiceRadius['deliveryFee'] {
    return { ...this.serviceRadius.deliveryFee };
  }

  // Check if a point is within the service area using point-in-polygon algorithm
  public isPointInServiceArea(point: { lat: number; lng: number }): boolean {
    return this.pointInPolygon(point, this.serviceRadius.polygon);
  }

  // Check if coordinates are within the circular radius
  public isWithinRadius(point: { lat: number; lng: number }): boolean {
    const distance = this.calculateDistance(point, this.serviceRadius.center);
    return distance <= this.serviceRadius.radius;
  }

  // Calculate distance between two points using Haversine formula
  private calculateDistance(
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
    return R * c;
  }

  // Point in polygon algorithm (Ray casting algorithm)
  private pointInPolygon(
    point: { lat: number; lng: number },
    polygon: Array<{ lat: number; lng: number }>
  ): boolean {
    let inside = false;
    const x = point.lng;
    const y = point.lat;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lng;
      const yi = polygon[i].lat;
      const xj = polygon[j].lng;
      const yj = polygon[j].lat;

      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }

    return inside;
  }

  // Calculate delivery fee based on distance
  public calculateDeliveryFee(distanceKm: number, orderTotal: number): number {
    // Free delivery if order total exceeds threshold
    if (orderTotal >= this.serviceRadius.deliveryFee.freeDeliveryThreshold) {
      return 0;
    }

    // Base fee plus per km charge
    const distanceFee = Math.max(0, distanceKm - 1) * this.serviceRadius.deliveryFee.perKm;
    return Math.round((this.serviceRadius.deliveryFee.base + distanceFee) * 100) / 100;
  }

  // Get estimated delivery time based on distance
  public getEstimatedDeliveryTime(distanceKm: number): { min: number; max: number } {
    // Base time plus additional time based on distance
    const additionalTime = Math.floor(distanceKm * 3); // Roughly 3 minutes per km
    return {
      min: this.serviceRadius.estimatedDeliveryTime.min + additionalTime,
      max: this.serviceRadius.estimatedDeliveryTime.max + additionalTime,
    };
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

// Utility functions
export const getServiceRadiusManager = (): ServiceRadiusManager => {
  return ServiceRadiusManager.getInstance();
};

export const isPointInServiceArea = (point: { lat: number; lng: number }): boolean => {
  return getServiceRadiusManager().isPointInServiceArea(point);
};

export const isWithinServiceRadius = (point: { lat: number; lng: number }): boolean => {
  return getServiceRadiusManager().isWithinRadius(point);
};

export const calculateDeliveryFee = (distanceKm: number, orderTotal: number): number => {
  return getServiceRadiusManager().calculateDeliveryFee(distanceKm, orderTotal);
};

export const getEstimatedDeliveryTime = (distanceKm: number): { min: number; max: number } => {
  return getServiceRadiusManager().getEstimatedDeliveryTime(distanceKm);
};