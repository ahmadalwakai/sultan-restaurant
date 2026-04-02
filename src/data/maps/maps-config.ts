// Maps configuration for Sultan Restaurant

export const MAPS_CONFIG = {
  // Google Maps API configuration
  googleMaps: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    version: 'weekly',
    libraries: ['places', 'geometry'],
    region: 'GB',
    language: 'en',
  },

  // Default map settings
  defaultMap: {
    center: { lat: 55.8642, lng: -4.2518 },
    zoom: 15,
    mapTypeId: 'roadmap',
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    gestureHandling: 'cooperative',
    minZoom: 10,
    maxZoom: 20,
  },

  // Service area configuration
  serviceArea: {
    center: { lat: 55.8642, lng: -4.2518 },
    radius: 5000, // 5km
    deliveryFee: {
      base: 2.99,
      perKm: 0.50,
      freeThreshold: 25.00,
    },
    minimumOrder: 15.00,
    estimatedTime: {
      min: 25,
      max: 45,
    },
  },

  // Directions configuration
  directions: {
    defaultTravelMode: 'driving',
    provideRouteAlternatives: false,
    avoidHighways: false,
    avoidTolls: false,
    optimizeWaypoints: false,
  },

  // Distance matrix configuration
  distanceMatrix: {
    defaultTravelMode: 'driving',
    unitSystem: 'metric',
    avoidHighways: false,
    avoidTolls: false,
  },

  // Places search configuration
  places: {
    defaultRadius: 2000,
    maxRadius: 50000,
    rankBy: 'prominence',
    minPrice: 0,
    maxPrice: 4,
    openNow: false,
  },

  // Geocoding configuration
  geocoding: {
    defaultRegion: 'GB',
    useViewport: true,
  },

  // Cache configuration
  cache: {
    enabled: true,
    ttl: {
      geocode: 24 * 60 * 60 * 1000, // 24 hours
      directions: 1 * 60 * 60 * 1000, // 1 hour
      distance: 1 * 60 * 60 * 1000, // 1 hour
      nearby: 2 * 60 * 60 * 1000, // 2 hours
      serviceArea: 24 * 60 * 60 * 1000, // 24 hours
    },
  },

  // UI configuration
  ui: {
    markerIcons: {
      restaurant: '/images/map-markers/restaurant.png',
      userLocation: '/images/map-markers/user.png',
      destination: '/images/map-markers/destination.png',
    },
    colors: {
      primary: '#e53e3e',
      secondary: '#3182ce',
      success: '#38a169',
      warning: '#d69e2e',
      error: '#e53e3e',
    },
    mapStyles: {
      light: [],
      dark: [
        {
          elementType: 'geometry',
          stylers: [{ color: '#242f3e' }],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#242f3e' }],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [{ color: '#746855' }],
        },
      ],
    },
  },

  // Feature flags
  features: {
    enableDirections: true,
    enableNearbySearch: true,
    enableServiceArea: true,
    enableGeocoding: true,
    enableStreetView: false,
    enableTrafficLayer: true,
    enableTransitLayer: false,
    enableBicyclingLayer: false,
  },

  // Mobile configuration
  mobile: {
    defaultZoom: 14,
    gestureHandling: 'greedy',
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: false,
  },

  // Error handling
  errorHandling: {
    retryAttempts: 3,
    retryDelay: 1000,
    timeout: 10000,
  },
} as const;

// Environment-specific configuration
export const getMapsConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    ...MAPS_CONFIG,
    cache: {
      ...MAPS_CONFIG.cache,
      enabled: isProduction, // Disable cache in development for easier testing
    },
    features: {
      ...MAPS_CONFIG.features,
      enableStreetView: isDevelopment, // Enable street view in development
    },
  };
};