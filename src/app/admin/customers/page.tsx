"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Array<{ id: string; name: string | null; email: string; createdAt: string; _count?: { orders: number; bookings: number } }>>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/customers?${params}`);
    const data = await res.json();
    setCustomers(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Customers" />
            <div className="mb-4">
              <AdminSearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search customers..." />
            </div>
            {loading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-sm">{c.name ?? "-"}</td>
                        <td className="px-4 py-3 text-sm">{c.email}</td>
                        <td className="px-4 py-3 text-sm">{c._count?.orders ?? 0}</td>
                        <td className="px-4 py-3 text-sm">{c._count?.bookings ?? 0}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-right">
                          <Link href={`/admin/customers/${c.id}`} className="text-sm text-amber-600 hover:underline">View</Link>
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
