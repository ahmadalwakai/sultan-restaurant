"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface EmptyPlaceholderProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyPlaceholder({ icon, title, description, action }: EmptyPlaceholderProps) {
  return (
    <VStack py={16} gap={4} textAlign="center">
      {icon && <Box fontSize="4xl" color="gray.300">{icon}</Box>}
      <Text fontSize="lg" fontWeight="semibold" color="gray.600">{title}</Text>
      {description && <Text color="gray.500" maxW="md">{description}</Text>}
      {action}
    </VStack>
  );
}
