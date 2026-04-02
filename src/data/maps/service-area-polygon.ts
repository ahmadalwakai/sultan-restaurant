// Service area polygon for Sultan Restaurant delivery
// This represents a 5km radius delivery area around the restaurant
// Coordinates are in [lat, lng] format

export const SERVICE_AREA_POLYGON = [
  // Starting from north-east, going clockwise
  { lat: 55.9092, lng: -4.2068 }, // North-east corner
  { lat: 55.8952, lng: -4.1818 }, // East
  { lat: 55.8642, lng: -4.1718 }, // South-east
  { lat: 55.8192, lng: -4.2018 }, // South
  { lat: 55.8292, lng: -4.2818 }, // South-west
  { lat: 55.8642, lng: -4.3318 }, // West
  { lat: 55.8952, lng: -4.3018 }, // North-west
  { lat: 55.9092, lng: -4.2068 }, // Back to north-east
] as const;

// Alternative simplified circular approximation
export const SERVICE_AREA_CIRCLE = {
  center: { lat: 55.8642, lng: -4.2518 },
  radius: 5000, // 5km in meters
} as const;

// Delivery zones with different pricing
export const DELIVERY_ZONES = [
  {
    id: 'zone-1',
    name: 'Central Glasgow',
    polygon: [
      { lat: 55.8792, lng: -4.2368 },
      { lat: 55.8692, lng: -4.2218 },
      { lat: 55.8542, lng: -4.2418 },
      { lat: 55.8642, lng: -4.2618 },
      { lat: 55.8792, lng: -4.2368 },
    ],
    deliveryFee: 0, // Free delivery in central area
    minimumOrder: 0,
    estimatedTime: { min: 20, max: 35 },
    active: true,
  },
  {
    id: 'zone-2',
    name: 'Greater Glasgow',
    polygon: SERVICE_AREA_POLYGON,
    deliveryFee: 2.99,
    minimumOrder: 15.00,
    estimatedTime: { min: 25, max: 45 },
    active: true,
  },
] as const;

// Postcodes that are excluded from delivery (too far or difficult access)
export const EXCLUDED_POSTCODES = [
  'G81', 'G82', 'G83', 'G84', // Clydebank area
  'PA1', 'PA2', 'PA3', // Paisley area
  'G71', 'G72', 'G73', 'G74', 'G75', // East Kilbride area
] as const;

// Postcodes with special delivery conditions
export const SPECIAL_DELIVERY_POSTCODES = {
  'G1': { fee: 0, note: 'Free delivery in city center' },
  'G2': { fee: 0, note: 'Free delivery in city center' },
  'G3': { fee: 1.99, note: 'Reduced fee for West End' },
  'G4': { fee: 1.99, note: 'Reduced fee for West End' },
} as const;