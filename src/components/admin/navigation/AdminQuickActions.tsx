"use client";

import { AdminActionCard } from "@/components/admin/cards/AdminActionCard";
import { adminSpacing } from "@/lib/admin-ui";

/** Dashboard quick-action grid */
export function AdminQuickActions() {
  const actions = [
    { icon: "➕", title: "Add Menu Item", href: "/admin/menu/new" },
    { icon: "📦", title: "View Orders", href: "/admin/orders" },
    { icon: "📅", title: "View Bookings", href: "/admin/bookings" },
    { icon: "🎁", title: "Create Offer", href: "/admin/offers/new" },
    { icon: "⚙️", title: "Settings", href: "/admin/settings" },
    { icon: "📊", title: "Monitoring", href: "/admin/monitoring" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
        gap: adminSpacing.grid,
      }}
    >
      {actions.map((a) => (
        <AdminActionCard key={a.href} icon={a.icon} title={a.title} href={a.href} />
      ))}
    </div>
  );
}
