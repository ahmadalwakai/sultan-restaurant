import type { Coupon } from "@prisma/client";
import type { CouponPublic, CouponAdmin } from "@/types/coupon";

export function toCouponPublic(c: Coupon): CouponPublic {
  return {
    code: c.code,
    discount: Number(c.discount),
    discountType: c.discountType,
    minOrder: c.minOrder ? Number(c.minOrder) : null,
    maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : null,
  };
}

export function toCouponAdmin(c: Coupon): CouponAdmin {
  return {
    ...toCouponPublic(c),
    id: c.id,
    description: c.description,
    maxUses: c.maxUses,
    usedCount: c.usedCount,
    isActive: c.isActive,
    validFrom: c.validFrom.toISOString(),
    validUntil: c.validUntil?.toISOString() ?? null,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}
