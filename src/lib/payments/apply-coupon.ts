import prisma from "@/lib/db";

export async function applyCoupon(code: string, subtotal: number) {
  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
  if (!coupon) return { valid: false, error: "Invalid coupon code" };
  if (!coupon.isActive) return { valid: false, error: "Coupon is no longer active" };
  if (coupon.validUntil && coupon.validUntil < new Date()) return { valid: false, error: "Coupon has expired" };
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return { valid: false, error: "Coupon usage limit reached" };
  if (coupon.minOrder && subtotal < Number(coupon.minOrder)) return { valid: false, error: `Minimum order \u00a3${Number(coupon.minOrder).toFixed(2)} required` };

  let discount = coupon.discountType === "PERCENTAGE" ? subtotal * (Number(coupon.discount) / 100) : Number(coupon.discount);
  if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));

  return { valid: true, discount, couponId: coupon.id, code: coupon.code };
}
