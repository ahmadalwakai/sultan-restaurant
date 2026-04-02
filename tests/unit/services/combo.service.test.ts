import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { combos } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("comboService", () => {
  beforeEach(() => resetPrismaMock());

  describe("getActiveCombos", () => {
    it("should return active combos with items", async () => {
      prismaMock.combo.findMany.mockResolvedValue(combos);

      const { comboService } = await import("@/lib/services");
      const result = await comboService.getActiveCombos();

      expect(prismaMock.combo.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: true }),
        })
      );
    });
  });

  describe("getById", () => {
    it("should return combo with items", async () => {
      prismaMock.combo.findUnique.mockResolvedValue(combos[0]);

      const { comboService } = await import("@/lib/services");
      const result = await comboService.getById("combo-1");

      expect(result).toBeDefined();
    });

    it("should throw if combo not found", async () => {
      prismaMock.combo.findUnique.mockResolvedValue(null);

      const { comboService } = await import("@/lib/services");
      await expect(comboService.getById("nonexistent")).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should create combo with items", async () => {
      prismaMock.combo.create.mockResolvedValue(combos[0]);

      const { comboService } = await import("@/lib/services");
      const result = await comboService.create({
        name: "Family Feast",
        price: 39.95,
        items: [{ menuItemId: "menu-1", quantity: 2 }],
      } as any);

      expect(prismaMock.combo.create).toHaveBeenCalled();
    });
  });
});
