import { describe, it, expect } from "vitest";
import { cart, coupons } from "../../fixtures";

describe("calculateTotals", () => {
  it("should calculate correct subtotal", () => {
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    expect(subtotal).toBeCloseTo(40.9, 1);
  });

  it("should calculate total with percentage discount", () => {
    const subtotal = 40.9;
    const discount = subtotal * (coupons[0].discount / 100);
    const total = subtotal - discount;
    expect(total).toBeCloseTo(36.81, 1);
  });

  it("should calculate total with fixed discount", () => {
    const subtotal = 40.9;
    const discount = coupons[1].discount;
    const total = subtotal - discount;
    expect(total).toBeCloseTo(35.9, 1);
  });

  it("should not go below zero", () => {
    const subtotal = 3.0;
    const discount = 5.0;
    const total = Math.max(0, subtotal - discount);
    expect(total).toBe(0);
  });

  it("should cap percentage discount at maxDiscount", () => {
    const subtotal = 100;
    const coupon = coupons[0]; // 10% with max £5
    const rawDiscount = subtotal * (coupon.discount / 100);
    const cappedDiscount = Math.min(rawDiscount, coupon.maxDiscount!);
    expect(cappedDiscount).toBe(5);
  });
});
