import type { Category } from "@prisma/client";
import type { CategoryPublic, CategoryAdmin } from "@/types/category";

type CategoryWithCount = Category & { _count: { menuItems: number } };

export function toCategoryPublic(c: CategoryWithCount): CategoryPublic {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    itemCount: c._count.menuItems,
  };
}

export function toCategoryAdmin(c: CategoryWithCount): CategoryAdmin {
  return {
    ...toCategoryPublic(c),
    sortOrder: c.sortOrder,
    isActive: c.isActive,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}
