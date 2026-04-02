import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const couponRepository = {
  findAll(where?: Prisma.CouponWhereInput) {
    return prisma.coupon.findMany({ where, orderBy: { createdAt: "desc" } });
  },

  count(where?: Prisma.CouponWhereInput) {
    return prisma.coupon.count({ where });
  },

  findById(id: string) {
    return prisma.coupon.findUnique({ where: { id } });
  },

  findByCode(code: string) {
    return prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
  },

  create(data: Prisma.CouponCreateInput) {
    return prisma.coupon.create({ data });
  },

  update(id: string, data: Prisma.CouponUpdateInput) {
    return prisma.coupon.update({ where: { id }, data });
  },

  incrementUsage(id: string) {
    return prisma.coupon.update({
      where: { id },
      data: { usedCount: { increment: 1 } },
    });
  },

  delete(id: string) {
    return prisma.coupon.delete({ where: { id } });
  },
};
