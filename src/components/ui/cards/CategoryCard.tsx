import Link from "next/link";
import Image from "next/image";
import type { CategoryPublic } from "@/types/category";

interface CategoryCardProps {
  category: CategoryPublic;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/menu?category=${category.slug}`}
      className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
        {category.image ? (
          <Image src={category.image} alt={category.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-50 text-2xl">🍽️</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">{category.name}</h3>
        <p className="text-sm text-gray-500">{category.itemCount} items</p>
      </div>
      <span className="text-gray-300 group-hover:text-amber-500 transition-colors">→</span>
    </Link>
  );
}
