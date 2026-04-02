"use client";

import Image from "next/image";
import Link from "next/link";
import type { CategoryPublic } from "@/types/category";

interface CategoryCardProps {
  category: CategoryPublic;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/menu?category=${category.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold font-heading">{category.name}</h3>
        {category.description && (
          <p className="mt-1 text-sm text-white/80 line-clamp-1">
            {category.description}
          </p>
        )}
        <span className="mt-1 inline-block text-xs text-amber-300">
          {category.itemCount} items
        </span>
      </div>
    </Link>
  );
}
