// Transport options and data for Sultan Restaurant

export const TRANSPORT_MODES = {
  driving: {
    name: 'Driving',
    icon: 'car',
    description: 'Fastest option with parking available nearby',
    averageSpeed: 30, // km/h in city
    co2PerKm: 0.12, // kg CO2 per km
  },
  walking: {
    name: 'Walking',
    icon: 'walk',
    description: 'Healthy option for nearby locations',
    averageSpeed: 5, // km/h
    co2PerKm: 0,
  },
  transit: {
    name: 'Public Transport',
    icon: 'bus',
    description: 'Bus and subway options available',
    averageSpeed: 20, // km/h average
    co2PerKm: 0.04, // kg CO2 per km
  },
  bicycling: {
    name: 'Cycling',
    icon: 'bike',
    description: 'Eco-friendly option with bike lanes',
    averageSpeed: 15, // km/h
    co2PerKm: 0,
  },
} as const;

export const GLASGOW_TRANSPORT_INFO = {
  nearestStations: {
    subway: [
      {
        name: 'Buchanan Street',
        distance: 0.2, // km
        lines: ['Glasgow Subway'],
        coordinates: { lat: 55.8640, lng: -4.2520 },
      },
      {
        name: 'St Enoch',
        distance: 0.8,
        lines: ['Glasgow Subway'],
        coordinates: { lat: 55.8580, lng: -4.2510 },
      },
    ],
    train: [
      {
        name: 'Glasgow Central',
        distance: 1.2,
        lines: ['West Coast Main Line', 'Glasgow South Western Line'],
        coordinates: { lat: 55.8580, lng: -4.2580 },
      },
      {
        name: 'Glasgow Queen Street',
        distance: 1.5,
        lines: ['Highland Main Line', 'Edinburgh-Glasgow Line'],
        coordinates: { lat: 55.8620, lng: -4.2510 },
      },
    ],
    bus: [
      {
        name: 'Buchanan Bus Station',
        distance: 0.3,
        lines: ['Multiple routes'],
        coordinates: { lat: 55.8650, lng: -4.2520 },
      },
    ],
  },
  parking: {
    nearest: [
      {
        name: 'Q-Park Buchanan Galleries',
        type: 'Multi-storey',
        distance: 0.1,
        capacity: 800,
        costPerHour: 2.50,
        coordinates: { lat: 55.8645, lng: -4.2525 },
      },
      {
        name: 'NCP Royal Exchange Square',
        type: 'Underground',
        distance: 0.4,
        capacity: 500,
        costPerHour: 2.00,
        coordinates: { lat: 55.8590, lng: -4.2480 },
      },
    ],
    streetParking: {
      available: true,
      restrictions: 'Pay and display 8am-6pm, Mon-Sat',
      costPerHour: 1.50,
    },
  },
  cycling: {
    bikeLanes: true,
    nearestDockingStations: [
      {
        name: 'Buchanan Street',
        distance: 0.1,
        capacity: 20,
        coordinates: { lat: 55.8642, lng: -4.2520 },
      },
    ],
    bikeParking: {
      available: true,
      type: 'Sheffield stands',
      cost: 'Free',
    },
  },
} as const;

export const TRAVEL_TIME_ESTIMATES = {
  walking: {
    baseTime: 10, // minutes
    perKm: 12, // minutes per km
  },
  driving: {
    baseTime: 5, // minutes
    perKm: 2, // minutes per km
    trafficMultiplier: 1.5, // peak hours
  },
  transit: {
    baseTime: 15, // minutes
    perKm: 4, // minutes per km
    transferTime: 5, // minutes per transfer
  },
  bicycling: {
    baseTime: 8, // minutes
    perKm: 4, // minutes per km
  },
} as const;

export const ACCESSIBILITY_INFO = {
  wheelchairAccessible: true,
  stepFreeAccess: true,
  accessibleParking: true,
  accessibleToilets: true,
  hearingLoop: true,
  visualAids: false,
  guideDogs: true,
  notes: 'Full wheelchair access with accessible entrance and seating areas',
} as const;