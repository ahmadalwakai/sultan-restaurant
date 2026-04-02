"use client";

import { useCategories } from "@/hooks/api";
import { cn } from "@/lib/utils/cn";

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (slug: string) => void;
}

export function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
  const { data: categories } = useCategories();

  return (
    <div className="overflow-x-auto border-b">
      <div className="flex gap-1 px-1 py-2">
        <button
          onClick={() => onSelect("")}
          className={cn(
            "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            !activeCategory
              ? "bg-amber-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          All
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat.slug
                ? "bg-amber-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
