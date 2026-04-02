import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { menuItems } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("dishOfDayService", () => {
  beforeEach(() => resetPrismaMock());

  const todaysDish = {
    id: "dod-1",
    menuItemId: "menu-1",
    discountPrice: 9.95,
    reason: "Chef's favourite today",
    date: new Date().toISOString().split("T")[0],
    isActive: true,
    menuItem: menuItems[0],
  };

  describe("getToday", () => {
    it("should return today's dish of the day", async () => {
      prismaMock.dishOfDay.findFirst.mockResolvedValue(todaysDish);

      const { dishOfDayService } = await import("@/lib/services");
      const result = await dishOfDayService.getToday();

      expect(result).toBeDefined();
    });

    it("should return null if no dish set for today", async () => {
      prismaMock.dishOfDay.findFirst.mockResolvedValue(null);

      const { dishOfDayService } = await import("@/lib/services");
      const result = await dishOfDayService.getToday();

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a dish of the day entry", async () => {
      prismaMock.dishOfDay.create.mockResolvedValue(todaysDish);

      const { dishOfDayService } = await import("@/lib/services");
      const result = await dishOfDayService.create({
        menuItemId: "menu-1",
        discountPrice: 9.95,
        reason: "Chef's favourite",
        date: new Date().toISOString().split("T")[0],
      } as any);

      expect(prismaMock.dishOfDay.create).toHaveBeenCalled();
    });
  });

  describe("getRecent", () => {
    it("should return recent dishes", async () => {
      prismaMock.dishOfDay.findMany.mockResolvedValue([todaysDish]);

      const { dishOfDayService } = await import("@/lib/services");
      const result = await dishOfDayService.getRecent();

      expect(prismaMock.dishOfDay.findMany).toHaveBeenCalled();
    });
  });
});
