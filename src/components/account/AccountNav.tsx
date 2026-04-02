"use client";

import { VStack, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/account", label: "Profile" },
  { href: "/account/orders", label: "Order History" },
  { href: "/account/bookings", label: "Booking History" },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <VStack align="stretch" gap={1} bg="white" borderRadius="xl" p={4} shadow="sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <Box
              px={4}
              py={2}
              borderRadius="md"
              bg={isActive ? "brand.50" : "transparent"}
              color={isActive ? "brand.600" : "gray.700"}
              fontWeight={isActive ? "semibold" : "normal"}
              _hover={{ bg: "gray.50" }}
            >
              <Text>{item.label}</Text>
            </Box>
          </Link>
        );
      })}
    </VStack>
  );
}
