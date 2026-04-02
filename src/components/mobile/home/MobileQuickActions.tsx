"use client";

import { SimpleGrid, VStack, Text, Box } from "@chakra-ui/react";
import Link from "next/link";

const actions = [
  { label: "Menu", icon: "📖", href: "/menu" },
  { label: "Book", icon: "🗓️", href: "/book" },
  { label: "Pickup", icon: "🌟", href: "/pickup" },
  { label: "Offers", icon: "🎁", href: "/offers" },
];

export default function MobileQuickActions() {
  return (
    <SimpleGrid columns={4} gap={3} display={{ base: "grid", md: "none" }} px={4} py={4}>
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <VStack gap={1} bg="white" borderRadius="xl" py={3} shadow="sm">
            <Text fontSize="2xl">{action.icon}</Text>
            <Text fontSize="xs" fontWeight="medium">{action.label}</Text>
          </VStack>
        </Link>
      ))}
    </SimpleGrid>
  );
}
