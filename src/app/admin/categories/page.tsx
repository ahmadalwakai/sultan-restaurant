"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { adminHeadings, adminActions } from "@/lib/admin-content";

interface Category {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  _count?: { menuItems: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category? All items in it will be unlinked.")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={0} align="stretch">
          <AdminSectionTitle title={adminHeadings.categories.title} description={adminHeadings.categories.description} actionLabel={adminActions.addCategory} actionHref="/admin/categories/new" />

          {loading ? (
            <AdminLoadingState rows={4} height="3.5rem" />
          ) : (
            <AdminTableShell>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Name</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Slug</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Items</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Order</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 500 }}>{cat.name}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#6B7280" }}>{cat.slug}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{cat._count?.menuItems ?? 0}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{cat.sortOrder}</td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <HStack gap={3} justify="flex-end">
                          <Link href={`/admin/categories/${cat.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                          <Button size="xs" variant="plain" color="red.600" onClick={() => deleteCategory(cat.id)}>{adminActions.delete}</Button>
                        </HStack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AdminTableShell>
          )}
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
