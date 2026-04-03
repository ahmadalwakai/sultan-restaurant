"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Flex, Box, Text } from "@chakra-ui/react";

interface QuickActionCardProps {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  href?: string;
}

export function QuickActionCard({ icon, label, description, onClick, href }: QuickActionCardProps) {
  const content = (
    <Flex
      align="center"
      gap={4}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      bg="bg.surface"
      p={4}
      shadow="sm"
      transition="all 0.2s"
      _hover={{ borderColor: "amber.200", shadow: "md" }}
      cursor={href || onClick ? "pointer" : "default"}
    >
      <Flex h={12} w={12} flexShrink={0} align="center" justify="center" borderRadius="lg" bg="amber.50" fontSize="xl" color="amber.600">
        {icon}
      </Flex>
      <Box textAlign="left">
        <Text fontWeight="semibold" color="gray.900">{label}</Text>
        {description && <Text fontSize="sm" color="gray.500">{description}</Text>}
      </Box>
    </Flex>
  );

  if (href) {
    return (
      <Link href={href}>
        {content}
      </Link>
    );
  }

  return (
    <Box onClick={onClick}>
      {content}
    </Box>
  );
}
