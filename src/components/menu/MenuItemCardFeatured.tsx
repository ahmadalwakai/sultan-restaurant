"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuBadge from "./MenuBadge";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemCardFeaturedProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MenuItemCardFeatured({ item, onClick }: MenuItemCardFeaturedProps) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg"
      onClick={onClick}
    >
      <div className="relative h-72">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-6xl">🍛</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          {item.isPopular && <MenuBadge label="Popular" />}
          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">Featured</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white">{item.name}</h3>
        {item.description && <p className="mt-1 text-sm text-white/80 line-clamp-2">{item.description}</p>}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-400">{formatCurrency(item.price)}</span>
          <div onClick={(e) => e.stopPropagation()}>
            <MenuItemAddButton item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
