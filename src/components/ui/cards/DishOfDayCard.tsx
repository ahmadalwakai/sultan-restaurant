"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { DishOfDayPublic } from "@/types/dish-of-day";

interface DishOfDayCardProps {
  dish: DishOfDayPublic;
}

export function DishOfDayCard({ dish }: DishOfDayCardProps) {
  const hasDiscount = dish.discountPrice !== null && dish.discountPrice < dish.menuItemPrice;

  return (
    <div className="group overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-square sm:w-1/2">
          {dish.menuItemImage ? (
            <Image src={dish.menuItemImage} alt={dish.menuItemName} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">🍲</div>
          )}
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            ⭐ Dish of the Day
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 text-white sm:w-1/2">
          <h3 className="text-2xl font-bold">{dish.menuItemName}</h3>
          {dish.menuItemDescription && (
            <p className="mt-2 text-sm text-white/80 line-clamp-3">{dish.menuItemDescription}</p>
          )}
          {dish.reason && <p className="mt-2 text-sm italic text-white/70">&ldquo;{dish.reason}&rdquo;</p>}
          <div className="mt-4 flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold">{formatCurrency(dish.discountPrice!)}</span>
                <span className="text-base text-white/60 line-through">{formatCurrency(dish.menuItemPrice)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold">{formatCurrency(dish.menuItemPrice)}</span>
            )}
          </div>
          <Link
            href={`/menu/${dish.menuItemSlug}`}
            className="mt-4 inline-block rounded-lg bg-white px-6 py-2.5 text-center font-semibold text-amber-600 transition-colors hover:bg-amber-50"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
