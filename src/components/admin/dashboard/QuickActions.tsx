"use client";

import Link from "next/link";

const actions = [
  { label: "Add Menu Item", href: "/admin/menu/new", icon: "🍽️" },
  { label: "View Orders", href: "/admin/orders", icon: "📦" },
  { label: "Manage Bookings", href: "/admin/bookings", icon: "📅" },
  { label: "Site Settings", href: "/admin/settings", icon: "⚙️" },
];

export function QuickActions() {
  return (
    <div className="bg-white border rounded-lg p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-center gap-2 p-3 rounded-lg border hover:bg-amber-50 hover:border-amber-200 transition-colors"
          >
            <span className="text-xl">{a.icon}</span>
            <span className="text-sm font-medium">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
