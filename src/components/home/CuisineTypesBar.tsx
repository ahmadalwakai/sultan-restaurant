"use client";

import { useCategories } from "@/hooks/api";
import Link from "next/link";

export function CuisineTypesBar() {
  const { data: categories } = useCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="border-b bg-white py-4">
      <div className="mx-auto max-w-[1200px] overflow-x-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.slug}`}
              className="whitespace-nowrap text-sm font-medium text-gray-600 transition-colors hover:text-amber-600"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
