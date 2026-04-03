"use client";

import { Box } from "@chakra-ui/react";

export function CouponStatusBadge({ isActive, expiresAt }: { isActive: boolean; expiresAt?: string | null }) {
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
  const label = isExpired ? "Expired" : isActive ? "Active" : "Inactive";
  const colorMap = {
    expired: { bg: "red.100", color: "red.700" },
    active: { bg: "green.100", color: "green.700" },
    inactive: { bg: "gray.100", color: "gray.700" },
  };
  const style = isExpired ? colorMap.expired : isActive ? colorMap.active : colorMap.inactive;

  return (
    <Box as="span" fontSize="xs" px={2} py={1} borderRadius="md" fontWeight="medium" bg={style.bg} color={style.color}>
      {label}
    </Box>
  );
}
