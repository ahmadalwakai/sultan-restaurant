"use client";

import { type ReactNode } from "react";
import { HStack } from "@chakra-ui/react";

interface AdminTableToolbarProps {
  children: ReactNode;
}

/** Horizontal bar above a table for search / filter / export */
export function AdminTableToolbar({ children }: AdminTableToolbarProps) {
  return (
    <HStack gap={4} mb={4} flexWrap="wrap">
      {children}
    </HStack>
  );
}
