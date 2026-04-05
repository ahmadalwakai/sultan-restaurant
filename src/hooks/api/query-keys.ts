export const queryKeys = {
  menu: {
    all: ["menu"] as const,
    list: (params?: Record<string, unknown>) => ["menu", "list", params] as const,
    detail: (id: string) => ["menu", "detail", id] as const,
    popular: ["menu", "popular"] as const,
    byCategory: (slug: string) => ["menu", "category", slug] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  offers: {
    all: ["offers"] as const,
    active: ["offers", "active"] as const,
  },
  bookings: {
    all: ["bookings"] as const,
    availability: (date: string) => ["bookings", "availability", date] as const,
    user: ["bookings", "user"] as const,
  },
  orders: {
    all: ["orders"] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
    user: ["orders", "user"] as const,
    track: (id: string) => ["orders", "track", id] as const,
  },
  reviews: {
    all: ["reviews"] as const,
  },
  siteSettings: {
    all: ["site-settings"] as const,
    openingHours: ["opening-hours"] as const,
  },
  orderAvailability: ["order-availability"] as const,
} as const;
