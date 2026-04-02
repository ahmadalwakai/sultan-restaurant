"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminLoadingState } from "@/components/admin/shared";
import { adminFormStyles, adminSpacing, adminLayout } from "@/lib/admin-ui";

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/orders/${params.id}`).then((r) => r.json()).then((d) => setOrder(d.data));
  }, [params.id]);

  async function updateStatus(status: string) {
    await fetch(`/api/admin/orders/${params.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrder((prev) => prev ? { ...prev, status } : prev);
  }

  async function handleRefund() {
    if (!confirm("Are you sure you want to refund this order?")) return;
    await fetch(`/api/admin/orders/${params.id}/refund`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
    router.refresh();
  }

  if (!order) return <AdminShell><AdminPageShell><AdminLoadingState rows={5} height="3rem" /></AdminPageShell></AdminShell>;

  return (
    <AdminShell>
      <AdminPageShell>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: adminSpacing.stack }}>
          <div>
            <Link href="/admin/orders" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>&larr; Back to Orders</Link>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginTop: "0.25rem" }}>Order #{order.orderNumber as string}</h1>
          </div>
          <button onClick={handleRefund} style={{ ...adminLayout.dangerBtn, padding: "0.5rem 1rem", fontSize: "0.875rem", border: "1px solid #FCA5A5", borderRadius: "0.5rem", cursor: "pointer" }}>Refund</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: adminSpacing.grid }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
            <h2 style={{ fontWeight: 600, marginBottom: "1rem" }}>Items</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {(order.items as Array<{ id: string; menuItem: { name: string }; quantity: number; price: number }>)?.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span>{item.menuItem.name} x{item.quantity}</span>
                  <span>£{(Number(item.price) * item.quantity / 100).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ paddingTop: "0.75rem", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                <span>Total</span>
                <span>£{(Number(order.total) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
              <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Status</h2>
              <select value={order.status as string} onChange={(e) => updateStatus(e.target.value)} style={adminFormStyles.select}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
              <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Customer</h2>
              <p style={{ fontSize: "0.875rem" }}>{order.customerName as string}</p>
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{order.customerPhone as string}</p>
            </div>
          </div>
        </div>
      </AdminPageShell>
    </AdminShell>
  );
}
