import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const orderRepository = {
  findAll(params: {
    where?: Prisma.OrderWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }) {
    return prisma.order.findMany({
      ...params,
      include: {
        items: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
  },

  count(where?: Prisma.OrderWhereInput) {
    return prisma.order.count({ where });
  },

  findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { menuItem: { select: { image: true } } } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
  },

  findByOrderNumber(orderNumber: string) {
    return prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });
  },

  findByStripeSession(stripeSessionId: string) {
    return prisma.order.findUnique({
      where: { stripeSessionId },
      include: { items: true },
    });
  },

  findByUser(userId: string) {
    return this.findAll({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  create(data: Prisma.OrderCreateInput) {
    return prisma.order.create({
      data,
      include: { items: true },
    });
  },

  update(id: string, data: Prisma.OrderUpdateInput) {
    return prisma.order.update({
      where: { id },
      data,
      include: { items: true },
    });
  },

  delete(id: string) {
    return prisma.order.delete({ where: { id } });
  },
};
