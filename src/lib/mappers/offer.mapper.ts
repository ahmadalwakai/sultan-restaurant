import type { Offer } from "@prisma/client";
import type { OfferPublic, OfferAdmin } from "@/types/offer";

export function toOfferPublic(o: Offer): OfferPublic {
  return {
    id: o.id,
    title: o.title,
    description: o.description,
    code: o.code,
    discount: Number(o.discount),
    discountType: o.discountType,
    image: o.image,
    validFrom: o.validFrom.toISOString(),
    validUntil: o.validUntil?.toISOString() ?? null,
    minOrder: o.minOrder ? Number(o.minOrder) : null,
  };
}

export function toOfferAdmin(o: Offer): OfferAdmin {
  return {
    ...toOfferPublic(o),
    isActive: o.isActive,
    maxUses: o.maxUses,
    usedCount: o.usedCount,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  };
}
