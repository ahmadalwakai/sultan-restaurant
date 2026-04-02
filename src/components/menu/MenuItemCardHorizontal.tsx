"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuBadge from "./MenuBadge";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemCardHorizontalProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MenuItemCardHorizontal({ item, onClick }: MenuItemCardHorizontalProps) {
  return (
    <div
      className="group flex cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="relative w-40 shrink-0">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="160px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-50 text-4xl">🍛</div>
        )}
        {item.isPopular && (
          <div className="absolute left-2 top-2">
            <MenuBadge label="Popular" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
          {item.description && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>}
          <div className="mt-2 flex flex-wrap gap-1">
            {item.isVegetarian && <MenuBadge label="V" colorScheme="vegetarian" />}
            {item.isVegan && <MenuBadge label="VG" colorScheme="vegan" />}
            {item.isGlutenFree && <MenuBadge label="GF" colorScheme="gluten-free" />}
            {item.isSpicy && <MenuBadge label="🌶️" colorScheme="spicy" />}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-amber-600">{formatCurrency(item.price)}</span>
          <div onClick={(e) => e.stopPropagation()}>
            <MenuItemAddButton item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
