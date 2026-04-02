// Simple in-memory cache for maps data
// In production, consider using Redis or similar

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // time to live in milliseconds
}

export class MapsCache {
  private static instance: MapsCache;
  private cache: Map<string, CacheEntry<any>> = new Map();

  // Default TTL values (in milliseconds)
  public static readonly DEFAULT_TTL = {
    GEOCODE: 24 * 60 * 60 * 1000, // 24 hours
    DIRECTIONS: 1 * 60 * 60 * 1000, // 1 hour
    DISTANCE: 1 * 60 * 60 * 1000, // 1 hour
    NEARBY_PLACES: 2 * 60 * 60 * 1000, // 2 hours
    SERVICE_AREA: 24 * 60 * 60 * 1000, // 24 hours
  };

  private constructor() {
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  public static getInstance(): MapsCache {
    if (!MapsCache.instance) {
      MapsCache.instance = new MapsCache();
    }
    return MapsCache.instance;
  }

  public set<T>(key: string, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || MapsCache.DEFAULT_TTL.GEOCODE, // Default TTL
    };
    this.cache.set(key, entry);
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }

  // Generate cache keys for different types of data
  public static generateGeocodeKey(address: string, region?: string): string {
    return `geocode:${address.toLowerCase()}:${region || 'GB'}`;
  }

  public static generateDirectionsKey(
    origin: string | { lat: number; lng: number },
    destination: string | { lat: number; lng: number },
    travelMode: string
  ): string {
    const originKey = typeof origin === 'string' ? origin : `${origin.lat},${origin.lng}`;
    const destKey = typeof destination === 'string' ? destination : `${destination.lat},${destination.lng}`;
    return `directions:${originKey}:${destKey}:${travelMode}`;
  }

  public static generateDistanceKey(
    origins: Array<string | { lat: number; lng: number }>,
    destinations: Array<string | { lat: number; lng: number }>,
    travelMode: string
  ): string {
    const originsKey = origins.map(o => typeof o === 'string' ? o : `${o.lat},${o.lng}`).join(';');
    const destsKey = destinations.map(d => typeof d === 'string' ? d : `${d.lat},${d.lng}`).join(';');
    return `distance:${originsKey}:${destsKey}:${travelMode}`;
  }

  public static generateNearbyPlacesKey(
    location: { lat: number; lng: number },
    type: string,
    radius: number
  ): string {
    return `nearby:${location.lat},${location.lng}:${type}:${radius}`;
  }

  public static generateServiceAreaKey(point: { lat: number; lng: number }): string {
    return `service_area:${point.lat},${point.lng}`;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  public getStats(): {
    size: number;
    entries: Array<{ key: string; age: number; ttl: number }>;
  } {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: now - entry.timestamp,
      ttl: entry.ttl,
    }));

    return {
      size: this.cache.size,
      entries,
    };
  }
}

// Utility functions for common cache operations
export const getMapsCache = (): MapsCache => {
  return MapsCache.getInstance();
};

export const cacheGeocodeResult = (address: string, region: string, result: any): void => {
  const cache = getMapsCache();
  const key = MapsCache.generateGeocodeKey(address, region);
  cache.set(key, result, MapsCache.DEFAULT_TTL.GEOCODE);
};

export const getCachedGeocodeResult = (address: string, region?: string): any => {
  const cache = getMapsCache();
  const key = MapsCache.generateGeocodeKey(address, region);
  return cache.get(key);
};

export const cacheDirectionsResult = (
  origin: string | { lat: number; lng: number },
  destination: string | { lat: number; lng: number },
  travelMode: string,
  result: any
): void => {
  const cache = getMapsCache();
  const key = MapsCache.generateDirectionsKey(origin, destination, travelMode);
  cache.set(key, result, MapsCache.DEFAULT_TTL.DIRECTIONS);
};

export const getCachedDirectionsResult = (
  origin: string | { lat: number; lng: number },
  destination: string | { lat: number; lng: number },
  travelMode: string
): any => {
  const cache = getMapsCache();
  const key = MapsCache.generateDirectionsKey(origin, destination, travelMode);
  return cache.get(key);
};

export const cacheDistanceResult = (
  origins: Array<string | { lat: number; lng: number }>,
  destinations: Array<string | { lat: number; lng: number }>,
  travelMode: string,
  result: any
): void => {
  const cache = getMapsCache();
  const key = MapsCache.generateDistanceKey(origins, destinations, travelMode);
  cache.set(key, result, MapsCache.DEFAULT_TTL.DISTANCE);
};

export const getCachedDistanceResult = (
  origins: Array<string | { lat: number; lng: number }>,
  destinations: Array<string | { lat: number; lng: number }>,
  travelMode: string
): any => {
  const cache = getMapsCache();
  const key = MapsCache.generateDistanceKey(origins, destinations, travelMode);
  return cache.get(key);
};