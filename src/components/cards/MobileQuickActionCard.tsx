"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

interface MobileQuickActionCardProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
}

export function MobileQuickActionCard({ icon, label, onClick, href, badge }: MobileQuickActionCardProps) {
  const content = (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      borderRadius="xl"
      bg="bg.surface"
      p={4}
      shadow="sm"
      _active={{ transform: "scale(0.95)" }}
    >
      <Flex h={12} w={12} align="center" justify="center" borderRadius="full" bg="amber.50" fontSize="xl" color="amber.600">
        {icon}
      </Flex>
      <Text fontSize="xs" fontWeight="medium" color="gray.700">{label}</Text>
      {badge !== undefined && badge > 0 && (
        <Flex
          position="absolute"
          right={2}
          top={2}
          h={5}
          w={5}
          align="center"
          justify="center"
          borderRadius="full"
          bg="red.500"
          fontSize="10px"
          fontWeight="bold"
          color="white"
        >
          {badge > 9 ? "9+" : badge}
        </Flex>
      )}
    </Box>
  );

  if (href) {
    return (
      <Link href={href}>
        {content}
      </Link>
    );
  }

  return (
    <Box as="button" onClick={onClick}>
      {content}
    </Box>
  );
}
