export const ADMIN_PERMISSIONS = [
  "manage:menu",
  "manage:categories",
  "manage:orders",
  "manage:bookings",
  "manage:offers",
  "manage:coupons",
  "manage:reviews",
  "manage:gallery",
  "manage:messages",
  "manage:customers",
  "manage:settings",
  "manage:seo",
  "manage:email",
  "view:dashboard",
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];
