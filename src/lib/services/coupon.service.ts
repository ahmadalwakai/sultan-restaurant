import { couponRepository } from "@/lib/repositories";
import { toCouponPublic, toCouponAdmin } from "@/lib/mappers";
import { NotFoundError, BadRequestError } from "@/lib/errors";
import type { ValidateCouponResult } from "@/types/coupon";

export const couponService = {
  async validate(code: string, orderTotal: number): Promise<ValidateCouponResult> {
    const coupon = await couponRepository.findByCode(code);
    if (!coupon || !coupon.isActive) return { valid: false, error: "Invalid coupon code" };

    const now = new Date();
    if (coupon.validFrom > now) return { valid: false, error: "Coupon not yet valid" };
    if (coupon.validUntil && coupon.validUntil < now) return { valid: false, error: "Coupon expired" };
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return { valid: false, error: "Coupon usage limit reached" };
    if (coupon.minOrder && orderTotal < Number(coupon.minOrder)) {
      return { valid: false, error: `Minimum order of \u00a3${Number(coupon.minOrder).toFixed(2)} required` };
    }

    return { valid: true, coupon: toCouponPublic(coupon) };
  },

  async getAll() {
    const coupons = await couponRepository.findAll();
    return coupons.map(toCouponAdmin);
  },

  async create(input: Record<string, unknown>) {
    const coupon = await couponRepository.create(input as never);
    return toCouponAdmin(coupon);
  },

  async update(id: string, input: Record<string, unknown>) {
    const existing = await couponRepository.findById(id);
    if (!existing) throw new NotFoundError("Coupon");
    const coupon = await couponRepository.update(id, input);
    return toCouponAdmin(coupon);
  },

  async delete(id: string) {
    const existing = await couponRepository.findById(id);
    if (!existing) throw new NotFoundError("Coupon");
    await couponRepository.delete(id);
  },
};
