// Maps-related constants for Sultan Restaurant

export const MAPS_CONSTANTS = {
  // Google Maps API settings
  API: {
    VERSION: 'weekly',
    LIBRARIES: ['places', 'geometry'],
    REGION: 'GB',
    LANGUAGE: 'en',
  },

  // Default map settings
  DEFAULT_MAP: {
    ZOOM: 15,
    CENTER: { lat: 55.8642, lng: -4.2518 },
    MAP_TYPE: 'roadmap' as const,
    GESTURE_HANDLING: 'cooperative' as const,
  },

  // Service area settings
  SERVICE_AREA: {
    RADIUS_METERS: 5000,
    DEFAULT_DELIVERY_FEE: 2.99,
    FREE_DELIVERY_THRESHOLD: 25.00,
    MINIMUM_ORDER: 15.00,
    ESTIMATED_DELIVERY_TIME: {
      MIN: 25,
      MAX: 45,
    },
  },

  // Search settings
  SEARCH: {
    DEFAULT_RADIUS: 2000,
    MAX_RADIUS: 50000,
    NEARBY_TYPES: ['restaurant', 'parking', 'supermarket', 'pharmacy', 'bank', 'atm'] as const,
  },

  // Cache settings
  CACHE: {
    GEOCODE_TTL: 24 * 60 * 60 * 1000, // 24 hours
    DIRECTIONS_TTL: 1 * 60 * 60 * 1000, // 1 hour
    DISTANCE_TTL: 1 * 60 * 60 * 1000, // 1 hour
    NEARBY_PLACES_TTL: 2 * 60 * 60 * 1000, // 2 hours
    SERVICE_AREA_TTL: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 50,
    MAX_REQUESTS_PER_HOUR: 1000,
  },

  // Error messages
  ERRORS: {
    API_KEY_MISSING: 'Google Maps API key is required',
    API_KEY_INVALID: 'Invalid Google Maps API key',
    QUOTA_EXCEEDED: 'API quota exceeded, please try again later',
    NETWORK_ERROR: 'Network error, please check your connection',
    ZERO_RESULTS: 'No results found for your search',
    INVALID_REQUEST: 'Invalid request parameters',
    UNKNOWN_ERROR: 'An unexpected error occurred',
  },

  // UI constants
  UI: {
    MARKER_COLORS: {
      RESTAURANT: '#e53e3e',
      USER_LOCATION: '#3182ce',
      DESTINATION: '#38a169',
      WAYPOINT: '#805ad5',
    },
    POLYGON_STYLES: {
      SERVICE_AREA: {
        strokeColor: '#e53e3e',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#fed7d7',
        fillOpacity: 0.3,
      },
      DELIVERY_ZONE: {
        strokeColor: '#38a169',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#c6f6d5',
        fillOpacity: 0.2,
      },
    },
    MAP_STYLES: {
      LIGHT: [],
      DARK: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      ],
    },
  },
} as const;

// Travel mode mappings
export const TRAVEL_MODES = {
  driving: google.maps.TravelMode.DRIVING,
  walking: google.maps.TravelMode.WALKING,
  transit: google.maps.TravelMode.TRANSIT,
  bicycling: google.maps.TravelMode.BICYCLING,
} as const;

// Unit system mappings
export const UNIT_SYSTEMS = {
  metric: google.maps.UnitSystem.METRIC,
  imperial: google.maps.UnitSystem.IMPERIAL,
} as const;

// Place types for nearby search
export const PLACE_TYPES = {
  restaurant: 'restaurant',
  parking: 'parking',
  supermarket: 'supermarket',
  pharmacy: 'pharmacy',
  bank: 'bank',
  atm: 'atm',
  hospital: 'hospital',
  school: 'school',
  shopping_mall: 'shopping_mall',
  gas_station: 'gas_station',
} as const;

// HTTP status codes for API responses
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;