import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const reviewRepository = {
  findAll(params: {
    where?: Prisma.ReviewWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.ReviewOrderByWithRelationInput;
  }) {
    return prisma.review.findMany({
      ...params,
      include: { user: { select: { id: true, name: true, image: true } } },
    });
  },

  count(where?: Prisma.ReviewWhereInput) {
    return prisma.review.count({ where });
  },

  findApproved(limit?: number) {
    return this.findAll({
      where: { status: "APPROVED", isVisible: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  findById(id: string) {
    return prisma.review.findUnique({ where: { id } });
  },

  create(data: Prisma.ReviewCreateInput) {
    return prisma.review.create({ data });
  },

  update(id: string, data: Prisma.ReviewUpdateInput) {
    return prisma.review.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.review.delete({ where: { id } });
  },
};
