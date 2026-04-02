"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/api";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { LoadingState } from "@/components/shared/LoadingState";

export function CategoriesShowcase() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <LoadingState message="Loading categories..." />;
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Explore Our Menu"
          subtitle="From traditional Iraqi to Lebanese and Indian cuisine"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3]">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 text-5xl">
                    🍽️
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 text-sm text-white/80 line-clamp-1">{cat.description}</p>
                )}
                <span className="mt-2 inline-block text-xs font-medium text-amber-300">
                  {cat.itemCount} items →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
