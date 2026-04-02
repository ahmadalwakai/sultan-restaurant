import { describe, it, expect } from "vitest";
import { toOrderPublic, toOrderAdmin } from "@/lib/mappers";

describe("orderMapper", () => {
  const dbOrder = {
    id: "order-1",
    orderNumber: "ORD-20260101-ABC1",
    customerName: "John Doe",
    customerEmail: "john@test.com",
    customerPhone: "07700900001",
    type: "PICKUP",
    status: "COMPLETED",
    paymentMethod: "STRIPE",
    paymentStatus: "PAID",
    subtotal: { toNumber: () => 31.40 },
    discount: { toNumber: () => 0 },
    total: { toNumber: () => 31.40 },
    couponCode: null,
    pickupTime: new Date("2026-01-01T18:30:00Z"),
    specialRequests: null,
    stripeSessionId: "cs_test_123",
    stripePaymentId: "pi_test_123",
    userId: null,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    items: [
      {
        id: "oi-1",
        menuItemId: "menu-1",
        name: "Chicken Tikka Masala",
        price: { toNumber: () => 12.95 },
        quantity: 2,
        subtotal: { toNumber: () => 25.90 },
      },
    ],
  };

  describe("toOrderPublic", () => {
    it("should map DB order to public format", () => {
      const result = toOrderPublic(dbOrder as any);
      expect(result).toHaveProperty("orderNumber", "ORD-20260101-ABC1");
      expect(typeof result.total).toBe("number");
    });

    it("should convert Decimal fields to numbers", () => {
      const result = toOrderPublic(dbOrder as any);
      expect(result.subtotal).toBe(31.40);
      expect(result.total).toBe(31.40);
    });
  });

  describe("toOrderAdmin", () => {
    it("should include admin fields", () => {
      const result = toOrderAdmin(dbOrder as any);
      expect(result).toHaveProperty("createdAt");
      expect(result).toHaveProperty("stripeSessionId");
    });
  });
});
