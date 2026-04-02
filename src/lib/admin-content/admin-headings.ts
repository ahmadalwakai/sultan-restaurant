/** Centralised heading / title copy for admin pages */
export const adminHeadings = {
  dashboard: { title: "Dashboard", description: "Overview of your restaurant" },
  orders: { title: "Orders", description: "Manage customer orders" },
  menu: { title: "Menu Items", description: "Add, edit, and manage your menu" },
  categories: { title: "Categories", description: "Organise your menu categories" },
  bookings: { title: "Bookings", description: "Manage table reservations" },
  offers: { title: "Offers", description: "Create and manage promotions" },
  coupons: { title: "Coupons", description: "Manage discount codes" },
  reviews: { title: "Reviews", description: "Moderate customer reviews" },
  gallery: { title: "Gallery", description: "Manage restaurant photos" },
  messages: { title: "Messages", description: "View contact form submissions" },
  customers: { title: "Customers", description: "View and manage customers" },
  email: { title: "Email Log", description: "Track sent emails" },
  seo: { title: "SEO", description: "Search engine optimisation settings" },
  settings: { title: "Settings", description: "Configure your restaurant" },
  monitoring: { title: "Monitoring", description: "System health and performance" },
} as const;
