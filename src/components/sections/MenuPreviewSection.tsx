"use client";

import Link from "next/link";
import { usePopularMenu } from "@/hooks/api";
import { MenuItemCard } from "@/components/cards/MenuItemCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LoadingState } from "@/components/shared/LoadingState";

export function MenuPreviewSection() {
  const { data: items, isLoading } = usePopularMenu();

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          title="Our Popular Dishes"
          subtitle="Discover the most loved dishes from our kitchen"
        />
        {isLoading ? (
          <LoadingState message="Loading dishes..." />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items?.slice(0, 8).map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-block rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
