import { describe, it, expect } from "vitest";
import { checkoutSchema } from "@/lib/validations";

describe("checkoutSchema", () => {
  const validCheckout = {
    customerName: "Test Customer",
    customerEmail: "customer@test.com",
    customerPhone: "07700900001",
    type: "PICKUP",
    paymentMethod: "STRIPE",
    items: [{ menuItemId: "menu-1", quantity: 2 }],
    pickupTime: "2026-04-01T18:30:00Z",
  };

  it("should pass with valid checkout data", () => {
    const result = checkoutSchema.safeParse(validCheckout);
    expect(result.success).toBe(true);
  });

  it("should reject missing customer name", () => {
    const { customerName, ...without } = validCheckout;
    const result = checkoutSchema.safeParse(without);
    expect(result.success).toBe(false);
  });

  it("should accept optional coupon code", () => {
    const result = checkoutSchema.safeParse({ ...validCheckout, couponCode: "WELCOME10" });
    expect(result.success).toBe(true);
  });

  it("should accept optional special requests", () => {
    const result = checkoutSchema.safeParse({
      ...validCheckout,
      specialRequests: "Extra spicy",
    });
    expect(result.success).toBe(true);
  });
});
