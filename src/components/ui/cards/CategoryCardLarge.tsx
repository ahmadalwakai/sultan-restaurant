import Link from "next/link";
import Image from "next/image";
import type { CategoryPublic } from "@/types/category";

interface CategoryCardLargeProps {
  category: CategoryPublic;
}

export function CategoryCardLarge({ category }: CategoryCardLargeProps) {
  return (
    <Link
      href={`/menu?category=${category.slug}`}
      className="group relative overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3]">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 text-6xl">🍽️</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-xl font-bold">{category.name}</h3>
        {category.description && <p className="mt-1 text-sm text-white/80 line-clamp-2">{category.description}</p>}
        <span className="mt-2 inline-block text-sm font-medium text-amber-300">{category.itemCount} items →</span>
      </div>
    </Link>
  );
}
