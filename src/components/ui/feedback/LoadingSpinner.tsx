"use client";

import { Flex, Spinner, Text } from "@chakra-ui/react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function LoadingSpinner({ message, size = "lg" }: LoadingSpinnerProps) {
  return (
    <Flex direction="column" align="center" justify="center" py={16} gap={4}>
      <Spinner size={size} color="brand.500" />
      {message && <Text color="gray.500" fontSize="sm">{message}</Text>}
    </Flex>
  );
}
