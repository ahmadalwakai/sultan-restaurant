export const adminQueryKeys = {
  dashboard: ["admin", "dashboard"] as const,
  menu: {
    all: ["admin", "menu"] as const,
    detail: (id: string) => ["admin", "menu", id] as const,
  },
  categories: {
    all: ["admin", "categories"] as const,
    detail: (id: string) => ["admin", "categories", id] as const,
  },
  orders: {
    all: ["admin", "orders"] as const,
    detail: (id: string) => ["admin", "orders", id] as const,
  },
  bookings: {
    all: ["admin", "bookings"] as const,
    detail: (id: string) => ["admin", "bookings", id] as const,
  },
  offers: {
    all: ["admin", "offers"] as const,
    detail: (id: string) => ["admin", "offers", id] as const,
  },
  coupons: {
    all: ["admin", "coupons"] as const,
    detail: (id: string) => ["admin", "coupons", id] as const,
  },
  reviews: {
    all: ["admin", "reviews"] as const,
  },
  messages: {
    all: ["admin", "messages"] as const,
  },
  customers: {
    all: ["admin", "customers"] as const,
  },
  gallery: {
    all: ["admin", "gallery"] as const,
  },
  settings: {
    all: ["admin", "settings"] as const,
  },
  seo: {
    all: ["admin", "seo"] as const,
  },
} as const;
