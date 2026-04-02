"use client";

import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCartStore } from "@/lib/cart";
import type { MenuItemPublic } from "@/types/menu";

interface MenuItemCardProps {
  item: MenuItemPublic;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image ?? null,
    });
  };

  const dietaryBadges = [
    item.isVegetarian && { label: "V", color: "bg-green-500" },
    item.isVegan && { label: "VG", color: "bg-green-600" },
    item.isGlutenFree && { label: "GF", color: "bg-blue-500" },
  ].filter(Boolean) as { label: string; color: string }[];

  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image && !imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <span className="text-5xl">🍛</span>
          </div>
        )}
        {item.isPopular && (
          <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white">
            Popular
          </span>
        )}
        {dietaryBadges.length > 0 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {dietaryBadges.map((badge) => (
              <span
                key={badge.label}
                className={`${badge.color} rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg font-bold text-gray-900">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        )}
        {item.spiceLevel > 0 && (
          <div className="mt-2 flex items-center gap-0.5">
            {Array.from({ length: item.spiceLevel }).map((_, i) => (
              <span key={i} className="text-xs">🌶️</span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-amber-600">
            {formatCurrency(item.price)}
          </span>
          <button
            onClick={handleAdd}
            disabled={!item.isAvailable}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {item.isAvailable ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
