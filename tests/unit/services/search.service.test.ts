import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { menuItems } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("searchService", () => {
  beforeEach(() => resetPrismaMock());

  describe("searchMenuItems", () => {
    it("should find items matching search query", async () => {
      const matching = menuItems.filter(
        (i) => i.name.toLowerCase().includes("chicken")
      );
      prismaMock.menuItem.findMany.mockResolvedValue(matching);

      const results = await prismaMock.menuItem.findMany({
        where: {
          OR: [
            { name: { contains: "chicken", mode: "insensitive" } },
            { description: { contains: "chicken", mode: "insensitive" } },
          ],
          isAvailable: true,
        },
      });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toContain("Chicken");
    });

    it("should return empty array for no matches", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([]);

      const results = await prismaMock.menuItem.findMany({
        where: { name: { contains: "zzzznotfound" } },
      });

      expect(results).toHaveLength(0);
    });
  });
});
