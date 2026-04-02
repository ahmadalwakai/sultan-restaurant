import type { DishOfDay, MenuItem } from "@prisma/client";
import type { DishOfDayPublic, DishOfDayAdmin } from "@/types/dish-of-day";

type DishOfDayWithMenuItem = DishOfDay & {
  menuItem: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    price: import("@prisma/client").Prisma.Decimal;
  };
};

export function toDishOfDayPublic(dod: DishOfDayWithMenuItem): DishOfDayPublic {
  return {
    id: dod.id,
    menuItemId: dod.menuItemId,
    menuItemName: dod.menuItem.name,
    menuItemSlug: dod.menuItem.slug,
    menuItemDescription: dod.menuItem.description,
    menuItemImage: dod.menuItem.image,
    menuItemPrice: Number(dod.menuItem.price),
    discountPrice: dod.discountPrice ? Number(dod.discountPrice) : null,
    reason: dod.reason,
    date: dod.date.toISOString().split("T")[0],
  };
}

export function toDishOfDayAdmin(dod: DishOfDayWithMenuItem): DishOfDayAdmin {
  return {
    ...toDishOfDayPublic(dod),
    isActive: dod.isActive,
    createdAt: dod.createdAt.toISOString(),
    updatedAt: dod.updatedAt.toISOString(),
  };
}
