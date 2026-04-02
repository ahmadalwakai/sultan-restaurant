/** Hero section content — single source of truth for all hero text */

export const heroContent = {
  cuisineBadge: "Syrian · Lebanese · Indian · Iraqi",
  headline: {
    line1: "A Taste of the",
    accent: "Middle East",
    line3: "in Glasgow",
  },
  subheadline:
    "Authentic flavours from Syria, Lebanon, India & Iraq. Family recipes passed down through generations.",
  cta: {
    primary: { label: "Order Pickup", href: "/pickup" },
    secondary: { label: "Book a Table", href: "/book" },
  },
  rating: {
    score: "4.8",
    stars: 5,
    text: "500+ Reviews on Google",
  },
  backgroundImage:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80",
  backgroundAlt: "Beautifully plated Middle Eastern cuisine",
} as const;
