import { getServiceRadiusManager } from '../../maps/service-radius';
import { getGeocodeService } from '../../maps/geocode-service';
import { getMapsCache, MapsCache } from '../../maps/cache';
import { getMapsErrorHandler, handleMapsError } from '../../maps/error-handler';
import { isValidLatLng } from '../../maps/utils';
import { isValidPostcode } from '../../maps/postcode-validator';
import type { ServiceArea, DeliveryQuoteResponse, PostcodeInfo } from '../../maps/types';

export interface ServiceAreaCheckRequest {
  lat?: number;
  lng?: number;
  postcode?: string;
}

export interface ServiceAreaCheckResult {
  inServiceArea: boolean;
  distance: number; // km
  deliveryFee: number;
  estimatedTime: {
    min: number;
    max: number;
  };
  freeDelivery: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  postcode?: string;
}

export class ServiceAreaService {
  private static instance: ServiceAreaService;
  private serviceRadiusManager = getServiceRadiusManager();
  private geocodeService = getGeocodeService();
  private cache = getMapsCache();
  private errorHandler = getMapsErrorHandler();

  private constructor() {}

  public static getInstance(): ServiceAreaService {
    if (!ServiceAreaService.instance) {
      ServiceAreaService.instance = new ServiceAreaService();
    }
    return ServiceAreaService.instance;
  }

  public async checkServiceAreaCoverage(request: ServiceAreaCheckRequest): Promise<ServiceAreaCheckResult> {
    try {
      let coordinates: { lat: number; lng: number };
      let postcode: string | undefined;

      // Validate input
      if (request.lat !== undefined && request.lng !== undefined) {
        if (!isValidLatLng(request.lat, request.lng)) {
          throw new Error('Invalid latitude or longitude values');
        }
        coordinates = { lat: request.lat, lng: request.lng };
      } else if (request.postcode) {
        // Geocode postcode to coordinates
        const geocodeResult = await this.geocodePostcode(request.postcode);
        coordinates = geocodeResult.coordinates!;
        postcode = geocodeResult.postcode;
      } else {
        throw new Error('Either coordinates or postcode must be provided');
      }

      // Check cache first
      const cacheKey = MapsCache.generateServiceAreaKey(coordinates);
      const cachedResult = this.cache.get<ServiceAreaCheckResult>(cacheKey);
      if (cachedResult) {
        return {
          ...cachedResult,
          postcode: postcode || cachedResult.postcode,
        };
      }

      // Check if point is in service area
      const inServiceArea = this.serviceRadiusManager.isPointInServiceArea(coordinates);

      // Calculate distance from restaurant
      const restaurantLocation = this.serviceRadiusManager.getCenter();
      const distance = this.calculateDistance(coordinates, restaurantLocation);

      // Calculate delivery details
      const deliveryFee = this.serviceRadiusManager.calculateDeliveryFee(distance, 0); // No order total provided
      const estimatedTime = this.serviceRadiusManager.getEstimatedDeliveryTime(distance);

      const result: ServiceAreaCheckResult = {
        inServiceArea,
        distance,
        deliveryFee,
        estimatedTime,
        freeDelivery: deliveryFee === 0,
        coordinates,
        postcode,
      };

      // Cache result for 1 hour
      this.cache.set(cacheKey, result, 60 * 60 * 1000);

      return result;
    } catch (error) {
      throw handleMapsError(error, 'service area check');
    }
  }

  public async getDeliveryQuote(
    request: ServiceAreaCheckRequest,
    orderTotal: number = 0
  ): Promise<DeliveryQuoteResponse> {
    const serviceCheck = await this.checkServiceAreaCoverage(request);

    if (!serviceCheck.inServiceArea) {
      return {
        distance: serviceCheck.distance,
        duration: Math.round((serviceCheck.estimatedTime.min + serviceCheck.estimatedTime.max) / 2),
        fee: 0,
        freeDelivery: true,
        estimatedArrival: new Date(Date.now() + serviceCheck.estimatedTime.min * 60 * 1000),
        serviceAvailable: false,
        message: 'Delivery not available to this location',
      };
    }

    const deliveryFee = this.serviceRadiusManager.calculateDeliveryFee(serviceCheck.distance, orderTotal);
    const estimatedTime = this.serviceRadiusManager.getEstimatedDeliveryTime(serviceCheck.distance);

    return {
      distance: serviceCheck.distance,
      duration: Math.round((estimatedTime.min + estimatedTime.max) / 2),
      fee: deliveryFee,
      freeDelivery: deliveryFee === 0,
      estimatedArrival: new Date(Date.now() + estimatedTime.min * 60 * 1000),
      serviceAvailable: true,
    };
  }

  public getServiceArea(): ServiceArea {
    const serviceRadius = this.serviceRadiusManager.getServiceRadius();
    return {
      center: serviceRadius.center,
      radius: serviceRadius.radius,
      polygon: serviceRadius.polygon,
      delivery: {
        enabled: true,
        minimumOrder: 15,
        fee: {
          base: serviceRadius.deliveryFee.base,
          perKm: serviceRadius.deliveryFee.perKm,
          freeThreshold: serviceRadius.deliveryFee.freeDeliveryThreshold,
        },
        estimatedTime: serviceRadius.estimatedDeliveryTime,
      },
      collection: {
        enabled: true,
        estimatedTime: 20,
      },
    };
  }

  public async geocodePostcode(postcode: string): Promise<PostcodeInfo> {
    if (!isValidPostcode(postcode)) {
      throw new Error('Invalid postcode format');
    }

    try {
      const geocodeResult = await this.geocodeService.geocodeAddress(postcode, 'GB');

      if (!geocodeResult) {
        throw new Error('Postcode not found');
      }

      const coordinates = geocodeResult.coordinates;

      return {
        postcode: postcode.toUpperCase(),
        normalized: postcode.toUpperCase(),
        area: postcode.substring(0, postcode.search(/\d/)).toUpperCase(),
        district: postcode.substring(0, postcode.search(/\d/) + 1).toUpperCase(),
        sector: postcode.charAt(postcode.length - 3),
        unit: postcode.substring(postcode.length - 2).toUpperCase(),
        coordinates,
        isValid: true,
        isGlasgowArea: postcode.toUpperCase().startsWith('G'),
      };
    } catch (error) {
      throw handleMapsError(error, 'postcode geocoding');
    }
  }

  public async validatePostcodeForDelivery(postcode: string): Promise<boolean> {
    try {
      const postcodeInfo = await this.geocodePostcode(postcode);
      const serviceCheck = await this.checkServiceAreaCoverage({
        lat: postcodeInfo.coordinates!.lat,
        lng: postcodeInfo.coordinates!.lng,
      });
      return serviceCheck.inServiceArea;
    } catch (error) {
      return false;
    }
  }

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
    return R * c / 1000; // Convert to kilometers
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

// Utility functions
export const checkServiceAreaCoverage = async (
  request: ServiceAreaCheckRequest
): Promise<ServiceAreaCheckResult> => {
  return ServiceAreaService.getInstance().checkServiceAreaCoverage(request);
};

export const getDeliveryQuote = async (
  request: ServiceAreaCheckRequest,
  orderTotal?: number
): Promise<DeliveryQuoteResponse> => {
  return ServiceAreaService.getInstance().getDeliveryQuote(request, orderTotal);
};

export const validatePostcodeForDelivery = async (postcode: string): Promise<boolean> => {
  return ServiceAreaService.getInstance().validatePostcodeForDelivery(postcode);
};