"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableSearch, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { VStack, HStack, Button } from "@chakra-ui/react";
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
        <VStack gap={0} align="stretch">
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
                  <tr style={{ background: "#F9FAFB" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Item</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Category</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Price</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} style={{ borderTop: "1px solid #F3F4F6", cursor: "pointer" }}>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 500 }}>{item.name}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#6B7280" }}>{item.category?.name ?? "-"}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>£{(item.price / 100).toFixed(2)}</td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <Button size="xs" variant="plain" p={0} onClick={() => toggleAvailability(item.id)}>
                          <AdminStatusBadge status={item.isAvailable ? "Available" : "Unavailable"} />
                        </Button>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <HStack gap={3} justify="flex-end">
                          <Link href={`/admin/menu/${item.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                          <Button size="xs" variant="plain" color="red.600" onClick={() => deleteItem(item.id)}>{adminActions.delete}</Button>
                        </HStack>
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
