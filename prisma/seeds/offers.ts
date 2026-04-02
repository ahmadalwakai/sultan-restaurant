import { PrismaClient } from "@prisma/client";
import { seedLogger, getOfferImage } from "../utils";

const offersData = [
  {
    title: "Family Feast",
    description: "Feed the whole family with our special combo. Includes mixed grills, rice, salads, and drinks.",
    code: "FAMILY25",
    discount: 25,
    discountType: "PERCENTAGE" as const,
    minOrder: 50,
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
  },
  {
    title: "Lunch Special",
    description: "20% off all orders between 12-3pm. Perfect for a quick lunch!",
    code: "LUNCH20",
    discount: 20,
    discountType: "PERCENTAGE" as const,
    minOrder: 15,
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  },
  {
    title: "First Order",
    description: "Welcome to Sultan! Get 15% off your first online order.",
    code: "WELCOME15",
    discount: 15,
    discountType: "PERCENTAGE" as const,
    maxUses: 1000,
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  },
];

export async function seedOffers(prisma: PrismaClient) {
  seedLogger.info("Seeding offers...");

  const offers = await Promise.all(
    offersData.map((o) =>
      prisma.offer.upsert({
        where: { code: o.code },
        update: { title: o.title, description: o.description, discount: o.discount },
        create: {
          title: o.title,
          description: o.description,
          code: o.code,
          discount: o.discount,
          discountType: o.discountType,
          minOrder: o.minOrder,
          maxUses: o.maxUses,
          validUntil: o.validUntil,
          image: getOfferImage(o.title),
          isActive: true,
        },
      })
    )
  );

  seedLogger.table("Offer", offers.length);
  return offers;
}
