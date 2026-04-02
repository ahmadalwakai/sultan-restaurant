import { describe, it, expect } from "vitest";
import { orderSchema } from "@/lib/validations";

describe("orderSchema", () => {
  const validOrder = {
    customerName: "John Doe",
    customerEmail: "john@test.com",
    customerPhone: "07700900001",
    type: "PICKUP",
    paymentMethod: "STRIPE",
    items: [{ menuItemId: "menu-1", quantity: 2 }],
  };

  it("should pass with valid data", () => {
    const result = orderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it("should reject invalid order type", () => {
    const result = orderSchema.safeParse({ ...validOrder, type: "INVALID" });
    expect(result.success).toBe(false);
  });

  it("should reject invalid payment method", () => {
    const result = orderSchema.safeParse({ ...validOrder, paymentMethod: "BITCOIN" });
    expect(result.success).toBe(false);
  });

  it("should reject empty items array", () => {
    const result = orderSchema.safeParse({ ...validOrder, items: [] });
    expect(result.success).toBe(false);
  });

  it("should reject quantity > 99", () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      items: [{ menuItemId: "menu-1", quantity: 100 }],
    });
    expect(result.success).toBe(false);
  });

  it("should accept CASH payment method", () => {
    const result = orderSchema.safeParse({ ...validOrder, paymentMethod: "CASH" });
    expect(result.success).toBe(true);
  });
});
