"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminStatCard } from "@/components/admin/cards/AdminStatCard";
import { AdminInfoCard } from "@/components/admin/cards/AdminInfoCard";
import { AdminQuickActions } from "@/components/admin/navigation/AdminQuickActions";
import { adminHeadings } from "@/lib/admin-content";
import { SimpleGrid, VStack, HStack, Text, Heading, Box } from "@chakra-ui/react";

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
        { label: "Revenue", value: `£${Number(stats.totalRevenue).toFixed(2)}`, icon: "💰" },
        { label: "Bookings", value: stats.totalBookings, icon: "📅" },
        { label: "Customers", value: stats.totalCustomers, icon: "👥" },
      ]
    : [];

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={8} align="stretch">
          <AdminSectionTitle title={adminHeadings.dashboard.title} description={adminHeadings.dashboard.description} />

          {/* Stats Grid */}
          {!stats ? (
            <AdminLoadingState rows={1} height="5rem" />
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={5}>
              {statCards.map((s) => (
                <AdminStatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
              ))}
            </SimpleGrid>
          )}

          {/* Quick Actions */}
          <Box>
            <Heading size="sm" color="gray.900" mb={3}>
              Quick Actions
            </Heading>
            <AdminQuickActions />
          </Box>

          {/* Recent Activity */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
            <AdminInfoCard title="Recent Orders">
              {recent.recentOrders.length === 0 ? (
                <Text fontSize="sm" color="gray.400">No recent orders</Text>
              ) : (
                <VStack gap={2} align="stretch">
                  {recent.recentOrders.slice(0, 5).map((o) => (
                    <HStack key={o.id} justify="space-between" fontSize="sm">
                      <Text color="gray.700">#{o.orderNumber}</Text>
                      <Text color="gray.500">£{Number(o.total).toFixed(2)}</Text>
                    </HStack>
                  ))}
                </VStack>
              )}
            </AdminInfoCard>

            <AdminInfoCard title="Recent Bookings">
              {recent.recentBookings.length === 0 ? (
                <Text fontSize="sm" color="gray.400">No recent bookings</Text>
              ) : (
                <VStack gap={2} align="stretch">
                  {recent.recentBookings.slice(0, 5).map((b) => (
                    <HStack key={b.id} justify="space-between" fontSize="sm">
                      <Text color="gray.700">{b.name}</Text>
                      <Text color="gray.500">{b.date}</Text>
                    </HStack>
                  ))}
                </VStack>
              )}
            </AdminInfoCard>
          </SimpleGrid>
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
