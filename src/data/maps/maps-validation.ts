import { z } from 'zod';

// Coordinate validation
export const coordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// Bounds validation
export const boundsSchema = z.object({
  northeast: coordinateSchema,
  southwest: coordinateSchema,
});

// Address validation
export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  postcode: z.string().min(1),
  country: z.string().min(1),
});

// UK Postcode validation
export const postcodeSchema = z.string().refine((postcode) => {
  const normalized = postcode.replace(/\s+/g, '').toUpperCase();
  return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(normalized);
}, {
  message: 'Invalid UK postcode format',
});

// Service area check request validation
export const serviceAreaCheckSchema = z.object({
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  postcode: postcodeSchema.optional(),
}).refine((data) => data.lat && data.lng || data.postcode, {
  message: 'Either coordinates or postcode must be provided',
});

// Directions request validation
export const directionsRequestSchema = z.object({
  origin: z.union([coordinateSchema, z.string().min(1)]),
  destination: z.union([coordinateSchema, z.string().min(1)]),
  travelMode: z.enum(['driving', 'walking', 'transit', 'bicycling']).default('driving'),
  waypoints: z.array(z.union([coordinateSchema, z.string().min(1)])).optional(),
  avoidHighways: z.boolean().default(false),
  avoidTolls: z.boolean().default(false),
  optimizeWaypoints: z.boolean().default(false),
  provideRouteAlternatives: z.boolean().default(false),
});

// Distance request validation
export const distanceRequestSchema = z.object({
  origins: z.array(z.union([coordinateSchema, z.string().min(1)])),
  destinations: z.array(z.union([coordinateSchema, z.string().min(1)])),
  travelMode: z.enum(['driving', 'walking', 'transit', 'bicycling']).default('driving'),
  unitSystem: z.enum(['metric', 'imperial']).default('metric'),
  avoidHighways: z.boolean().default(false),
  avoidTolls: z.boolean().default(false),
});

// Nearby places request validation
export const nearbyPlacesRequestSchema = z.object({
  location: coordinateSchema,
  radius: z.number().min(1).max(50000).default(2000),
  type: z.enum(['restaurant', 'parking', 'supermarket', 'pharmacy', 'bank', 'atm']).optional(),
  keyword: z.string().optional(),
  minPrice: z.number().min(0).max(4).optional(),
  maxPrice: z.number().min(0).max(4).optional(),
  openNow: z.boolean().default(false),
  rankBy: z.enum(['prominence', 'distance']).default('prominence'),
});

// Geocode request validation
export const geocodeRequestSchema = z.object({
  address: z.string().min(1),
  region: z.string().length(2).default('GB'),
  bounds: boundsSchema.optional(),
  componentRestrictions: z.object({
    country: z.string().optional(),
    postalCode: z.string().optional(),
    administrativeArea: z.string().optional(),
    locality: z.string().optional(),
  }).optional(),
});

// User location validation
export const userLocationSchema = z.object({
  coordinates: coordinateSchema,
  accuracy: z.number().positive().optional(),
  timestamp: z.number().positive(),
  address: z.object({
    formatted: z.string(),
    components: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      postcode: z.string().optional(),
      country: z.string().optional(),
    }),
  }).optional(),
  method: z.enum(['geolocation', 'manual', 'ip', 'postcode']),
});

// Delivery quote request validation
export const deliveryQuoteRequestSchema = z.object({
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  postcode: postcodeSchema.optional(),
  orderTotal: z.number().min(0).default(0),
}).refine((data) => data.lat && data.lng || data.postcode, {
  message: 'Either coordinates or postcode must be provided',
});

// Map marker validation
export const mapMarkerSchema = z.object({
  id: z.string().min(1),
  position: coordinateSchema,
  title: z.string().optional(),
  icon: z.string().url().optional(),
  label: z.string().max(1).optional(),
  clickable: z.boolean().default(true),
  draggable: z.boolean().default(false),
  visible: z.boolean().default(true),
  zIndex: z.number().optional(),
});

// Map polygon validation
export const mapPolygonSchema = z.object({
  id: z.string().min(1),
  paths: z.array(coordinateSchema).min(3),
  strokeColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  strokeOpacity: z.number().min(0).max(1).optional(),
  strokeWeight: z.number().positive().optional(),
  fillColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  fillOpacity: z.number().min(0).max(1).optional(),
  clickable: z.boolean().default(true),
  draggable: z.boolean().default(false),
  editable: z.boolean().default(false),
  visible: z.boolean().default(true),
  zIndex: z.number().optional(),
});

// Map configuration validation
export const mapConfigSchema = z.object({
  center: coordinateSchema,
  zoom: z.number().min(0).max(21).default(15),
  mapTypeId: z.enum(['roadmap', 'satellite', 'hybrid', 'terrain']).default('roadmap'),
  styles: z.array(z.any()).optional(),
  disableDefaultUI: z.boolean().default(false),
  zoomControl: z.boolean().default(true),
  mapTypeControl: z.boolean().default(false),
  scaleControl: z.boolean().default(false),
  streetViewControl: z.boolean().default(false),
  rotateControl: z.boolean().default(false),
  fullscreenControl: z.boolean().default(true),
  gestureHandling: z.enum(['cooperative', 'greedy', 'none', 'auto']).default('cooperative'),
  minZoom: z.number().min(0).max(21).optional(),
  maxZoom: z.number().min(0).max(21).optional(),
});

// API response validation schemas
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) => z.object({
  success: z.boolean(),
  data: dataSchema.optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const mapsApiResponseSchema = <T extends z.ZodType>(dataSchema: T) => apiResponseSchema(dataSchema).extend({
  cached: z.boolean().optional(),
  timestamp: z.number().optional(),
});

// Error response validation
export const errorResponseSchema = z.object({
  type: z.string(),
  message: z.string(),
  status: z.string().optional(),
  details: z.any().optional(),
});

// Validation helper functions
export const validateServiceAreaCheck = (data: unknown) => {
  return serviceAreaCheckSchema.safeParse(data);
};

export const validateDirectionsRequest = (data: unknown) => {
  return directionsRequestSchema.safeParse(data);
};

export const validateDistanceRequest = (data: unknown) => {
  return distanceRequestSchema.safeParse(data);
};

export const validateNearbyPlacesRequest = (data: unknown) => {
  return nearbyPlacesRequestSchema.safeParse(data);
};

export const validateGeocodeRequest = (data: unknown) => {
  return geocodeRequestSchema.safeParse(data);
};

export const validateDeliveryQuoteRequest = (data: unknown) => {
  return deliveryQuoteRequestSchema.safeParse(data);
};

export const validateMapConfig = (data: unknown) => {
  return mapConfigSchema.safeParse(data);
};