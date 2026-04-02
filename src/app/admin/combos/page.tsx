"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { formatCurrency } from "@/lib/utils/format-currency";

interface ComboRow {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  savings: number;
  image?: string | null;
  isActive: boolean;
  servesCount: number;
}

export default function AdminCombosPage() {
  const [combos, setCombos] = useState<ComboRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCombos = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/combos");
    const data = await res.json();
    setCombos(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCombos(); }, [fetchCombos]);

  async function deleteCombo(id: string) {
    if (!confirm("Delete this combo meal?")) return;
    await fetch(`/api/admin/combos/${id}`, { method: "DELETE" });
    fetchCombos();
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Combo Meals" actionLabel="Add Combo" actionHref="/admin/combos/new" />
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 animate-pulse rounded bg-gray-100" />)}</div>
            ) : (
              <div className="overflow-hidden rounded-lg border bg-white">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Combo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Savings</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Serves</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {combos.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="flex items-center gap-3 px-4 py-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                            {c.image ? (
                              <Image src={c.image} alt={c.name} fill className="object-cover" sizes="40px" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-amber-50 text-lg">🍱</div>
                            )}
                          </div>
                          <span className="text-sm font-medium">{c.name}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(c.price)}</td>
                        <td className="px-4 py-3 text-sm text-green-600">Save {formatCurrency(c.savings)}</td>
                        <td className="px-4 py-3 text-sm">{c.servesCount}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded px-2 py-1 text-xs ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {c.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Link href={`/admin/combos/${c.id}/edit`} className="text-sm text-amber-600 hover:underline">Edit</Link>
                          <button onClick={() => deleteCombo(c.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                        </td>
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
