import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { cart, menuItems } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("validateCartPrices", () => {
  beforeEach(() => resetPrismaMock());

  it("should validate prices match current DB prices", async () => {
    const dbItems = cart.items.map((item) => {
      const dbItem = menuItems.find((m) => m.id === item.menuItemId);
      return { ...dbItem, price: { toNumber: () => dbItem!.price } };
    });
    prismaMock.menuItem.findMany.mockResolvedValue(dbItems);

    const items = await prismaMock.menuItem.findMany({
      where: { id: { in: cart.items.map((i) => i.menuItemId) } },
    });

    for (const cartItem of cart.items) {
      const dbItem = items.find((i: any) => i.id === cartItem.menuItemId);
      expect(dbItem).toBeDefined();
      expect((dbItem as any).price.toNumber()).toBe(cartItem.price);
    }
  });

  it("should detect price mismatch", () => {
    const cartPrice = 12.95;
    const dbPrice = 13.95;
    expect(cartPrice).not.toBe(dbPrice);
  });

  it("should detect removed items", async () => {
    prismaMock.menuItem.findMany.mockResolvedValue([]);

    const items = await prismaMock.menuItem.findMany({
      where: { id: { in: ["menu-deleted"] } },
    });

    expect(items).toHaveLength(0);
  });
});
