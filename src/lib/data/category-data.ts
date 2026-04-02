import prisma from "@/lib/db";

export async function getCategories() {
  return prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, include: { _count: { select: { menuItems: true } } } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug }, include: { menuItems: { where: { isAvailable: true }, orderBy: { sortOrder: "asc" } } } });
}
