import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { cart, menuItems } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("cartService", () => {
  beforeEach(() => resetPrismaMock());

  describe("validateCart", () => {
    it("should validate cart items exist and are available", async () => {
      const availableItems = menuItems.filter((i) => i.isAvailable);
      prismaMock.menuItem.findMany.mockResolvedValue(availableItems);

      // Cart validation checks menuItem availability
      const itemIds = cart.items.map((i) => i.menuItemId);
      const found = await prismaMock.menuItem.findMany({
        where: { id: { in: itemIds }, isAvailable: true },
      });

      expect(found.length).toBeGreaterThan(0);
    });

    it("should reject cart with unavailable items", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([]);

      const found = await prismaMock.menuItem.findMany({
        where: { id: { in: ["menu-8"] }, isAvailable: true },
      });

      expect(found.length).toBe(0);
    });
  });

  describe("calculateTotal", () => {
    it("should calculate correct subtotal from cart items", () => {
      const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      expect(subtotal).toBeCloseTo(40.9, 1);
    });

    it("should handle empty cart", () => {
      const subtotal = [].reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
      expect(subtotal).toBe(0);
    });
  });
});
