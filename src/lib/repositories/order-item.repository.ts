import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const orderItemRepository = {
  findByOrder(orderId: string) {
    return prisma.orderItem.findMany({
      where: { orderId },
      include: { menuItem: { select: { image: true, slug: true } } },
    });
  },

  createMany(data: Prisma.OrderItemCreateManyInput[]) {
    return prisma.orderItem.createMany({ data });
  },
};
