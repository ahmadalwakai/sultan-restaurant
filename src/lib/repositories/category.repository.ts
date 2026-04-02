import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const categoryRepository = {
  findAll(where?: Prisma.CategoryWhereInput) {
    return prisma.category.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { menuItems: true } } },
    });
  },

  findActive() {
    return this.findAll({ isActive: true });
  },

  findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  },

  findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
      include: { _count: { select: { menuItems: true } } },
    });
  },

  create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  },

  update(id: string, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  },

  async reorder(items: { id: string; sortOrder: number }[]) {
    await prisma.$transaction(
      items.map((item) =>
        prisma.category.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
  },
};
