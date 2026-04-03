"use client";

import { AdminActionCard } from "@/components/admin/cards/AdminActionCard";
import { SimpleGrid } from "@chakra-ui/react";

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
    <SimpleGrid columns={{ base: 2, sm: 3, lg: 6 }} gap={5}>
      {actions.map((a) => (
        <AdminActionCard key={a.href} icon={a.icon} title={a.title} href={a.href} />
      ))}
    </SimpleGrid>
  );
}
