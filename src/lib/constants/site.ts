export const SITE_NAME = "Sultan Restaurant";
export const SITE_DESCRIPTION = "Authentic Syrian, Lebanese, Indian & Iraqi cuisine in the heart of the UK. Order online for pickup or book a table.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const CONTACT = {
  phone: "+44 141 391 8883",
  email: "info@sultanrestaurant.co.uk",
  address: "577 Gallowgate, Glasgow G40 2PE",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/share/1HDKRSvdoC/",
  instagram: "https://www.instagram.com/sultan.restaurants?igsh=MWw3b3YwZmFjcHh6Zg==",
  tiktok: "https://www.tiktok.com/@sultanrestaurant.glasgow?_r=1&_t=ZN-95F3iqpZPde",
} as const;

export const BOOKING = {
  minGuests: 1,
  maxGuests: 20,
  minAdvanceHours: 2,
  maxAdvanceDays: 30,
  defaultDuration: 90, // minutes
  timeSlotInterval: 30, // minutes
} as const;

export const ORDER = {
  minPickupMinutes: 30,
  maxPickupHours: 24,
  minOrderAmount: 10,
} as const;

// Aliases for backward compatibility
export const ORDER_CONFIG = ORDER;
export const SITE_CONFIG = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  contact: CONTACT,
  social: SOCIAL,
  booking: BOOKING,
  order: ORDER,
} as const;
