import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const menuRepository = {
  findAll(params: {
    where?: Prisma.MenuItemWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.MenuItemOrderByWithRelationInput;
  }) {
    return prisma.menuItem.findMany({
      ...params,
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
  },

  count(where?: Prisma.MenuItemWhereInput) {
    return prisma.menuItem.count({ where });
  },

  findById(id: string) {
    return prisma.menuItem.findUnique({
      where: { id },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
  },

  findBySlug(slug: string) {
    return prisma.menuItem.findUnique({
      where: { slug },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
  },

  findByCategory(categoryId: string) {
    return this.findAll({
      where: { categoryId, isAvailable: true },
      orderBy: { sortOrder: "asc" },
    });
  },

  findPopular(limit = 8) {
    return this.findAll({
      where: { isPopular: true, isAvailable: true },
      take: limit,
      orderBy: { sortOrder: "asc" },
    });
  },

  findByIds(ids: string[]) {
    return prisma.menuItem.findMany({ where: { id: { in: ids } } });
  },

  create(data: Prisma.MenuItemCreateInput) {
    return prisma.menuItem.create({
      data,
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
  },

  update(id: string, data: Prisma.MenuItemUpdateInput) {
    return prisma.menuItem.update({
      where: { id },
      data,
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
  },

  delete(id: string) {
    return prisma.menuItem.delete({ where: { id } });
  },

  async reorder(items: { id: string; sortOrder: number }[]) {
    await prisma.$transaction(
      items.map((item) =>
        prisma.menuItem.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
  },
};
