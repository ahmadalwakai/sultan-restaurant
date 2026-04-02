"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Array<{ id: string; code: string; discountType: string; discountValue: number; isActive: boolean; usageCount: number }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/coupons");
    const data = await res.json();
    setCoupons(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  async function toggleCoupon(id: string) {
    await fetch(`/api/admin/coupons/${id}/toggle`, { method: "PATCH" });
    fetchCoupons();
  }

  async function deleteCoupon(id: string) {
    if (!confirm("Delete this coupon?")) return;
    await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
    fetchCoupons();
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Coupons" actionLabel="Add Coupon" actionHref="/admin/coupons/new" />
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Used</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {coupons.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono font-medium text-sm">{c.code}</td>
                        <td className="px-4 py-3 text-sm">{c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `£${(c.discountValue / 100).toFixed(2)}`}</td>
                        <td className="px-4 py-3 text-sm">{c.usageCount}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleCoupon(c.id)} className={`text-xs px-2 py-1 rounded ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {c.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Link href={`/admin/coupons/${c.id}/edit`} className="text-sm text-amber-600 hover:underline">Edit</Link>
                          <button onClick={() => deleteCoupon(c.id)} className="text-sm text-red-600 hover:underline">Delete</button>
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
