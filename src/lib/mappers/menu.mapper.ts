import type { MenuItem } from "@prisma/client";
import type { MenuItemPublic, MenuItemAdmin } from "@/types/menu";

type MenuItemWithCategory = MenuItem & { category: { id: string; name: string; slug: string } };

export function toMenuItemPublic(item: MenuItemWithCategory): MenuItemPublic {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    price: Number(item.price),
    image: item.image,
    categoryId: item.categoryId,
    categoryName: item.category.name,
    isAvailable: item.isAvailable,
    isPopular: item.isPopular,
    isVegetarian: item.isVegetarian,
    isVegan: item.isVegan,
    isGlutenFree: item.isGlutenFree,
    isSpicy: item.isSpicy,
    spiceLevel: item.spiceLevel,
    allergens: item.allergens,
  };
}

export function toMenuItemAdmin(item: MenuItemWithCategory): MenuItemAdmin {
  return {
    ...toMenuItemPublic(item),
    sortOrder: item.sortOrder,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}
