"use client";

import Link from "next/link";
import { Card, SimpleGrid, Flex, Text } from "@chakra-ui/react";

const actions = [
  { label: "Add Menu Item", href: "/admin/menu/new", icon: "🍽️" },
  { label: "View Orders", href: "/admin/orders", icon: "📦" },
  { label: "Manage Bookings", href: "/admin/bookings", icon: "📅" },
  { label: "Site Settings", href: "/admin/settings", icon: "⚙️" },
];

export function QuickActions() {
  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={5}>
        <Text fontWeight="semibold" color="gray.900" mb={4}>Quick Actions</Text>
        <SimpleGrid columns={2} gap={3}>
          {actions.map((a) => (
            <Link key={a.href} href={a.href}>
              <Flex
                align="center"
                gap={2}
                p={3}
                borderRadius="lg"
                borderWidth="1px"
                transition="all 0.2s"
                _hover={{ bg: "amber.50", borderColor: "amber.200" }}
              >
                <Text fontSize="xl">{a.icon}</Text>
                <Text fontSize="sm" fontWeight="medium">{a.label}</Text>
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
}
