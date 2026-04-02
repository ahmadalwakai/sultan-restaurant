"use client";

import Image from "next/image";
import Link from "next/link";

interface CuisineCardProps {
  cuisine: {
    name: string;
    image: string;
    slug: string;
    itemCount?: number;
  };
}

export function CuisineCard({ cuisine }: CuisineCardProps) {
  return (
    <Link href={`/menu?category=${cuisine.slug}`} className="group block">
      <div className="relative h-36 overflow-hidden rounded-2xl">
        <Image
          src={cuisine.image}
          alt={cuisine.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-semibold text-white">{cuisine.name}</p>
          {cuisine.itemCount !== undefined && (
            <p className="text-xs text-white/80">{cuisine.itemCount} items</p>
          )}
        </div>
      </div>
    </Link>
  );
}
