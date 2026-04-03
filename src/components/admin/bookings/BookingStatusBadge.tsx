"use client";

import { Box } from "@chakra-ui/react";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  PENDING: { bg: "yellow.100", color: "yellow.700" },
  CONFIRMED: { bg: "green.100", color: "green.700" },
  CANCELLED: { bg: "red.100", color: "red.700" },
  COMPLETED: { bg: "blue.100", color: "blue.700" },
};

export function BookingStatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] ?? { bg: "gray.100", color: "gray.700" };
  return (
    <Box as="span" fontSize="xs" px={2} py={1} rounded="md" fontWeight="medium" bg={colors.bg} color={colors.color}>
      {status}
    </Box>
  );
}
