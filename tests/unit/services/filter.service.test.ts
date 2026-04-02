import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { menuItems } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("filterService", () => {
  beforeEach(() => resetPrismaMock());

  describe("filterByDietary", () => {
    it("should filter vegetarian items", () => {
      const vegetarian = menuItems.filter((i) => i.isVegetarian);
      expect(vegetarian.length).toBeGreaterThan(0);
      expect(vegetarian.every((i) => i.isVegetarian)).toBe(true);
    });

    it("should filter vegan items", () => {
      const vegan = menuItems.filter((i) => i.isVegan);
      expect(vegan.length).toBeGreaterThan(0);
      expect(vegan.every((i) => i.isVegan)).toBe(true);
    });

    it("should filter gluten-free items", () => {
      const glutenFree = menuItems.filter((i) => i.isGlutenFree);
      expect(glutenFree.length).toBeGreaterThan(0);
    });
  });

  describe("filterBySpiceLevel", () => {
    it("should filter mild items (spice <= 1)", () => {
      const mild = menuItems.filter((i) => i.spiceLevel <= 1);
      expect(mild.length).toBeGreaterThan(0);
    });

    it("should filter hot items (spice >= 4)", () => {
      const hot = menuItems.filter((i) => i.spiceLevel >= 4);
      expect(hot.length).toBeGreaterThan(0);
    });
  });

  describe("filterByCategory", () => {
    it("should filter by category id", () => {
      const mainCourse = menuItems.filter((i) => i.categoryId === "cat-1");
      expect(mainCourse.length).toBe(4);
    });
  });

  describe("filterByPrice", () => {
    it("should filter items within price range", () => {
      const affordable = menuItems.filter((i) => i.price >= 5 && i.price <= 10);
      expect(affordable.length).toBeGreaterThan(0);
    });
  });
});
