// Utility functions for maps operations

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}

// Convert degrees to radians
export const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Convert radians to degrees
export const toDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

// Calculate distance between two points using Haversine formula
export const calculateHaversineDistance = (
  point1: LatLng,
  point2: LatLng,
  unit: 'km' | 'miles' = 'km'
): number => {
  const R = unit === 'km' ? 6371 : 3959; // Earth's radius
  const dLat = toRadians(point2.lat - point1.lat);
  const dLon = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Calculate bearing between two points
export const calculateBearing = (point1: LatLng, point2: LatLng): number => {
  const dLon = toRadians(point2.lng - point1.lng);
  const lat1 = toRadians(point1.lat);
  const lat2 = toRadians(point2.lat);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360; // Normalize to 0-360
};

// Check if a point is within bounds
export const isPointInBounds = (point: LatLng, bounds: Bounds): boolean => {
  return (
    point.lat >= bounds.southwest.lat &&
    point.lat <= bounds.northeast.lat &&
    point.lng >= bounds.southwest.lng &&
    point.lng <= bounds.northeast.lng
  );
};

// Calculate center of bounds
export const getBoundsCenter = (bounds: Bounds): LatLng => {
  return {
    lat: (bounds.northeast.lat + bounds.southwest.lat) / 2,
    lng: (bounds.northeast.lng + bounds.southwest.lng) / 2,
  };
};

// Extend bounds to include a point
export const extendBounds = (bounds: Bounds, point: LatLng): Bounds => {
  return {
    northeast: {
      lat: Math.max(bounds.northeast.lat, point.lat),
      lng: Math.max(bounds.northeast.lng, point.lng),
    },
    southwest: {
      lat: Math.min(bounds.southwest.lat, point.lat),
      lng: Math.min(bounds.southwest.lng, point.lng),
    },
  };
};

// Create bounds from array of points
export const createBoundsFromPoints = (points: LatLng[]): Bounds | null => {
  if (points.length === 0) return null;

  let northeast = { ...points[0] };
  let southwest = { ...points[0] };

  for (const point of points) {
    northeast.lat = Math.max(northeast.lat, point.lat);
    northeast.lng = Math.max(northeast.lng, point.lng);
    southwest.lat = Math.min(southwest.lat, point.lat);
    southwest.lng = Math.min(southwest.lng, point.lng);
  }

  return { northeast, southwest };
};

// Point in polygon algorithm (Ray casting)
export const isPointInPolygon = (point: LatLng, polygon: LatLng[]): boolean => {
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
};

// Calculate area of polygon using shoelace formula
export const calculatePolygonArea = (polygon: LatLng[]): number => {
  if (polygon.length < 3) return 0;

  let area = 0;
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    area += polygon[i].lng * polygon[j].lat;
    area -= polygon[j].lng * polygon[i].lat;
  }

  area = Math.abs(area) / 2;

  // Convert to square kilometers (approximate)
  const EARTH_RADIUS = 6371; // km
  return area * Math.pow(EARTH_RADIUS * Math.PI / 180, 2);
};

// Format distance for display
export const formatDistance = (distance: number, unit: 'km' | 'miles' = 'km'): string => {
  if (unit === 'miles') {
    const miles = distance * 0.621371;
    return miles < 0.1 ? `${Math.round(miles * 5280)} ft` : `${miles.toFixed(1)} mi`;
  }

  return distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`;
};

// Format duration for display
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

// Get cardinal direction from bearing
export const getCardinalDirection = (bearing: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(bearing / 22.5) % 16;
  return directions[index];
};

// Validate latitude/longitude values
export const isValidLatLng = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

// Normalize longitude to -180 to 180 range
export const normalizeLng = (lng: number): number => {
  while (lng > 180) lng -= 360;
  while (lng < -180) lng += 360;
  return lng;
};

// Generate Google Maps static map URL
export const generateStaticMapUrl = (
  center: LatLng,
  zoom: number = 15,
  size: { width: number; height: number } = { width: 400, height: 300 },
  markers: Array<{ position: LatLng; color?: string; label?: string }> = [],
  apiKey?: string
): string => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
  const params = new URLSearchParams();

  params.append('center', `${center.lat},${center.lng}`);
  params.append('zoom', zoom.toString());
  params.append('size', `${size.width}x${size.height}`);
  params.append('scale', '2'); // High resolution

  markers.forEach((marker, index) => {
    const markerParam = `${marker.color || 'red'}${marker.label || ''}|${marker.position.lat},${marker.position.lng}`;
    params.append('markers', markerParam);
  });

  if (apiKey) {
    params.append('key', apiKey);
  }

  return `${baseUrl}?${params.toString()}`;
};

// Generate Google Maps embed URL
export const generateEmbedUrl = (
  center: LatLng,
  zoom: number = 15,
  apiKey?: string
): string => {
  const baseUrl = 'https://www.google.com/maps/embed/v1/view';
  const params = new URLSearchParams();

  params.append('key', apiKey || '');
  params.append('center', `${center.lat},${center.lng}`);
  params.append('zoom', zoom.toString());

  return `${baseUrl}?${params.toString()}`;
};

// Generate Google Maps directions URL
export const generateDirectionsUrl = (
  origin: LatLng | string,
  destination: LatLng | string,
  travelMode: 'driving' | 'walking' | 'transit' | 'bicycling' = 'driving'
): string => {
  const baseUrl = 'https://www.google.com/maps/dir/';

  const formatLocation = (location: LatLng | string): string => {
    if (typeof location === 'string') return encodeURIComponent(location);
    return `${location.lat},${location.lng}`;
  };

  const originParam = formatLocation(origin);
  const destinationParam = formatLocation(destination);

  return `${baseUrl}${originParam}/${destinationParam}/@${travelMode}`;
};

// Parse Google Maps URL to extract coordinates
export const parseGoogleMapsUrl = (url: string): LatLng | null => {
  // Match patterns like @55.8642,-4.2518 or /@55.8642,-4.2518
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }
  return null;
};