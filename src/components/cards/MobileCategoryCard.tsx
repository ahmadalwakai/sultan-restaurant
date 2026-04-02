"use client";

import Image from "next/image";
import Link from "next/link";

interface MobileCategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    image?: string | null;
    itemCount?: number;
  };
}

export function MobileCategoryCard({ category }: MobileCategoryCardProps) {
  return (
    <Link
      href={`/menu?category=${category.slug}`}
      className="flex flex-col items-center gap-2 active:scale-95"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-amber-200">
        {category.image ? (
          <Image src={category.image} alt={category.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-50 text-2xl">🍽️</div>
        )}
      </div>
      <span className="text-center text-xs font-medium text-gray-700 line-clamp-1">{category.name}</span>
    </Link>
  );
}
