"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

export default function AdminCombosNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", servesCount: "2", isActive: true });
  const [items, setItems] = useState<{ menuItemId: string; quantity: number }[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/combos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        servesCount: parseInt(form.servesCount, 10),
        items,
      }),
    });

    if (res.ok) {
      router.push("/admin/combos");
    }
    setLoading(false);
  }

  function addItem() {
    setItems([...items, { menuItemId: "", quantity: 1 }]);
  }

  function updateItem(index: number, field: string, value: string | number) {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Add Combo Meal" />
            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Price (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Serves</label>
                  <input
                    type="number"
                    min="1"
                    value={form.servesCount}
                    onChange={(e) => setForm({ ...form, servesCount: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Combo Items</label>
                  <button type="button" onClick={addItem} className="text-sm text-amber-600 hover:underline">+ Add Item</button>
                </div>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Menu Item ID"
                        value={item.menuItemId}
                        onChange={(e) => updateItem(i, "menuItemId", e.target.value)}
                        className="flex-1 rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value, 10))}
                        className="w-20 rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
                      />
                      <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-amber-500 px-6 py-2 font-medium text-white hover:bg-amber-600 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Create Combo"}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-lg border px-6 py-2 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
