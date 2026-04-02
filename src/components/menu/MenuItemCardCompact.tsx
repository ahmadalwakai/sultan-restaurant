"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemCardCompactProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MenuItemCardCompact({ item, onClick }: MenuItemCardCompactProps) {
  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 transition-all hover:border-amber-200 hover:shadow-sm"
      onClick={onClick}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-50 text-2xl">🍛</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900">{item.name}</p>
        {item.description && <p className="truncate text-xs text-gray-400">{item.description}</p>}
        <p className="mt-1 font-semibold text-amber-600">{formatCurrency(item.price)}</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <MenuItemAddButton item={item} />
      </div>
    </div>
  );
}
