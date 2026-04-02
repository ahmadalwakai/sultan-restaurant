import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { menuItems, categories } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("menuService", () => {
  beforeEach(() => {
    resetPrismaMock();
  });

  describe("getMenuItems", () => {
    it("should return paginated menu items", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue(menuItems.slice(0, 5));
      prismaMock.menuItem.count.mockResolvedValue(10);

      const { menuService } = await import("@/lib/services/menu.service");
      const result = await menuService.getMenuItems({ page: 1, limit: 5 });

      expect(prismaMock.menuItem.findMany).toHaveBeenCalled();
      expect(result).toHaveProperty("items");
      expect(result).toHaveProperty("total");
    });

    it("should filter by categoryId", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([menuItems[0]]);
      prismaMock.menuItem.count.mockResolvedValue(1);

      const { menuService } = await import("@/lib/services/menu.service");
      await menuService.getMenuItems({ page: 1, limit: 10, categoryId: "cat-1" });

      expect(prismaMock.menuItem.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ categoryId: "cat-1" }),
        })
      );
    });

    it("should filter by search query", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([menuItems[0]]);
      prismaMock.menuItem.count.mockResolvedValue(1);

      const { menuService } = await import("@/lib/services/menu.service");
      await menuService.getMenuItems({ page: 1, limit: 10, search: "chicken" });

      expect(prismaMock.menuItem.findMany).toHaveBeenCalled();
    });
  });

  describe("getPopular", () => {
    it("should return popular items with default limit", async () => {
      const popular = menuItems.filter((i) => i.isPopular);
      prismaMock.menuItem.findMany.mockResolvedValue(popular);

      const { menuService } = await import("@/lib/services/menu.service");
      const result = await menuService.getPopular();

      expect(prismaMock.menuItem.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isPopular: true }),
        })
      );
    });

    it("should respect custom limit", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([menuItems[0]]);

      const { menuService } = await import("@/lib/services/menu.service");
      await menuService.getPopular(3);

      expect(prismaMock.menuItem.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 3 })
      );
    });
  });

  describe("getById", () => {
    it("should return item by id", async () => {
      prismaMock.menuItem.findUnique.mockResolvedValue(menuItems[0]);

      const { menuService } = await import("@/lib/services/menu.service");
      const result = await menuService.getById("menu-1");

      expect(prismaMock.menuItem.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: "menu-1" } })
      );
    });

    it("should throw NotFoundError if item missing", async () => {
      prismaMock.menuItem.findUnique.mockResolvedValue(null);

      const { menuService } = await import("@/lib/services/menu.service");
      await expect(menuService.getById("nonexistent")).rejects.toThrow();
    });
  });

  describe("getByCategory", () => {
    it("should return items for a category slug", async () => {
      prismaMock.category.findUnique.mockResolvedValue(categories[0]);
      prismaMock.menuItem.findMany.mockResolvedValue([menuItems[0], menuItems[1]]);

      const { menuService } = await import("@/lib/services/menu.service");
      const result = await menuService.getByCategory("main-course");

      expect(result).toBeDefined();
    });
  });
});
