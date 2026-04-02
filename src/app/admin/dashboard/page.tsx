"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminStatCard } from "@/components/admin/cards/AdminStatCard";
import { AdminInfoCard } from "@/components/admin/cards/AdminInfoCard";
import { AdminQuickActions } from "@/components/admin/navigation/AdminQuickActions";
import { adminSpacing } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";

export default function DashboardPage() {
  const [stats, setStats] = useState<{ totalOrders: number; totalRevenue: number; totalBookings: number; totalCustomers: number } | null>(null);
  const [recent, setRecent] = useState<{ recentOrders: Array<{ id: string; orderNumber: string; total: number; status: string }>; recentBookings: Array<{ id: string; name: string; date: string; status: string }> }>({ recentOrders: [], recentBookings: [] });

  useEffect(() => {
    fetch("/api/admin/dashboard/stats").then((r) => r.json()).then((d) => setStats(d.data)).catch(() => {});
    fetch("/api/admin/dashboard/recent").then((r) => r.json()).then((d) => setRecent(d.data)).catch(() => {});
  }, []);

  const statCards = stats
    ? [
        { label: "Total Orders", value: stats.totalOrders, icon: "📦" },
        { label: "Revenue", value: `£${(stats.totalRevenue / 100).toFixed(2)}`, icon: "💰" },
        { label: "Bookings", value: stats.totalBookings, icon: "📅" },
        { label: "Customers", value: stats.totalCustomers, icon: "👥" },
      ]
    : [];

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.dashboard.title} description={adminHeadings.dashboard.description} />

        {/* Stats Grid */}
        {!stats ? (
          <AdminLoadingState rows={1} height="5rem" />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))", gap: adminSpacing.grid }}>
            {statCards.map((s) => (
              <AdminStatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div style={{ marginTop: adminSpacing.stack }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>Quick Actions</h2>
          <AdminQuickActions />
        </div>

        {/* Recent Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: adminSpacing.grid, marginTop: adminSpacing.stack }} className="admin-dashboard-grid">
          <AdminInfoCard title="Recent Orders">
            {recent.recentOrders.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>No recent orders</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {recent.recentOrders.slice(0, 5).map((o) => (
                  <div key={o.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                    <span style={{ color: "#374151" }}>#{o.orderNumber}</span>
                    <span style={{ color: "#6B7280" }}>£{(Number(o.total) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </AdminInfoCard>

          <AdminInfoCard title="Recent Bookings">
            {recent.recentBookings.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>No recent bookings</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {recent.recentBookings.slice(0, 5).map((b) => (
                  <div key={b.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                    <span style={{ color: "#374151" }}>{b.name}</span>
                    <span style={{ color: "#6B7280" }}>{b.date}</span>
                  </div>
                ))}
              </div>
            )}
          </AdminInfoCard>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .admin-dashboard-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </AdminPageShell>
    </AdminShell>
  );
}
