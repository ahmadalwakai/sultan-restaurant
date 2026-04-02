"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category?: { name: string };
}

interface MenuItemsTableProps {
  items: MenuItem[];
  isLoading?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MenuItemsTable({ items, isLoading, onToggle, onDelete }: MenuItemsTableProps) {
  return (
    <AdminTable
      data={items}
      keyExtractor={(item) => item.id}
      isLoading={isLoading}
      columns={[
        { key: "name", header: "Name", render: (item) => <span className="font-medium">{item.name}</span> },
        { key: "category", header: "Category", render: (item) => item.category?.name ?? "-" },
        { key: "price", header: "Price", render: (item) => `£${(item.price / 100).toFixed(2)}` },
        {
          key: "status",
          header: "Status",
          render: (item) => (
            <button onClick={() => onToggle(item.id)} className={`text-xs px-2 py-1 rounded ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {item.isAvailable ? "Available" : "Unavailable"}
            </button>
          ),
        },
        {
          key: "actions",
          header: "Actions",
          className: "text-right",
          render: (item) => (
            <div className="space-x-2">
              <Link href={`/admin/menu/${item.id}/edit`} className="text-sm text-amber-600 hover:underline">Edit</Link>
              <button onClick={() => onDelete(item.id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          ),
        },
      ]}
    />
  );
}
