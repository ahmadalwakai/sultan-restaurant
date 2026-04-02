import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const couponsData = [
  {
    code: "SULTAN20",
    description: "20% off for loyal customers",
    discount: 20,
    discountType: "PERCENTAGE" as const,
    minOrder: 25,
    maxDiscount: 15,
    validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
  },
  {
    code: "WELCOME10",
    description: "10% off your first order",
    discount: 10,
    discountType: "PERCENTAGE" as const,
    maxUses: 500,
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  },
  {
    code: "FAMILY15",
    description: "15% off family orders over £40",
    discount: 15,
    discountType: "PERCENTAGE" as const,
    minOrder: 40,
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  },
  {
    code: "FIVER",
    description: "£5 off orders over £30",
    discount: 5,
    discountType: "FIXED" as const,
    minOrder: 30,
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  },
];

export async function seedCoupons(prisma: PrismaClient) {
  seedLogger.info("Seeding coupons...");

  const coupons = await Promise.all(
    couponsData.map((c) =>
      prisma.coupon.upsert({
        where: { code: c.code },
        update: { description: c.description, discount: c.discount },
        create: {
          code: c.code,
          description: c.description,
          discount: c.discount,
          discountType: c.discountType,
          minOrder: c.minOrder,
          maxDiscount: c.maxDiscount,
          maxUses: c.maxUses,
          validUntil: c.validUntil,
          isActive: true,
        },
      })
    )
  );

  seedLogger.table("Coupon", coupons.length);
  return coupons;
}
