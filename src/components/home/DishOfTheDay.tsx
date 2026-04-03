"use client";

import Link from "next/link";
import Image from "next/image";
import { useDishOfDay } from "@/hooks/api";
import { formatCurrency } from "@/lib/utils/format-currency";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function DishOfTheDay() {
  const { data: dish } = useDishOfDay();

  if (!dish) return null;

  const hasDiscount = dish.discountPrice !== null && dish.discountPrice < dish.menuItemPrice;

  return (
    <section className="bg-gradient-to-r from-amber-600 to-orange-600 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          title="Dish of the Day"
          subtitle={dish.reason || "Chef's special selection for today"}
          className="[&_h2]:text-white [&_p]:text-white/80"
        />
        <div className="mt-12 flex flex-col items-center gap-8 md:flex-row">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl md:w-1/2">
            {dish.menuItemImage ? (
              <Image
                src={dish.menuItemImage}
                alt={dish.menuItemName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-amber-200 text-8xl">
                🍲
              </div>
            )}
            {hasDiscount && (
              <div className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
                SAVE {Math.round(((dish.menuItemPrice - dish.discountPrice!) / dish.menuItemPrice) * 100)}%
              </div>
            )}
          </div>
          <div className="flex-1 text-center text-white md:text-left">
            <h3 className="text-3xl font-bold md:text-4xl">{dish.menuItemName}</h3>
            {dish.menuItemDescription && (
              <p className="mt-3 text-lg text-white/90 leading-relaxed">{dish.menuItemDescription}</p>
            )}
            <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-bold text-white">
                    {formatCurrency(dish.discountPrice!)}
                  </span>
                  <span className="text-xl text-white/60 line-through">
                    {formatCurrency(dish.menuItemPrice)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-white">
                  {formatCurrency(dish.menuItemPrice)}
                </span>
              )}
            </div>
            <Link
              href={`/menu/${dish.menuItemSlug}`}
              className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-amber-700 transition-colors hover:bg-amber-50"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
