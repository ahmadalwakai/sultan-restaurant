"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableSearch, AdminTableFilters, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { adminTableStyles } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";

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
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.orders.title} description={adminHeadings.orders.description} />

        <AdminTableToolbar>
          <AdminTableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search orders..." />
          <AdminTableFilters value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={ORDER_STATUSES} label="Status" />
        </AdminTableToolbar>

        {loading ? (
          <AdminLoadingState rows={5} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Order #</th>
                  <th style={adminTableStyles.headCell}>Customer</th>
                  <th style={adminTableStyles.headCell}>Total</th>
                  <th style={adminTableStyles.headCell}>Status</th>
                  <th style={adminTableStyles.headCell}>Date</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ ...adminTableStyles.cell, fontWeight: 500 }}>#{order.orderNumber}</td>
                    <td style={adminTableStyles.cell}>{order.customerName}</td>
                    <td style={adminTableStyles.cell}>£{(Number(order.total) / 100).toFixed(2)}</td>
                    <td style={adminTableStyles.cell}><AdminStatusBadge status={order.status} /></td>
                    <td style={{ ...adminTableStyles.cell, color: "#6B7280" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <Link href={`/admin/orders/${order.id}`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        )}

        <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </AdminPageShell>
    </AdminShell>
  );
}
