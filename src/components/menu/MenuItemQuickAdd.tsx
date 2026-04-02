"use client";

import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemQuickAddProps {
  item: MenuItemPublic;
}

export default function MenuItemQuickAdd({ item }: MenuItemQuickAddProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-2">
      <div className="min-w-0 flex-1">
        <span className="truncate text-sm font-medium text-gray-900">{item.name}</span>
        <span className="ml-2 text-sm text-amber-600">{formatCurrency(item.price)}</span>
      </div>
      <MenuItemAddButton item={item} />
    </div>
  );
}
