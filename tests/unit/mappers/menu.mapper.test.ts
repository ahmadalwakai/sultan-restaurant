import { describe, it, expect } from "vitest";
import { toMenuItemPublic, toMenuItemAdmin } from "@/lib/mappers";

describe("menuMapper", () => {
  const dbMenuItem = {
    id: "menu-1",
    name: "Chicken Tikka Masala",
    slug: "chicken-tikka-masala",
    description: "Tender chicken in rich creamy tomato sauce",
    price: { toNumber: () => 12.95 },
    image: "/images/menu/chicken-tikka.jpg",
    categoryId: "cat-1",
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSpicy: true,
    spiceLevel: 2,
    allergens: ["dairy", "nuts"],
    sortOrder: 1,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    category: { id: "cat-1", name: "Main Course", slug: "main-course" },
  };

  describe("toMenuItemPublic", () => {
    it("should map DB item to public format", () => {
      const result = toMenuItemPublic(dbMenuItem as any);
      expect(result).toHaveProperty("id", "menu-1");
      expect(result).toHaveProperty("name", "Chicken Tikka Masala");
      expect(typeof result.price).toBe("number");
    });

    it("should convert Decimal price to number", () => {
      const result = toMenuItemPublic(dbMenuItem as any);
      expect(result.price).toBe(12.95);
    });

    it("should exclude admin-only fields", () => {
      const result = toMenuItemPublic(dbMenuItem as any);
      expect(result).not.toHaveProperty("createdAt");
    });
  });

  describe("toMenuItemAdmin", () => {
    it("should include timestamps for admin", () => {
      const result = toMenuItemAdmin(dbMenuItem as any);
      expect(result).toHaveProperty("createdAt");
      expect(result).toHaveProperty("updatedAt");
    });
  });
});
