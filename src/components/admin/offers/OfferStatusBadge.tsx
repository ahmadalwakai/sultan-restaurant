"use client";

import { Badge } from "@chakra-ui/react";

export function OfferStatusBadge({ isActive, expiresAt }: { isActive: boolean; expiresAt?: string | null }) {
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
  const label = isExpired ? "Expired" : isActive ? "Active" : "Inactive";
  const colorScheme = isExpired ? "red" : isActive ? "green" : "gray";

  return (
    <Badge colorScheme={colorScheme} fontSize="xs" px={2} py={1} borderRadius="md" fontWeight="medium">
      {label}
    </Badge>
  );
}
