"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableSearch, AdminTableFilters, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { VStack, Badge } from "@chakra-ui/react";
import { adminHeadings } from "@/lib/admin-content";

const ORDER_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Ready", value: "READY" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const ORDER_SOURCES = [
  { label: "All Sources", value: "" },
  { label: "Online", value: "ONLINE" },
  { label: "Table Scan", value: "TABLE_SCAN" },
];

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
  tableNumber?: number | null;
  menuType?: string | null;
  orderSource?: string | null;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (source) params.set("orderSource", source);
    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, search, status, source]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const formatTableInfo = (order: Order) => {
    if (!order.tableNumber) return null;
    const menuLabel = order.menuType === "SHISHA" ? "S" : "R";
    return `T${order.tableNumber} (${menuLabel})`;
  };

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={0} align="stretch">
          <AdminSectionTitle title={adminHeadings.orders.title} description={adminHeadings.orders.description} />

          <AdminTableToolbar>
            <AdminTableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search orders..." />
            <AdminTableFilters value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={ORDER_STATUSES} label="Status" />
            <AdminTableFilters value={source} onChange={(v) => { setSource(v); setPage(1); }} options={ORDER_SOURCES} label="Source" />
          </AdminTableToolbar>

          {loading ? (
            <AdminLoadingState rows={5} height="3.5rem" />
          ) : (
            <AdminTableShell>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Order #</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Customer</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Table</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Total</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Source</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Date</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 500 }}>#{order.orderNumber}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{order.customerName}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>
                        {formatTableInfo(order) ? (
                          <Badge colorPalette={order.menuType === "SHISHA" ? "purple" : "blue"} size="sm">
                            {formatTableInfo(order)}
                          </Badge>
                        ) : (
                          <span style={{ color: "#9CA3AF" }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>£{Number(order.total).toFixed(2)}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>
                        <Badge colorPalette={order.orderSource === "TABLE_SCAN" ? "green" : "gray"} size="sm">
                          {order.orderSource === "TABLE_SCAN" ? "Scan" : "Online"}
                        </Badge>
                      </td>
                      <td style={{ padding: "0.75rem 1rem" }}><AdminStatusBadge status={order.status} /></td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#6B7280" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <Link href={`/admin/orders/${order.id}`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AdminTableShell>
          )}

          <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
