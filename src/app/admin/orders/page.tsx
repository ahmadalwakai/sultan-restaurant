"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { AdminStatusFilter } from "@/components/admin/shared/AdminStatusFilter";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { AdminFilterBar } from "@/components/admin/shared/AdminFilterBar";
import { AdminExportButton } from "@/components/admin/shared/AdminExportButton";

const ORDER_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Ready", value: "READY" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Array<{ id: string; orderNumber: string; customerName: string; total: number; status: string; createdAt: string }>>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, search, status]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Orders" />
            <AdminFilterBar>
              <AdminSearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search orders..." />
              <AdminStatusFilter value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={ORDER_STATUSES} />
              <AdminExportButton href="/api/admin/orders/export" />
            </AdminFilterBar>
            {loading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-sm">#{order.orderNumber}</td>
                        <td className="px-4 py-3 text-sm">{order.customerName}</td>
                        <td className="px-4 py-3 text-sm">£{(Number(order.total) / 100).toFixed(2)}</td>
                        <td className="px-4 py-3"><span className="text-xs px-2 py-1 rounded bg-gray-100">{order.status}</span></td>
                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-right">
                          <Link href={`/admin/orders/${order.id}`} className="text-sm text-amber-600 hover:underline">View</Link>
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
