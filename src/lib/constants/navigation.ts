export const PUBLIC_NAV = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "Book a Table", href: "/book" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = {
  quickLinks: [
    { label: "Menu", href: "/menu" },
    { label: "Offers", href: "/offers" },
    { label: "Book a Table", href: "/book" },
    { label: "Order Pickup", href: "/pickup" },
    { label: "Delivery", href: "/delivery" },
  ],
  info: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/menu" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Allergen Info", href: "/allergens" },
  ],
} as const;

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Orders", href: "/admin/orders", icon: "orders" },
  { label: "Menu", href: "/admin/menu", icon: "menu" },
  { label: "Categories", href: "/admin/categories", icon: "categories" },
  { label: "Tables", href: "/admin/tables", icon: "tables" },
  { label: "Bookings", href: "/admin/bookings", icon: "bookings" },
  { label: "Weddings", href: "/admin/weddings", icon: "wedding" },
  { label: "Shisha", href: "/admin/shisha", icon: "shisha" },
  { label: "Offers", href: "/admin/offers", icon: "offers" },
  { label: "Coupons", href: "/admin/coupons", icon: "coupons" },
  { label: "Reviews", href: "/admin/reviews", icon: "reviews" },
  { label: "Gallery", href: "/admin/gallery", icon: "gallery" },
  { label: "Messages", href: "/admin/messages", icon: "messages" },
  { label: "Customers", href: "/admin/customers", icon: "customers" },
  { label: "Email", href: "/admin/email", icon: "email" },
  { label: "SEO", href: "/admin/seo", icon: "seo" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
] as const;
