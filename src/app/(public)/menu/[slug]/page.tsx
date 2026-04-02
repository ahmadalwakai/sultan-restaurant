"use client";

import { use } from "react";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import Link from "next/link";

export default function CategoryMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Link href="/menu" className="text-sm text-amber-600 hover:underline">
            &larr; Back to Menu
          </Link>
          <SectionHeader
            title={slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            subtitle=""
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <MenuGrid params={{ categorySlug: slug }} />
      </div>
    </div>
  );
}
