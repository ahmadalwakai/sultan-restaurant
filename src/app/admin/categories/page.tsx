"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { adminTableStyles } from "@/lib/admin-ui";
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
        <AdminSectionTitle title={adminHeadings.categories.title} description={adminHeadings.categories.description} actionLabel={adminActions.addCategory} actionHref="/admin/categories/new" />

        {loading ? (
          <AdminLoadingState rows={4} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Name</th>
                  <th style={adminTableStyles.headCell}>Slug</th>
                  <th style={adminTableStyles.headCell}>Items</th>
                  <th style={adminTableStyles.headCell}>Order</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ ...adminTableStyles.cell, fontWeight: 500 }}>{cat.name}</td>
                    <td style={{ ...adminTableStyles.cell, color: "#6B7280" }}>{cat.slug}</td>
                    <td style={adminTableStyles.cell}>{cat._count?.menuItems ?? 0}</td>
                    <td style={adminTableStyles.cell}>{cat.sortOrder}</td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <span style={{ display: "inline-flex", gap: "0.75rem" }}>
                        <Link href={`/admin/categories/${cat.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                        <button onClick={() => deleteCategory(cat.id)} style={{ fontSize: "0.875rem", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>{adminActions.delete}</button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        )}
      </AdminPageShell>
    </AdminShell>
  );
}
