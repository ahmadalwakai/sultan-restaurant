"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { formatCurrency } from "@/lib/utils/format-currency";

interface DishOfDayRow {
  id: string;
  date: string;
  discountPrice: number;
  reason: string | null;
  menuItem: { id: string; name: string; price: number; image?: string | null };
}

export default function AdminDishOfDayPage() {
  const [items, setItems] = useState<DishOfDayRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ menuItemId: "", discountPrice: "", reason: "", date: new Date().toISOString().split("T")[0] });
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/dish-of-day");
    const data = await res.json();
    setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/dish-of-day", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        discountPrice: parseFloat(form.discountPrice),
      }),
    });
    setSaving(false);
    setShowForm(false);
    setForm({ menuItemId: "", discountPrice: "", reason: "", date: new Date().toISOString().split("T")[0] });
    fetchItems();
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader
              title="Dish of the Day"
              actionLabel={showForm ? "Cancel" : "Set Dish of the Day"}
              onAction={() => setShowForm(!showForm)}
            />

            {showForm && (
              <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Menu Item ID</label>
                    <input
                      type="text"
                      required
                      value={form.menuItemId}
                      onChange={(e) => setForm({ ...form, menuItemId: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Discount Price (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={form.discountPrice}
                      onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Reason (optional)</label>
                    <input
                      type="text"
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="e.g. Chef's special"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-amber-500 px-6 py-2 font-medium text-white hover:bg-amber-600 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Set Dish of the Day"}
                </button>
              </form>
            )}

            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 animate-pulse rounded bg-gray-100" />)}</div>
            ) : (
              <div className="overflow-hidden rounded-lg border bg-white">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Dish</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Original Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Discount Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          {new Date(d.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                        </td>
                        <td className="flex items-center gap-3 px-4 py-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                            {d.menuItem.image ? (
                              <Image src={d.menuItem.image} alt={d.menuItem.name} fill className="object-cover" sizes="40px" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-amber-50 text-lg">🍛</div>
                            )}
                          </div>
                          <span className="text-sm font-medium">{d.menuItem.name}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400 line-through">{formatCurrency(d.menuItem.price)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatCurrency(d.discountPrice)}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{d.reason || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
