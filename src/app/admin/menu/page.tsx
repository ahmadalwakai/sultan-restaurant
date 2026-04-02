"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category?: { name: string };
  image?: string | null;
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/menu?${params}`);
    const data = await res.json();
    setItems(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function toggleAvailability(id: string) {
    await fetch(`/api/admin/menu/${id}/toggle`, { method: "PATCH" });
    fetchItems();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Menu Items" actionLabel="Add Item" actionHref="/admin/menu/new" />
            <div className="mb-4">
              <AdminSearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search menu items..." />
            </div>
            {loading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-sm">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{item.category?.name ?? "-"}</td>
                        <td className="px-4 py-3 text-sm">£{(item.price / 100).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleAvailability(item.id)} className={`text-xs px-2 py-1 rounded ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {item.isAvailable ? "Available" : "Unavailable"}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Link href={`/admin/menu/${item.id}/edit`} className="text-sm text-amber-600 hover:underline">Edit</Link>
                          <button onClick={() => deleteItem(item.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
