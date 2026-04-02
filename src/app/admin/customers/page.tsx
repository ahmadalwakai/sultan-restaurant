"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableSearch, AdminTablePagination } from "@/components/admin/tables";
import { adminTableStyles } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";

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
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.customers.title} description={adminHeadings.customers.description} />

        <AdminTableToolbar>
          <AdminTableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search customers..." />
        </AdminTableToolbar>

        {loading ? (
          <AdminLoadingState rows={5} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Name</th>
                  <th style={adminTableStyles.headCell}>Email</th>
                  <th style={adminTableStyles.headCell}>Orders</th>
                  <th style={adminTableStyles.headCell}>Bookings</th>
                  <th style={adminTableStyles.headCell}>Joined</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ ...adminTableStyles.cell, fontWeight: 500 }}>{c.name ?? "-"}</td>
                    <td style={adminTableStyles.cell}>{c.email}</td>
                    <td style={adminTableStyles.cell}>{c._count?.orders ?? 0}</td>
                    <td style={adminTableStyles.cell}>{c._count?.bookings ?? 0}</td>
                    <td style={{ ...adminTableStyles.cell, color: "#6B7280" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <Link href={`/admin/customers/${c.id}`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>View</Link>
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
