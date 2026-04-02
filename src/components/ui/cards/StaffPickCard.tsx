"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";

interface StaffPickCardProps {
  item: MenuItemPublic;
  staffNote?: string;
  onAddToCart?: () => void;
}

export function StaffPickCard({ item, staffNote, onAddToCart }: StaffPickCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="absolute left-3 top-3 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
        ⭐ Staff Pick
      </div>
      <div className="relative h-48">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-50 text-5xl">🍽️</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900">{item.name}</h3>
        {staffNote && <p className="mt-1 text-sm italic text-gray-500">&ldquo;{staffNote}&rdquo;</p>}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-amber-600">{formatCurrency(item.price)}</span>
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
