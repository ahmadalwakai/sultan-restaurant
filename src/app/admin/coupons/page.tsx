"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminStatusBadge } from "@/components/admin/tables";
import { adminTableStyles } from "@/lib/admin-ui";
import { adminHeadings, adminActions } from "@/lib/admin-content";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Array<{ id: string; code: string; discountType: string; discountValue: number; isActive: boolean; usageCount: number }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/coupons");
    const data = await res.json();
    setCoupons(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  async function toggleCoupon(id: string) {
    await fetch(`/api/admin/coupons/${id}/toggle`, { method: "PATCH" });
    fetchCoupons();
  }

  async function deleteCoupon(id: string) {
    if (!confirm("Delete this coupon?")) return;
    await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
    fetchCoupons();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.coupons.title} description={adminHeadings.coupons.description} actionLabel={adminActions.addCoupon} actionHref="/admin/coupons/new" />

        {loading ? (
          <AdminLoadingState rows={3} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Code</th>
                  <th style={adminTableStyles.headCell}>Discount</th>
                  <th style={adminTableStyles.headCell}>Used</th>
                  <th style={adminTableStyles.headCell}>Status</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ ...adminTableStyles.cell, fontWeight: 500, fontFamily: "monospace" }}>{c.code}</td>
                    <td style={adminTableStyles.cell}>{c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `£${Number(c.discountValue).toFixed(2)}`}</td>
                    <td style={adminTableStyles.cell}>{c.usageCount}</td>
                    <td style={adminTableStyles.cell}>
                      <button onClick={() => toggleCoupon(c.id)} style={{ border: "none", cursor: "pointer", background: "none", padding: 0 }}>
                        <AdminStatusBadge status={c.isActive ? "Active" : "Inactive"} />
                      </button>
                    </td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <span style={{ display: "inline-flex", gap: "0.75rem" }}>
                        <Link href={`/admin/coupons/${c.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                        <button onClick={() => deleteCoupon(c.id)} style={{ fontSize: "0.875rem", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>{adminActions.delete}</button>
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
