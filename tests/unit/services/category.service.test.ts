import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { categories } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("categoryService", () => {
  beforeEach(() => resetPrismaMock());

  describe("getPublicCategories", () => {
    it("should return only active categories sorted by sortOrder", async () => {
      const active = categories.filter((c) => c.isActive);
      prismaMock.category.findMany.mockResolvedValue(active);

      const { categoryService } = await import("@/lib/services");
      const result = await categoryService.getPublicCategories();

      expect(prismaMock.category.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: true }),
          orderBy: expect.objectContaining({ sortOrder: "asc" }),
        })
      );
    });
  });

  describe("getBySlug", () => {
    it("should return category by slug", async () => {
      prismaMock.category.findUnique.mockResolvedValue(categories[0]);

      const { categoryService } = await import("@/lib/services");
      const result = await categoryService.getBySlug("main-course");

      expect(prismaMock.category.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { slug: "main-course" } })
      );
    });

    it("should throw if category not found", async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      const { categoryService } = await import("@/lib/services");
      await expect(categoryService.getBySlug("nonexistent")).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should create a new category", async () => {
      const newCat = { name: "Desserts", slug: "desserts", description: "Sweet treats", sortOrder: 6 };
      prismaMock.category.create.mockResolvedValue({ id: "cat-new", ...newCat, isActive: true });

      const { categoryService } = await import("@/lib/services");
      const result = await categoryService.create(newCat as any);

      expect(prismaMock.category.create).toHaveBeenCalled();
    });
  });
});
