import prisma from "@/lib/db";

export async function getGalleryImages() {
  return prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function addGalleryImage(data: { url: string; alt?: string; caption?: string }) {
  const maxOrder = await prisma.galleryImage.aggregate({ _max: { sortOrder: true } });
  return prisma.galleryImage.create({ data: { ...data, sortOrder: (maxOrder._max.sortOrder ?? 0) + 1 } });
}

export async function deleteGalleryImage(id: string) {
  return prisma.galleryImage.delete({ where: { id } });
}

export async function reorderGalleryImages(ids: string[]) {
  const updates = ids.map((id, i) => prisma.galleryImage.update({ where: { id }, data: { sortOrder: i } }));
  return prisma.$transaction(updates);
}
