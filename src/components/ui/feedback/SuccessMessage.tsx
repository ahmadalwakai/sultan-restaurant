"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface SuccessMessageProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function SuccessMessage({ title, description, icon, action }: SuccessMessageProps) {
  return (
    <VStack py={12} gap={4} textAlign="center">
      {icon && <Box fontSize="5xl" color="green.500">{icon}</Box>}
      <Text fontSize="xl" fontWeight="bold" color="gray.800">{title}</Text>
      {description && <Text color="gray.600">{description}</Text>}
      {action}
    </VStack>
  );
}
