// Type definitions for maps functionality

export interface RestaurantLocation {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
}

export interface ServiceArea {
  center: {
    lat: number;
    lng: number;
  };
  radius: number; // meters
  polygon: Array<{
    lat: number;
    lng: number;
  }>;
  delivery: {
    enabled: boolean;
    minimumOrder: number;
    fee: {
      base: number;
      perKm: number;
      freeThreshold: number;
    };
    estimatedTime: {
      min: number;
      max: number;
    };
  };
  collection: {
    enabled: boolean;
    estimatedTime: number;
  };
}

export interface DeliveryZone {
  id: string;
  name: string;
  polygon: Array<{
    lat: number;
    lng: number;
  }>;
  deliveryFee: number;
  minimumOrder: number;
  estimatedTime: {
    min: number;
    max: number;
  };
  active: boolean;
}

export interface UserLocation {
  coordinates: {
    lat: number;
    lng: number;
  };
  accuracy?: number;
  timestamp: number;
  address?: {
    formatted: string;
    components: {
      street?: string;
      city?: string;
      postcode?: string;
      country?: string;
    };
  };
  method: 'geolocation' | 'manual' | 'ip' | 'postcode';
}

export interface RouteInfo {
  distance: {
    text: string;
    value: number; // meters
  };
  duration: {
    text: string;
    value: number; // seconds
  };
  durationInTraffic?: {
    text: string;
    value: number; // seconds
  };
  polyline: string;
  bounds: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
  legs?: Array<{
    distance: { text: string; value: number };
    duration: { text: string; value: number };
    durationInTraffic?: { text: string; value: number };
    startLocation: { lat: number; lng: number };
    endLocation: { lat: number; lng: number };
    startAddress: string;
    endAddress: string;
    steps: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      instructions: string;
      maneuver?: string;
      startLocation: { lat: number; lng: number };
      endLocation: { lat: number; lng: number };
      polyline: string;
      travelMode: string;
    }>;
  }>;
  steps: Array<{
    distance: { text: string; value: number };
    duration: { text: string; value: number };
    instructions: string;
    maneuver?: string;
    startLocation: { lat: number; lng: number };
    endLocation: { lat: number; lng: number };
    polyline: string;
    travelMode: string;
  }>;
}

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

export interface DirectionsOptions {
  origin: { lat: number; lng: number } | string;
  destination: { lat: number; lng: number } | string;
  travelMode: 'driving' | 'walking' | 'transit' | 'bicycling';
  waypoints?: Array<{ lat: number; lng: number } | string>;
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  optimizeWaypoints?: boolean;
  provideRouteAlternatives?: boolean;
  departureTime?: Date;
  arrivalTime?: Date;
}

export interface DistanceMatrixOptions {
  origins: Array<{ lat: number; lng: number } | string>;
  destinations: Array<{ lat: number; lng: number } | string>;
  travelMode: 'driving' | 'walking' | 'transit' | 'bicycling';
  unitSystem: 'metric' | 'imperial';
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  departureTime?: Date;
  arrivalTime?: Date;
}

export interface GeocodeOptions {
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

export interface NearbySearchOptions {
  location: { lat: number; lng: number };
  radius?: number;
  type?: 'restaurant' | 'parking' | 'supermarket' | 'pharmacy' | 'bank' | 'atm';
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  openNow?: boolean;
  rankBy?: 'prominence' | 'distance';
}

export interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    time: number;
  }>;
  photos?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  openingHours?: {
    openNow: boolean;
    periods: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
    weekdayText: string[];
  };
  geometry: {
    location: { lat: number; lng: number };
    viewport: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
}

export interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title?: string;
  icon?: string;
  label?: string;
  clickable?: boolean;
  draggable?: boolean;
  visible?: boolean;
  zIndex?: number;
}

export interface DirectionsResult {
  routes: Array<{
    summary: string;
    legs: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      duration_in_traffic?: { text: string; value: number };
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
  geocodedWaypoints?: Array<{
    geocoderStatus: string;
    placeId?: string;
    types: string[];
  }>;
}

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

export interface MapPolygon {
  id: string;
  paths: Array<{ lat: number; lng: number }>;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillColor?: string;
  fillOpacity?: number;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  visible?: boolean;
  zIndex?: number;
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

export interface NearbyPlacesResult {
  places: Array<{
    id: string;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    rating?: number;
    priceLevel?: number;
    types: string[];
    distance?: number; // meters
    duration?: number; // seconds
    openNow?: boolean;
    photoUrl?: string;
    placeId: string;
  }>;
  status: string;
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

export interface DeliveryQuote {
  distance: number;
  duration: number; // minutes
  fee: number;
  minimumOrder: number;
  estimatedTime: {
    min: number;
    max: number;
  };
  available: boolean;
}

export interface MapCircle {
  id: string;
  center: { lat: number; lng: number };
  radius: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillColor?: string;
  fillOpacity?: number;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  visible?: boolean;
  zIndex?: number;
}

export interface MapConfig {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeId: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  styles?: google.maps.MapTypeStyle[];
  disableDefaultUI?: boolean;
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  scaleControl?: boolean;
  streetViewControl?: boolean;
  rotateControl?: boolean;
  fullscreenControl?: boolean;
  gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
  minZoom?: number;
  maxZoom?: number;
}

export interface PostcodeInfo {
  postcode: string;
  normalized: string;
  area: string;
  district: string;
  sector: string;
  unit: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isValid: boolean;
  isGlasgowArea: boolean;
}

export interface DeliveryQuoteResponse {
  distance: number; // km
  duration: number; // minutes
  fee: number; // £
  freeDelivery: boolean;
  estimatedArrival: Date;
  serviceAvailable: boolean;
  message?: string;
}

export interface LocationSearchResult {
  query: string;
  results: Array<{
    placeId: string;
    description: string;
    structuredFormatting: {
      mainText: string;
      secondaryText: string;
    };
    types: string[];
  }>;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface MapsApiResponse<T> extends ApiResponse<T> {
  cached?: boolean;
  timestamp?: number;
}

// Error types
export interface MapsError {
  type: string;
  message: string;
  status?: string;
  details?: any;
}

// Cache types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface CacheStats {
  size: number;
  hitRate?: number;
  entries: Array<{
    key: string;
    age: number;
    ttl: number;
  }>;
}