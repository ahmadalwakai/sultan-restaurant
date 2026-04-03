import { CONTACT, SITE_URL, SITE_NAME, SOCIAL } from "@/lib/constants/site";
import { JsonLd, StructuredData } from "./JsonLd";

function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "577 Gallowgate",
      addressLocality: "Glasgow",
      addressRegion: "Glasgow City",
      postalCode: "G40 2PE",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 55.8555,
      longitude: -4.2177,
    },
    image: `${SITE_URL}/images/hero/hero-main.jpg`,
    servesCuisine: ["Middle Eastern", "Syrian", "Lebanese", "Iraqi", "Indian"],
    priceRange: "££",
    acceptsReservations: true,
    menu: `${SITE_URL}/menu`,
    hasMenu: {
      "@type": "Menu",
      url: `${SITE_URL}/menu`,
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.twitter],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "12:00", closes: "22:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "12:00", closes: "23:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "12:00", closes: "23:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "13:00", closes: "22:00" },
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/book` },
        result: { "@type": "Reservation", name: "Book a Table" },
      },
      {
        "@type": "OrderAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/pickup` },
      },
    ],
  };
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "577 Gallowgate",
      addressLocality: "Glasgow",
      addressRegion: "Glasgow City",
      postalCode: "G40 2PE",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 55.8555,
      longitude: -4.2177,
    },
    areaServed: { "@type": "City", name: "Glasgow" },
  };
}

export function RestaurantStructuredData() {
  return (
    <StructuredData schemas={[restaurantSchema(), localBusinessSchema()]} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
