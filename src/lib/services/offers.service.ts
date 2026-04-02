import prisma from "@/lib/db";

export async function getActiveOffers() {
  return prisma.offer.findMany({
    where: { isActive: true, validFrom: { lte: new Date() }, OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }] },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOfferByCode(code: string) {
  return prisma.offer.findUnique({ where: { code } });
}

export async function incrementOfferUsage(id: string) {
  return prisma.offer.update({ where: { id }, data: { usedCount: { increment: 1 } } });
}
