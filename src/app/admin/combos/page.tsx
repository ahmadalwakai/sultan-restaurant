"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminStatusBadge } from "@/components/admin/tables";
import { adminTableStyles } from "@/lib/admin-ui";
import { adminActions } from "@/lib/admin-content";
import { formatCurrency } from "@/lib/utils/format-currency";

interface ComboRow {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  savings: number;
  image?: string | null;
  isActive: boolean;
  servesCount: number;
}

export default function AdminCombosPage() {
  const [combos, setCombos] = useState<ComboRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCombos = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/combos");
    const data = await res.json();
    setCombos(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCombos(); }, [fetchCombos]);

  async function deleteCombo(id: string) {
    if (!confirm("Delete this combo meal?")) return;
    await fetch(`/api/admin/combos/${id}`, { method: "DELETE" });
    fetchCombos();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Combo Meals" description="Manage combo meal deals" actionLabel="Add Combo" actionHref="/admin/combos/new" />

        {loading ? (
          <AdminLoadingState rows={3} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Combo</th>
                  <th style={adminTableStyles.headCell}>Price</th>
                  <th style={adminTableStyles.headCell}>Savings</th>
                  <th style={adminTableStyles.headCell}>Serves</th>
                  <th style={adminTableStyles.headCell}>Status</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {combos.map((c) => (
                  <tr key={c.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={adminTableStyles.cell}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ position: "relative", width: "2.5rem", height: "2.5rem", flexShrink: 0, borderRadius: "0.5rem", overflow: "hidden" }}>
                          {c.image ? (
                            <Image src={c.image} alt={c.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FEF3C7", fontSize: "1.125rem" }}>🍱</div>
                          )}
                        </div>
                        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={adminTableStyles.cell}>{formatCurrency(c.price)}</td>
                    <td style={{ ...adminTableStyles.cell, color: "#059669" }}>Save {formatCurrency(c.savings)}</td>
                    <td style={adminTableStyles.cell}>{c.servesCount}</td>
                    <td style={adminTableStyles.cell}><AdminStatusBadge status={c.isActive ? "Active" : "Inactive"} /></td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <span style={{ display: "inline-flex", gap: "0.75rem" }}>
                        <Link href={`/admin/combos/${c.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                        <button onClick={() => deleteCombo(c.id)} style={{ fontSize: "0.875rem", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>{adminActions.delete}</button>
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
