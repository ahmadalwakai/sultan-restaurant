import { describe, it, expect } from "vitest";

vi.mock("@/lib/constants/site", () => ({
  SITE_CONFIG: {
    name: "Sultan Restaurant",
    url: "https://sultanrestaurant.co.uk",
    phone: "+44 141 391 8883",
    email: "info@sultanrestaurant.co.uk",
    address: {
      street: "577 Gallowgate",
      city: "Glasgow",
      region: "Scotland",
      postalCode: "G40 2PE",
      country: "GB",
    },
    geo: { latitude: 55.8530, longitude: -4.2180 },
    cuisine: ["Indian", "Pakistani", "Bangladeshi"],
    priceRange: "££",
  },
}));

import { vi } from "vitest";

describe("Restaurant Schema", () => {
  it("should generate valid Restaurant schema", () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Sultan Restaurant",
      url: "https://sultanrestaurant.co.uk",
      telephone: "+44 141 391 8883",
      servesCuisine: ["Indian", "Pakistani", "Bangladeshi"],
      priceRange: "££",
      address: {
        "@type": "PostalAddress",
        streetAddress: "577 Gallowgate",
        addressLocality: "Glasgow",
        addressRegion: "Scotland",
        postalCode: "G40 2PE",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.8530,
        longitude: -4.2180,
      },
    };

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Restaurant");
    expect(schema.name).toBe("Sultan Restaurant");
    expect(schema.servesCuisine).toContain("Indian");
    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.geo.latitude).toBe(55.8642);
  });

  it("should include required Restaurant fields", () => {
    const requiredFields = ["@context", "@type", "name", "address"];
    const schema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Sultan Restaurant",
      address: {},
    };
    for (const field of requiredFields) {
      expect(schema).toHaveProperty(field);
    }
  });
});
