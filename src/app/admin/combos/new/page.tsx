"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminFormStyles, adminSpacing, adminLayout } from "@/lib/admin-ui";

export default function AdminCombosNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", servesCount: "2", isActive: true });
  const [items, setItems] = useState<{ menuItemId: string; quantity: number }[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/combos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        servesCount: parseInt(form.servesCount, 10),
        items,
      }),
    });

    if (res.ok) {
      router.push("/admin/combos");
    }
    setLoading(false);
  }

  function addItem() {
    setItems([...items, { menuItemId: "", quantity: 1 }]);
  }

  function updateItem(index: number, field: string, value: string | number) {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  const inputProps = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    Object.assign(e.currentTarget.style, adminFormStyles.inputFocus);
  };
  const blurProps = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#D1D5DB";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Add Combo Meal" description="Create a new combo meal deal" />
        <form onSubmit={handleSubmit} style={{ maxWidth: "42rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
          <div>
            <label style={adminFormStyles.label}>Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={adminFormStyles.input} onFocus={inputProps} onBlur={blurProps} />
          </div>
          <div>
            <label style={adminFormStyles.label}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={adminFormStyles.textarea} onFocus={inputProps} onBlur={blurProps} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={adminFormStyles.label}>Price (£)</label>
              <input type="number" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={adminFormStyles.input} onFocus={inputProps} onBlur={blurProps} />
            </div>
            <div>
              <label style={adminFormStyles.label}>Serves</label>
              <input type="number" min="1" value={form.servesCount} onChange={(e) => setForm({ ...form, servesCount: e.target.value })} style={adminFormStyles.input} onFocus={inputProps} onBlur={blurProps} />
            </div>
          </div>
          <div>
            <label style={adminFormStyles.label}>Image URL</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={adminFormStyles.input} onFocus={inputProps} onBlur={blurProps} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <label style={adminFormStyles.label}>Combo Items</label>
              <button type="button" onClick={addItem} style={{ fontSize: "0.875rem", color: "#D97706", background: "none", border: "none", cursor: "pointer" }}>+ Add Item</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input type="text" placeholder="Menu Item ID" value={item.menuItemId} onChange={(e) => updateItem(i, "menuItemId", e.target.value)} style={{ ...adminFormStyles.input, flex: 1 }} onFocus={inputProps} onBlur={blurProps} />
                  <input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value, 10))} style={{ ...adminFormStyles.input, width: "5rem" }} onFocus={inputProps} onBlur={blurProps} />
                  <button type="button" onClick={() => removeItem(i)} style={{ color: "#EF4444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            <label htmlFor="isActive" style={{ fontSize: "0.875rem", color: "#374151" }}>Active</label>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem" }}>
            <button type="submit" disabled={loading} style={{ ...adminLayout.primaryBtn, padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, opacity: loading ? 0.5 : 1 }}>
              {loading ? "Saving..." : "Create Combo"}
            </button>
            <button type="button" onClick={() => router.back()} style={{ ...adminLayout.ghostBtn, padding: "0.5rem 1.5rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem" }}>
              Cancel
            </button>
          </div>
        </form>
      </AdminPageShell>
    </AdminShell>
  );
}
