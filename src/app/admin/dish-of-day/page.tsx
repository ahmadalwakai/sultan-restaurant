"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { adminTableStyles, adminFormStyles, adminLayout, adminSpacing } from "@/lib/admin-ui";
import { formatCurrency } from "@/lib/utils/format-currency";

interface DishOfDayRow {
  id: string;
  date: string;
  discountPrice: number;
  reason: string | null;
  menuItem: { id: string; name: string; price: number; image?: string | null };
}

export default function AdminDishOfDayPage() {
  const [items, setItems] = useState<DishOfDayRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ menuItemId: "", discountPrice: "", reason: "", date: new Date().toISOString().split("T")[0] });
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/dish-of-day");
    const data = await res.json();
    setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/dish-of-day", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        discountPrice: parseFloat(form.discountPrice),
      }),
    });
    setSaving(false);
    setShowForm(false);
    setForm({ menuItemId: "", discountPrice: "", reason: "", date: new Date().toISOString().split("T")[0] });
    fetchItems();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle
          title="Dish of the Day"
          description="Set daily specials with discounted pricing"
          actionLabel={showForm ? "Cancel" : "Set Dish of the Day"}
          onAction={() => setShowForm(!showForm)}
        />

        {showForm && (
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, marginBottom: adminSpacing.stack }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={adminFormStyles.label}>Menu Item ID</label>
                  <input type="text" required value={form.menuItemId} onChange={(e) => setForm({ ...form, menuItemId: e.target.value })} style={adminFormStyles.input} onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={adminFormStyles.label}>Discount Price (£)</label>
                  <input type="number" step="0.01" required value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} style={adminFormStyles.input} onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={adminFormStyles.label}>Date</label>
                  <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={adminFormStyles.input} onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={adminFormStyles.label}>Reason (optional)</label>
                  <input type="text" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} style={adminFormStyles.input} placeholder="e.g. Chef's special" onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>
              <div>
                <button type="submit" disabled={saving} style={{ ...adminLayout.primaryBtn, padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, opacity: saving ? 0.5 : 1 }}>
                  {saving ? "Saving..." : "Set Dish of the Day"}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <AdminLoadingState rows={3} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Date</th>
                  <th style={adminTableStyles.headCell}>Dish</th>
                  <th style={adminTableStyles.headCell}>Original Price</th>
                  <th style={adminTableStyles.headCell}>Discount Price</th>
                  <th style={adminTableStyles.headCell}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {items.map((d) => (
                  <tr key={d.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={adminTableStyles.cell}>
                      {new Date(d.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                    </td>
                    <td style={adminTableStyles.cell}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ position: "relative", width: "2.5rem", height: "2.5rem", flexShrink: 0, borderRadius: "0.5rem", overflow: "hidden" }}>
                          {d.menuItem.image ? (
                            <Image src={d.menuItem.image} alt={d.menuItem.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FEF3C7", fontSize: "1.125rem" }}>🍛</div>
                          )}
                        </div>
                        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{d.menuItem.name}</span>
                      </div>
                    </td>
                    <td style={{ ...adminTableStyles.cell, color: "#9CA3AF", textDecoration: "line-through" }}>{formatCurrency(d.menuItem.price)}</td>
                    <td style={{ ...adminTableStyles.cell, color: "#059669", fontWeight: 600 }}>{formatCurrency(d.discountPrice)}</td>
                    <td style={{ ...adminTableStyles.cell, color: "#6B7280" }}>{d.reason || "—"}</td>
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
