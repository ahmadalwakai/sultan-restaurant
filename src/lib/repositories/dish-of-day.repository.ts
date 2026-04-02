import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

const dishOfDayInclude = {
  menuItem: {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      price: true,
    },
  },
} satisfies Prisma.DishOfDayInclude;

export const dishOfDayRepository = {
  findByDate(date: Date) {
    return prisma.dishOfDay.findUnique({
      where: { date },
      include: dishOfDayInclude,
    });
  },

  findToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.findByDate(today);
  },

  findAll(params: {
    where?: Prisma.DishOfDayWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.DishOfDayOrderByWithRelationInput;
  }) {
    return prisma.dishOfDay.findMany({
      ...params,
      include: dishOfDayInclude,
    });
  },

  count(where?: Prisma.DishOfDayWhereInput) {
    return prisma.dishOfDay.count({ where });
  },

  findById(id: string) {
    return prisma.dishOfDay.findUnique({
      where: { id },
      include: dishOfDayInclude,
    });
  },

  create(data: Prisma.DishOfDayCreateInput) {
    return prisma.dishOfDay.create({
      data,
      include: dishOfDayInclude,
    });
  },

  update(id: string, data: Prisma.DishOfDayUpdateInput) {
    return prisma.dishOfDay.update({
      where: { id },
      data,
      include: dishOfDayInclude,
    });
  },

  delete(id: string) {
    return prisma.dishOfDay.delete({ where: { id } });
  },

  findRecent(limit = 30) {
    return this.findAll({
      orderBy: { date: "desc" },
      take: limit,
    });
  },
};
