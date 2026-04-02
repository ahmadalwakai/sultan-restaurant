import { describe, it, expect } from "vitest";
import { menuItems } from "../../fixtures";

describe("recommendationService", () => {
  describe("getRelatedItems", () => {
    it("should recommend items from same category", () => {
      const item = menuItems[0]; // cat-1
      const related = menuItems.filter(
        (i) => i.categoryId === item.categoryId && i.id !== item.id && i.isAvailable
      );
      expect(related.length).toBeGreaterThan(0);
      expect(related.every((i) => i.categoryId === item.categoryId)).toBe(true);
    });

    it("should exclude unavailable items", () => {
      const item = menuItems[0];
      const related = menuItems.filter(
        (i) => i.categoryId === item.categoryId && i.id !== item.id && i.isAvailable
      );
      expect(related.every((i) => i.isAvailable)).toBe(true);
    });
  });

  describe("getPopularItems", () => {
    it("should return popular items first", () => {
      const popular = menuItems
        .filter((i) => i.isPopular && i.isAvailable)
        .slice(0, 4);
      expect(popular.length).toBeGreaterThan(0);
      expect(popular.every((i) => i.isPopular)).toBe(true);
    });
  });
});
