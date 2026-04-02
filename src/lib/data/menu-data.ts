import prisma from "@/lib/db";

export async function getMenuItems(params?: { categoryId?: string; search?: string }) {
  const where: Record<string, unknown> = { isAvailable: true };
  if (params?.categoryId) where.categoryId = params.categoryId;
  if (params?.search) where.name = { contains: params.search, mode: "insensitive" };

  return prisma.menuItem.findMany({ where, orderBy: { sortOrder: "asc" }, include: { category: { select: { name: true, slug: true } } } });
}

export async function getMenuItemBySlug(slug: string) {
  return prisma.menuItem.findUnique({ where: { slug }, include: { category: true } });
}

export async function getPopularItems(limit = 8) {
  return prisma.menuItem.findMany({ where: { isAvailable: true, isPopular: true }, orderBy: { sortOrder: "asc" }, take: limit, include: { category: { select: { name: true, slug: true } } } });
}

export async function getRelatedItems(itemId: string, categoryId: string, limit = 4) {
  return prisma.menuItem.findMany({ where: { categoryId, id: { not: itemId }, isAvailable: true }, take: limit, include: { category: { select: { name: true, slug: true } } } });
}
