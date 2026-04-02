"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { DishOfDayPublic } from "@/types/dish-of-day";

interface DishOfDayPreviewProps {
  dishOfDay: DishOfDayPublic;
}

export function DishOfDayPreview({ dishOfDay }: DishOfDayPreviewProps) {
  const savings = dishOfDay.menuItemPrice - (dishOfDay.discountPrice ?? dishOfDay.menuItemPrice);

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {dishOfDay.menuItemImage && (
        <div className="relative h-40">
          <Image src={dishOfDay.menuItemImage} alt={dishOfDay.menuItemName} fill className="object-cover" />
          <div className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
            Save {formatCurrency(savings)}
          </div>
        </div>
      )}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-600">Dish of the Day</p>
        <h3 className="mt-1 text-lg font-bold text-gray-900">{dishOfDay.menuItemName}</h3>
        {dishOfDay.reason && <p className="mt-1 text-sm italic text-gray-500">{dishOfDay.reason}</p>}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-amber-600">{formatCurrency(dishOfDay.discountPrice ?? dishOfDay.menuItemPrice)}</span>
          <span className="text-sm text-gray-400 line-through">{formatCurrency(dishOfDay.menuItemPrice)}</span>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          {new Date(dishOfDay.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>
    </div>
  );
}
