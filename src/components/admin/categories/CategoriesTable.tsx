"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Category { id: string; name: string; slug: string; sortOrder: number; _count?: { menuItems: number } }

export function CategoriesTable({ categories, isLoading, onDelete }: { categories: Category[]; isLoading?: boolean; onDelete: (id: string) => void }) {
  return (
    <AdminTable
      data={categories}
      keyExtractor={(c) => c.id}
      isLoading={isLoading}
      columns={[
        { key: "name", header: "Name", render: (c) => <span className="font-medium">{c.name}</span> },
        { key: "slug", header: "Slug", render: (c) => c.slug },
        { key: "items", header: "Items", render: (c) => c._count?.menuItems ?? 0 },
        { key: "order", header: "Order", render: (c) => c.sortOrder },
        { key: "actions", header: "Actions", className: "text-right", render: (c) => (
          <div className="space-x-2">
            <Link href={`/admin/categories/${c.id}/edit`} className="text-sm text-amber-600 hover:underline">Edit</Link>
            <button onClick={() => onDelete(c.id)} className="text-sm text-red-600 hover:underline">Delete</button>
          </div>
        )},
      ]}
    />
  );
}
