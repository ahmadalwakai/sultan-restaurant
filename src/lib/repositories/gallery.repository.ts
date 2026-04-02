import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const galleryRepository = {
  findAll(where?: Prisma.GalleryImageWhereInput) {
    return prisma.galleryImage.findMany({ where, orderBy: { sortOrder: "asc" } });
  },

  findVisible() {
    return this.findAll({ isVisible: true });
  },

  findById(id: string) {
    return prisma.galleryImage.findUnique({ where: { id } });
  },

  create(data: Prisma.GalleryImageCreateInput) {
    return prisma.galleryImage.create({ data });
  },

  update(id: string, data: Prisma.GalleryImageUpdateInput) {
    return prisma.galleryImage.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.galleryImage.delete({ where: { id } });
  },

  async reorder(items: { id: string; sortOrder: number }[]) {
    await prisma.$transaction(
      items.map((item) =>
        prisma.galleryImage.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
  },
};
