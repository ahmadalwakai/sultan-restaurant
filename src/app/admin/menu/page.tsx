"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableSearch, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { adminTableStyles } from "@/lib/admin-ui";
import { adminHeadings, adminActions } from "@/lib/admin-content";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category?: { name: string };
  image?: string | null;
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/menu?${params}`);
    const data = await res.json();
    setItems(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function toggleAvailability(id: string) {
    await fetch(`/api/admin/menu/${id}/toggle`, { method: "PATCH" });
    fetchItems();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.menu.title} description={adminHeadings.menu.description} actionLabel={adminActions.addItem} actionHref="/admin/menu/new" />

        <AdminTableToolbar>
          <AdminTableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search menu items..." />
        </AdminTableToolbar>

        {loading ? (
          <AdminLoadingState rows={5} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Item</th>
                  <th style={adminTableStyles.headCell}>Category</th>
                  <th style={adminTableStyles.headCell}>Price</th>
                  <th style={adminTableStyles.headCell}>Status</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ ...adminTableStyles.cell, fontWeight: 500 }}>{item.name}</td>
                    <td style={{ ...adminTableStyles.cell, color: "#6B7280" }}>{item.category?.name ?? "-"}</td>
                    <td style={adminTableStyles.cell}>£{(item.price / 100).toFixed(2)}</td>
                    <td style={adminTableStyles.cell}>
                      <button onClick={() => toggleAvailability(item.id)} style={{ border: "none", cursor: "pointer", background: "none", padding: 0 }}>
                        <AdminStatusBadge status={item.isAvailable ? "Available" : "Unavailable"} />
                      </button>
                    </td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <span style={{ display: "inline-flex", gap: "0.75rem" }}>
                        <Link href={`/admin/menu/${item.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                        <button onClick={() => deleteItem(item.id)} style={{ fontSize: "0.875rem", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>{adminActions.delete}</button>
                      </span>
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
