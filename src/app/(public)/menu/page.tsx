"use client";

import { useSearchParams } from "next/navigation";
import { useMenuFilters } from "@/hooks";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const { filters, queryParams, setSearch, setCategory } = useMenuFilters();

  if (!filters.categoryId && initialCategory) {
    setCategory(initialCategory);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Our Menu"
            subtitle="Explore our authentic dishes"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryTabs
            activeCategory={filters.categoryId}
            onSelect={setCategory}
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes..."
            className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-amber-500 sm:w-64"
          />
        </div>
        <MenuGrid params={queryParams} />
      </div>
    </div>
  );
}
