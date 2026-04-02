import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const offerRepository = {
  findAll(where?: Prisma.OfferWhereInput) {
    return prisma.offer.findMany({ where, orderBy: { createdAt: "desc" } });
  },

  findActive() {
    const now = new Date();
    return this.findAll({
      isActive: true,
      validFrom: { lte: now },
      OR: [{ validUntil: null }, { validUntil: { gte: now } }],
    });
  },

  findById(id: string) {
    return prisma.offer.findUnique({ where: { id } });
  },

  create(data: Prisma.OfferCreateInput) {
    return prisma.offer.create({ data });
  },

  update(id: string, data: Prisma.OfferUpdateInput) {
    return prisma.offer.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.offer.delete({ where: { id } });
  },
};
