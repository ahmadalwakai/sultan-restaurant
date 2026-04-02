import { describe, it, expect } from "vitest";
import { toComboPublic, toComboAdmin } from "@/lib/mappers";

describe("comboMapper", () => {
  const dbCombo = {
    id: "combo-1",
    name: "Family Feast",
    slug: "family-feast",
    description: "Perfect meal for 4",
    image: "/images/combos/family-feast.jpg",
    price: { toNumber: () => 39.95 },
    originalPrice: { toNumber: () => 52.30 },
    savings: { toNumber: () => 12.35 },
    servesCount: 4,
    isAvailable: true,
    isActive: true,
    sortOrder: 1,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    items: [
      {
        id: "ci-1",
        menuItemId: "menu-1",
        quantity: 2,
        menuItem: {
          id: "menu-1",
          name: "Chicken Tikka Masala",
          price: { toNumber: () => 12.95 },
          image: "/images/menu/chicken-tikka.jpg",
        },
      },
    ],
  };

  describe("toComboPublic", () => {
    it("should map combo to public format", () => {
      const result = toComboPublic(dbCombo as any);
      expect(result).toHaveProperty("name", "Family Feast");
      expect(typeof result.price).toBe("number");
      expect(result.price).toBe(39.95);
    });

    it("should include savings calculation", () => {
      const result = toComboPublic(dbCombo as any);
      expect(result.savings).toBe(12.35);
    });

    it("should include items with menu item details", () => {
      const result = toComboPublic(dbCombo as any);
      expect(result.items).toHaveLength(1);
    });
  });

  describe("toComboAdmin", () => {
    it("should include timestamps", () => {
      const result = toComboAdmin(dbCombo as any);
      expect(result).toHaveProperty("createdAt");
    });
  });
});
