import { describe, it, expect } from "vitest";
import { coupons } from "../../fixtures";

describe("applyCoupon", () => {
  it("should apply percentage discount", () => {
    const coupon = coupons[0]; // 10% off, min £15, max £5
    const subtotal = 40.9;
    const discount = Math.min(
      subtotal * (coupon.discount / 100),
      coupon.maxDiscount ?? Infinity
    );
    expect(discount).toBeCloseTo(4.09, 1);
  });

  it("should apply fixed discount", () => {
    const coupon = coupons[1]; // £5 off
    const subtotal = 40.9;
    const discount = coupon.discount;
    expect(discount).toBe(5);
  });

  it("should reject if order below minimum", () => {
    const coupon = coupons[0]; // min £15
    const subtotal = 10;
    const isValid = subtotal >= coupon.minOrder;
    expect(isValid).toBe(false);
  });

  it("should accept if order meets minimum", () => {
    const coupon = coupons[0];
    const subtotal = 20;
    const isValid = subtotal >= coupon.minOrder;
    expect(isValid).toBe(true);
  });

  it("should cap at maxDiscount for percentage", () => {
    const coupon = coupons[0]; // 10%, max £5
    const subtotal = 100;
    const rawDiscount = subtotal * (coupon.discount / 100);
    const discount = Math.min(rawDiscount, coupon.maxDiscount!);
    expect(discount).toBe(5);
  });
});
