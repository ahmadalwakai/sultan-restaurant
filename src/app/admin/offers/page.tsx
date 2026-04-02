"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminStatusBadge } from "@/components/admin/tables";
import { adminTableStyles } from "@/lib/admin-ui";
import { adminHeadings, adminActions } from "@/lib/admin-content";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Array<{ id: string; title: string; discountType: string; discountValue: number; isActive: boolean }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/offers");
    const data = await res.json();
    setOffers(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOffers(); }, [fetchOffers]);

  async function toggleOffer(id: string) {
    await fetch(`/api/admin/offers/${id}/toggle`, { method: "PATCH" });
    fetchOffers();
  }

  async function deleteOffer(id: string) {
    if (!confirm("Delete this offer?")) return;
    await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
    fetchOffers();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.offers.title} description={adminHeadings.offers.description} actionLabel={adminActions.addOffer} actionHref="/admin/offers/new" />

        {loading ? (
          <AdminLoadingState rows={3} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Title</th>
                  <th style={adminTableStyles.headCell}>Discount</th>
                  <th style={adminTableStyles.headCell}>Status</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((o) => (
                  <tr key={o.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ ...adminTableStyles.cell, fontWeight: 500 }}>{o.title}</td>
                    <td style={adminTableStyles.cell}>{o.discountType === "PERCENTAGE" ? `${o.discountValue}%` : `£${(o.discountValue / 100).toFixed(2)}`}</td>
                    <td style={adminTableStyles.cell}>
                      <button onClick={() => toggleOffer(o.id)} style={{ border: "none", cursor: "pointer", background: "none", padding: 0 }}>
                        <AdminStatusBadge status={o.isActive ? "Active" : "Inactive"} />
                      </button>
                    </td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <span style={{ display: "inline-flex", gap: "0.75rem" }}>
                        <Link href={`/admin/offers/${o.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                        <button onClick={() => deleteOffer(o.id)} style={{ fontSize: "0.875rem", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>{adminActions.delete}</button>
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
