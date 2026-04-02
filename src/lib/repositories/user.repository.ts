import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const userRepository = {
  findAll(params: {
    where?: Prisma.UserWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return prisma.user.findMany({
      ...params,
      include: {
        _count: { select: { orders: true, bookings: true } },
      },
    });
  },

  count(where?: Prisma.UserWhereInput) {
    return prisma.user.count({ where });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        _count: { select: { orders: true, bookings: true } },
      },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  },
};
