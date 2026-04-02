import { describe, it, expect } from "vitest";
import { couponSchema } from "@/lib/validations";

describe("couponSchema", () => {
  const validCoupon = {
    code: "SUMMER20",
    discount: 20,
    discountType: "PERCENTAGE",
    minOrder: 15,
    maxDiscount: 10,
    maxUses: 100,
    isActive: true,
    validFrom: "2026-01-01T00:00:00Z",
    validUntil: "2026-12-31T23:59:59Z",
  };

  it("should pass with valid data", () => {
    const result = couponSchema.safeParse(validCoupon);
    expect(result.success).toBe(true);
  });

  it("should reject invalid discount type", () => {
    const result = couponSchema.safeParse({ ...validCoupon, discountType: "FREE" });
    expect(result.success).toBe(false);
  });

  it("should accept FIXED discount type", () => {
    const result = couponSchema.safeParse({ ...validCoupon, discountType: "FIXED" });
    expect(result.success).toBe(true);
  });

  it("should reject negative discount", () => {
    const result = couponSchema.safeParse({ ...validCoupon, discount: -5 });
    expect(result.success).toBe(false);
  });
});
