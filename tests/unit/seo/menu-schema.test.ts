import { describe, it, expect } from "vitest";

describe("Menu Schema", () => {
  const generateMenuSchema = (
    categories: { name: string; items: { name: string; price: number; description: string }[] }[]
  ) => ({
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Sultan Restaurant Menu",
    hasMenuSection: categories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "GBP",
        },
      })),
    })),
  });

  it("should generate valid Menu schema", () => {
    const schema = generateMenuSchema([
      {
        name: "Starters",
        items: [{ name: "Samosa", price: 4.95, description: "Crispy pastry" }],
      },
    ]);
    expect(schema["@type"]).toBe("Menu");
    expect(schema.hasMenuSection).toHaveLength(1);
  });

  it("should include MenuSection for each category", () => {
    const schema = generateMenuSchema([
      { name: "Starters", items: [] },
      { name: "Mains", items: [] },
    ]);
    expect(schema.hasMenuSection).toHaveLength(2);
    expect(schema.hasMenuSection[0]["@type"]).toBe("MenuSection");
  });

  it("should include MenuItem with offers and price", () => {
    const schema = generateMenuSchema([
      {
        name: "Mains",
        items: [
          { name: "Biryani", price: 12.95, description: "Fragrant rice" },
        ],
      },
    ]);
    const item = schema.hasMenuSection[0].hasMenuItem[0];
    expect(item["@type"]).toBe("MenuItem");
    expect(item.offers.price).toBe(12.95);
    expect(item.offers.priceCurrency).toBe("GBP");
  });

  it("should handle empty categories", () => {
    const schema = generateMenuSchema([]);
    expect(schema.hasMenuSection).toHaveLength(0);
  });
});
