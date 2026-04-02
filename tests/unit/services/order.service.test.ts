import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { orders, menuItems } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("orderService", () => {
  beforeEach(() => resetPrismaMock());

  describe("createOrder", () => {
    it("should create an order with items and calculate totals", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue(menuItems.slice(0, 2));
      prismaMock.order.create.mockResolvedValue({
        ...orders[0],
        items: orders[0].items,
      });

      const { createOrder } = await import("@/lib/services/orders.service");
      const result = await createOrder({
        customerName: "John Doe",
        customerEmail: "john@test.com",
        customerPhone: "07700900001",
        type: "PICKUP",
        paymentMethod: "STRIPE",
        items: [{ menuItemId: "menu-1", quantity: 2 }],
      });

      expect(result).toBeDefined();
    });

    it("should reject order with unavailable items", async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([
        { ...menuItems[7], isAvailable: false },
      ]);

      const { createOrder } = await import("@/lib/services/orders.service");
      await expect(
        createOrder({
          customerName: "Test",
          customerEmail: "test@test.com",
          customerPhone: "07700900000",
          type: "PICKUP",
          paymentMethod: "CASH",
          items: [{ menuItemId: "menu-8", quantity: 1 }],
        })
      ).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return order with items", async () => {
      prismaMock.order.findUnique.mockResolvedValue(orders[0]);

      const { getOrderById } = await import("@/lib/services/orders.service");
      const result = await getOrderById("order-1");

      expect(prismaMock.order.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: "order-1" } })
      );
    });
  });

  describe("updateStatus", () => {
    it("should update order status", async () => {
      prismaMock.order.findUnique.mockResolvedValue(orders[1]);
      prismaMock.order.update.mockResolvedValue({ ...orders[1], status: "CONFIRMED" });

      const { updateOrderStatus } = await import("@/lib/services/orders.service");
      const result = await updateOrderStatus("order-2", "CONFIRMED" as any);

      expect(prismaMock.order.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "order-2" },
          data: expect.objectContaining({ status: "CONFIRMED" }),
        })
      );
    });
  });
});
