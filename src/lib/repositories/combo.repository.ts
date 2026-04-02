import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

const comboInclude = {
  items: {
    include: {
      menuItem: { select: { id: true, name: true, slug: true, image: true, price: true } },
    },
  },
} satisfies Prisma.ComboInclude;

export const comboRepository = {
  findAll(params: {
    where?: Prisma.ComboWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.ComboOrderByWithRelationInput;
  }) {
    return prisma.combo.findMany({
      ...params,
      include: comboInclude,
    });
  },

  count(where?: Prisma.ComboWhereInput) {
    return prisma.combo.count({ where });
  },

  findById(id: string) {
    return prisma.combo.findUnique({
      where: { id },
      include: comboInclude,
    });
  },

  findBySlug(slug: string) {
    return prisma.combo.findUnique({
      where: { slug },
      include: comboInclude,
    });
  },

  findActive() {
    return this.findAll({
      where: { isActive: true, isAvailable: true },
      orderBy: { sortOrder: "asc" },
    });
  },

  create(data: Prisma.ComboCreateInput) {
    return prisma.combo.create({
      data,
      include: comboInclude,
    });
  },

  update(id: string, data: Prisma.ComboUpdateInput) {
    return prisma.combo.update({
      where: { id },
      data,
      include: comboInclude,
    });
  },

  delete(id: string) {
    return prisma.combo.delete({ where: { id } });
  },

  async replaceItems(comboId: string, items: { menuItemId: string; quantity: number }[]) {
    await prisma.comboItem.deleteMany({ where: { comboId } });
    await prisma.comboItem.createMany({
      data: items.map((item) => ({ comboId, ...item })),
    });
  },
};
