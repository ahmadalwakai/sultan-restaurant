"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminLoadingState } from "@/components/admin/shared";
import { adminSpacing } from "@/lib/admin-ui";

export default function AdminCustomerDetailPage() {
  const params = useParams();
  const [customer, setCustomer] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/customers/${params.id}`).then((r) => r.json()).then((d) => setCustomer(d.data));
  }, [params.id]);

  if (!customer) return <AdminShell><AdminPageShell><AdminLoadingState rows={4} height="2.5rem" /></AdminPageShell></AdminShell>;

  const cardStyle = { background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card } as const;
  const labelStyle = { color: "#6B7280", fontSize: "0.875rem" } as const;

  return (
    <AdminShell>
      <AdminPageShell>
        <Link href="/admin/customers" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>&larr; Back to Customers</Link>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginTop: "0.5rem", marginBottom: adminSpacing.stack }}>{customer.name as string ?? "Customer"}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: adminSpacing.grid, maxWidth: "56rem" }}>
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Details</h2>
            <p style={{ fontSize: "0.875rem" }}><span style={labelStyle}>Email:</span> {customer.email as string}</p>
            <p style={{ fontSize: "0.875rem" }}><span style={labelStyle}>Phone:</span> {(customer.phone as string) ?? "-"}</p>
            <p style={{ fontSize: "0.875rem" }}><span style={labelStyle}>Joined:</span> {new Date(customer.createdAt as string).toLocaleDateString()}</p>
          </div>
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Recent Orders</h2>
            {(customer.orders as Array<{ id: string; orderNumber: string; total: number; status: string }>)?.length ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(customer.orders as Array<{ id: string; orderNumber: string; total: number; status: string }>).map((o) => (
                  <Link key={o.id} href={`/admin/orders/${o.id}`} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", padding: "0.5rem", borderRadius: "0.375rem", textDecoration: "none", color: "inherit" }}>
                    <span>#{o.orderNumber}</span>
                    <span>£{Number(o.total).toFixed(2)}</span>
                  </Link>
                ))}
              </div>
            ) : <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>No orders</p>}
          </div>
        </div>
      </AdminPageShell>
    </AdminShell>
  );
}
