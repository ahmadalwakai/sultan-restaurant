"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Array<{ id: string; title: string; discountType: string; discountValue: number; isActive: boolean }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/offers");
    const data = await res.json();
    setOffers(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOffers(); }, [fetchOffers]);

  async function toggleOffer(id: string) {
    await fetch(`/api/admin/offers/${id}/toggle`, { method: "PATCH" });
    fetchOffers();
  }

  async function deleteOffer(id: string) {
    if (!confirm("Delete this offer?")) return;
    await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
    fetchOffers();
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Offers" actionLabel="Add Offer" actionHref="/admin/offers/new" />
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {offers.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-sm">{o.title}</td>
                        <td className="px-4 py-3 text-sm">{o.discountType === "PERCENTAGE" ? `${o.discountValue}%` : `£${(o.discountValue / 100).toFixed(2)}`}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleOffer(o.id)} className={`text-xs px-2 py-1 rounded ${o.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {o.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Link href={`/admin/offers/${o.id}/edit`} className="text-sm text-amber-600 hover:underline">Edit</Link>
                          <button onClick={() => deleteOffer(o.id)} className="text-sm text-red-600 hover:underline">Delete</button>
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
