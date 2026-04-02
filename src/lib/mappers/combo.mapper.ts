import type { Combo, ComboItem, MenuItem } from "@prisma/client";
import type { ComboPublic, ComboAdmin, ComboItemPublic } from "@/types/combo";

type ComboWithItems = Combo & {
  items: (ComboItem & {
    menuItem: { id: string; name: string; slug: string; image: string | null; price: import("@prisma/client").Prisma.Decimal };
  })[];
};

function toComboItem(item: ComboWithItems["items"][number]): ComboItemPublic {
  return {
    id: item.id,
    menuItemId: item.menuItemId,
    menuItemName: item.menuItem.name,
    menuItemImage: item.menuItem.image,
    quantity: item.quantity,
  };
}

export function toComboPublic(combo: ComboWithItems): ComboPublic {
  return {
    id: combo.id,
    name: combo.name,
    slug: combo.slug,
    description: combo.description,
    image: combo.image,
    price: Number(combo.price),
    originalPrice: Number(combo.originalPrice),
    savings: Number(combo.savings),
    servesCount: combo.servesCount,
    isAvailable: combo.isAvailable,
    items: combo.items.map(toComboItem),
  };
}

export function toComboAdmin(combo: ComboWithItems): ComboAdmin {
  return {
    ...toComboPublic(combo),
    isActive: combo.isActive,
    sortOrder: combo.sortOrder,
    createdAt: combo.createdAt.toISOString(),
    updatedAt: combo.updatedAt.toISOString(),
  };
}
