/**
 * Structured data schema components for SEO
 * Generates JSON-LD markup for search engines
 */

interface RestaurantSchemaProps {
  name?: string;
  description?: string;
  image?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  telephone?: string;
  email?: string;
  priceRange?: string;
  servesCuisine?: string[];
  openingHours?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Restaurant schema for local business SEO
 */
export function RestaurantSchema({
  name = "Sultan Restaurant",
  description = "Authentic Middle Eastern & Indian cuisine with charcoal grills, kebabs, biryanis, and traditional desserts. Family recipes from Damascus, Baghdad, and Punjab.",
  image = "https://sultanrestaurant.co.uk/images/og-image.jpg",
  address = {
    street: "123 High Street",
    city: "London",
    postalCode: "E1 1AA",
    country: "United Kingdom",
  },
  telephone = "+44 20 1234 5678",
  email = "info@sultanrestaurant.co.uk",
  priceRange = "££",
  servesCuisine = ["Middle Eastern", "Indian", "Turkish", "Lebanese", "Syrian"],
  openingHours = [
    "Mo-Su 12:00-21:00",
  ],
  aggregateRating = {
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5,
  },
  geo = {
    latitude: 51.5074,
    longitude: -0.1278,
  },
}: RestaurantSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name,
    description,
    image,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    telephone,
    email,
    priceRange,
    servesCuisine,
    openingHoursSpecification: openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.split(" ")[0],
      opens: hours.split(" ")[1]?.split("-")[0],
      closes: hours.split(" ")[1]?.split("-")[1],
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating || 5,
      worstRating: 1,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    url: "https://sultanrestaurant.co.uk",
    menu: "https://sultanrestaurant.co.uk/menu",
    acceptsReservations: "True",
    hasMap: `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface MenuItemSchemaProps {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  category?: string;
  dietaryRestriction?: string[];
}

/**
 * Menu item schema for rich snippets
 */
export function MenuItemSchema({
  name,
  description,
  price,
  currency = "GBP",
  image,
  category,
  dietaryRestriction,
}: MenuItemSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name,
    description,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
    },
    ...(image && { image }),
    ...(category && { menuAddOn: { "@type": "MenuItem", name: category } }),
    ...(dietaryRestriction && {
      suitableForDiet: dietaryRestriction.map((diet) => `https://schema.org/${diet}`),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ReviewSchemaProps {
  itemReviewed: {
    name: string;
    type?: string;
  };
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
  };
}

/**
 * Individual review schema
 */
export function ReviewSchema({
  itemReviewed,
  author,
  datePublished,
  reviewBody,
  reviewRating,
}: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": itemReviewed.type || "Restaurant",
      name: itemReviewed.name,
    },
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviewRating.ratingValue,
      bestRating: reviewRating.bestRating || 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ schema for structured Q&A
 */
export function FAQSchema({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumb schema for navigation
 */
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Local business schema with additional details
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sultanrestaurant.co.uk",
    name: "Sultan Restaurant",
    image: "https://sultanrestaurant.co.uk/images/og-image.jpg",
    priceRange: "££",
    telephone: "+44 20 1234 5678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 High Street",
      addressLocality: "London",
      postalCode: "E1 1AA",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "247",
    },
    paymentAccepted: "Cash, Credit Card, Apple Pay, Google Pay",
    currenciesAccepted: "GBP",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wheelchair Accessible", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor Seating", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
