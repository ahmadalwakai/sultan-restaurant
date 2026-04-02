export const EMAIL_CONFIG = {
  from: "Sultan Restaurant <noreply@sultanrestaurant.co.uk>",
  replyTo: "info@sultanrestaurant.co.uk",
  adminEmail: "admin@sultanrestaurant.co.uk",
  restaurantName: "Sultan Restaurant",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://sultanrestaurant.co.uk",
} as const;
