"use client";

import Link from "next/link";
import { usePopularMenu } from "@/hooks/api";
import { MenuItemCard } from "@/components/cards/MenuItemCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function PopularDishes() {
  const { data: items, isLoading, isError } = usePopularMenu();

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Most Popular Dishes"
          subtitle="Our customers' all-time favourites"
        />
        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        ) : isError || !items || items.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            Our full menu is available on the menu page.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, 8).map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="rounded-lg border-2 border-amber-500 px-8 py-3 font-semibold text-amber-600 transition-colors hover:bg-amber-500 hover:text-white"
          >
            See Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
