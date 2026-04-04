"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminLoadingState, AdminSectionTitle } from "@/components/admin/shared";
import { Box, Grid, VStack, HStack, Text, Button, Heading } from "@chakra-ui/react";
import { LuWind, LuCalendar, LuMenu, LuFolders, LuUsers, LuArrowRight } from "react-icons/lu";
import Link from "next/link";

type Stats = {
  tables: { total: number; available: number; booked: number };
  bookings: { today: number; pending: number; total: number };
  menu: { categories: number; items: number; featured: number };
};

export default function AdminShishaPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [tablesRes, bookingsRes, menuRes, catsRes] = await Promise.all([
          fetch("/api/admin/shisha/tables"),
          fetch("/api/admin/shisha/bookings?date=" + new Date().toISOString().split("T")[0]),
          fetch("/api/admin/shisha/menu"),
          fetch("/api/admin/shisha/categories"),
        ]);

        const [tables, bookings, menu, cats] = await Promise.all([
          tablesRes.json(),
          bookingsRes.json(),
          menuRes.json(),
          catsRes.json(),
        ]);

        setStats({
          tables: {
            total: tables.data?.length || 0,
            available: tables.data?.filter((t: { status: string; isActive: boolean }) => t.status === "AVAILABLE" && t.isActive).length || 0,
            booked: tables.data?.filter((t: { status: string }) => t.status === "BOOKED").length || 0,
          },
          bookings: {
            today: bookings.data?.length || 0,
            pending: bookings.data?.filter((b: { status: string }) => b.status === "PENDING").length || 0,
            total: bookings.data?.length || 0,
          },
          menu: {
            categories: cats.data?.length || 0,
            items: menu.data?.length || 0,
            featured: menu.data?.filter((i: { isFeatured: boolean }) => i.isFeatured).length || 0,
          },
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const sections = [
    {
      title: "Tables",
      description: "Manage shisha lounge tables and availability",
      icon: LuUsers,
      href: "/admin/shisha/tables",
      color: "#8B5CF6",
      stats: stats ? [
        { label: "Total", value: stats.tables.total },
        { label: "Available", value: stats.tables.available },
        { label: "Booked", value: stats.tables.booked },
      ] : null,
    },
    {
      title: "Bookings",
      description: "View and manage shisha reservations",
      icon: LuCalendar,
      href: "/admin/shisha/bookings",
      color: "#3B82F6",
      stats: stats ? [
        { label: "Today", value: stats.bookings.today },
        { label: "Pending", value: stats.bookings.pending },
      ] : null,
    },
    {
      title: "Menu Items",
      description: "Manage shisha flavors, drinks, and pricing",
      icon: LuMenu,
      href: "/admin/shisha/menu",
      color: "#10B981",
      stats: stats ? [
        { label: "Items", value: stats.menu.items },
        { label: "Featured", value: stats.menu.featured },
      ] : null,
    },
    {
      title: "Categories",
      description: "Organize menu into categories",
      icon: LuFolders,
      href: "/admin/shisha/categories",
      color: "#F59E0B",
      stats: stats ? [
        { label: "Categories", value: stats.menu.categories },
      ] : null,
    },
  ];

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={6} align="stretch">
          <AdminSectionTitle
            title="Shisha Lounge"
            description="Manage your shisha lounge tables, bookings, and menu"
          />
          <HStack>
            <Link href="/shisha" target="_blank">
              <Button size="sm" variant="outline" colorPalette="purple">
                View Public Page
              </Button>
            </Link>
          </HStack>
        {loading ? (
          <AdminLoadingState />
        ) : (
          <>
            {/* Quick Stats */}
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
              gap={4}
              mb={8}
            >
              <Box
                p={5}
                bg="linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))"
                borderRadius="xl"
                border="1px solid rgba(139,92,246,0.3)"
              >
                <HStack justify="space-between">
                  <VStack align="start" gap={0}>
                    <Text fontSize="xs" color="whiteAlpha.600">Tables</Text>
                    <Text fontSize="2xl" fontWeight="700" color="white">
                      {stats?.tables.total || 0}
                    </Text>
                  </VStack>
                  <Box p={2} bg="rgba(139,92,246,0.2)" borderRadius="lg">
                    <LuUsers size={24} color="#8B5CF6" />
                  </Box>
                </HStack>
              </Box>

              <Box
                p={5}
                bg="linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))"
                borderRadius="xl"
                border="1px solid rgba(59,130,246,0.3)"
              >
                <HStack justify="space-between">
                  <VStack align="start" gap={0}>
                    <Text fontSize="xs" color="whiteAlpha.600">Today&apos;s Bookings</Text>
                    <Text fontSize="2xl" fontWeight="700" color="white">
                      {stats?.bookings.today || 0}
                    </Text>
                  </VStack>
                  <Box p={2} bg="rgba(59,130,246,0.2)" borderRadius="lg">
                    <LuCalendar size={24} color="#3B82F6" />
                  </Box>
                </HStack>
              </Box>

              <Box
                p={5}
                bg="linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))"
                borderRadius="xl"
                border="1px solid rgba(16,185,129,0.3)"
              >
                <HStack justify="space-between">
                  <VStack align="start" gap={0}>
                    <Text fontSize="xs" color="whiteAlpha.600">Menu Items</Text>
                    <Text fontSize="2xl" fontWeight="700" color="white">
                      {stats?.menu.items || 0}
                    </Text>
                  </VStack>
                  <Box p={2} bg="rgba(16,185,129,0.2)" borderRadius="lg">
                    <LuMenu size={24} color="#10B981" />
                  </Box>
                </HStack>
              </Box>

              <Box
                p={5}
                bg="linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))"
                borderRadius="xl"
                border="1px solid rgba(245,158,11,0.3)"
              >
                <HStack justify="space-between">
                  <VStack align="start" gap={0}>
                    <Text fontSize="xs" color="whiteAlpha.600">Categories</Text>
                    <Text fontSize="2xl" fontWeight="700" color="white">
                      {stats?.menu.categories || 0}
                    </Text>
                  </VStack>
                  <Box p={2} bg="rgba(245,158,11,0.2)" borderRadius="lg">
                    <LuFolders size={24} color="#F59E0B" />
                  </Box>
                </HStack>
              </Box>
            </Grid>

            {/* Section Cards */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              {sections.map((section) => (
                <Link key={section.href} href={section.href}>
                  <Box
                    p={6}
                    bg="rgba(255,255,255,0.03)"
                    borderRadius="xl"
                    border="1px solid rgba(255,255,255,0.08)"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-4px)",
                      borderColor: section.color,
                      boxShadow: `0 8px 30px ${section.color}20`,
                    }}
                    cursor="pointer"
                  >
                    <HStack justify="space-between" align="start">
                      <VStack align="start" gap={3}>
                        <Box p={3} bg={`${section.color}20`} borderRadius="lg">
                          <section.icon size={24} color={section.color} />
                        </Box>
                        <VStack align="start" gap={1}>
                          <Heading size="md" color="white">{section.title}</Heading>
                          <Text fontSize="sm" color="whiteAlpha.600">
                            {section.description}
                          </Text>
                        </VStack>
                        {section.stats && (
                          <HStack gap={4} pt={2}>
                            {section.stats.map((stat) => (
                              <VStack key={stat.label} align="start" gap={0}>
                                <Text fontSize="lg" fontWeight="700" color={section.color}>
                                  {stat.value}
                                </Text>
                                <Text fontSize="xs" color="whiteAlpha.500">
                                  {stat.label}
                                </Text>
                              </VStack>
                            ))}
                          </HStack>
                        )}
                      </VStack>
                      <Box color="whiteAlpha.400">
                        <LuArrowRight size={20} />
                      </Box>
                    </HStack>
                  </Box>
                </Link>
              ))}
            </Grid>

            {/* Quick Actions */}
            <Box
              mt={8}
              p={6}
              bg="rgba(139,92,246,0.1)"
              borderRadius="xl"
              border="1px solid rgba(139,92,246,0.2)"
            >
              <HStack justify="space-between" flexWrap="wrap" gap={4}>
                <VStack align="start" gap={1}>
                  <Text fontWeight="600" color="white">Quick Actions</Text>
                  <Text fontSize="sm" color="whiteAlpha.600">
                    Common tasks for managing your shisha lounge
                  </Text>
                </VStack>
                <HStack gap={3} flexWrap="wrap">
                  <Link href="/admin/shisha/tables">
                    <Button size="sm" colorPalette="purple">
                      Add Table
                    </Button>
                  </Link>
                  <Link href="/admin/shisha/menu">
                    <Button size="sm" colorPalette="purple" variant="outline">
                      Add Menu Item
                    </Button>
                  </Link>
                  <Link href="/admin/shisha/categories">
                    <Button size="sm" colorPalette="purple" variant="outline">
                      Add Category
                    </Button>
                  </Link>
                </HStack>
              </HStack>
            </Box>
          </>
        )}
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
