"use client";

import type { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface AdminFilterBarProps {
  children: ReactNode;
}

export function AdminFilterBar({ children }: AdminFilterBarProps) {
  return (
    <Flex flexWrap="wrap" align="center" gap={3} mb={4} p={3} bg="gray.50" borderRadius="lg">
      {children}
    </Flex>
  );
}
