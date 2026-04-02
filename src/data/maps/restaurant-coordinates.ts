// Sultan Restaurant coordinates in Glasgow (577 Gallowgate)
export const RESTAURANT_COORDINATES = {
  lat: 55.8530,
  lng: -4.2180,
} as const;

// Restaurant address details
export const RESTAURANT_ADDRESS = {
  street: '577 Gallowgate',
  city: 'Glasgow',
  postcode: 'G40 2PE',
  country: 'United Kingdom',
  formatted: '577 Gallowgate, Glasgow G40 2PE, United Kingdom',
} as const;

// Restaurant location information
export const RESTAURANT_LOCATION = {
  id: 'sultan-restaurant-glasgow',
  name: 'Sultan Restaurant',
  coordinates: RESTAURANT_COORDINATES,
  address: RESTAURANT_ADDRESS,
  contact: {
    phone: '+44 141 391 8883',
    email: 'info@sultanrestaurant.co.uk',
  },
  businessHours: {
    monday: { open: '17:00', close: '23:00', closed: false },
    tuesday: { open: '17:00', close: '23:00', closed: false },
    wednesday: { open: '17:00', close: '23:00', closed: false },
    thursday: { open: '17:00', close: '23:00', closed: false },
    friday: { open: '17:00', close: '23:30', closed: false },
    saturday: { open: '17:00', close: '23:30', closed: false },
    sunday: { open: '17:00', close: '22:30', closed: false },
  },
} as const;