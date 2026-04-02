"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface MobileBottomBarProps {
  items: NavItem[];
}

export default function MobileBottomBar({ items }: MobileBottomBarProps) {
  const pathname = usePathname();

  return (
    <Box
      display={{ base: "block", md: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      zIndex="sticky"
      pb="env(safe-area-inset-bottom)"
    >
      <Flex justify="space-around" py={2}>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Flex direction="column" align="center" gap={0.5} color={isActive ? "brand.500" : "gray.500"}>
                <Box fontSize="xl">{item.icon}</Box>
                <Text fontSize="2xs" fontWeight={isActive ? "semibold" : "normal"}>{item.label}</Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
