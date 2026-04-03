"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

// ─── Uptime Indicator ────────────────────────────────────

interface UptimeIndicatorProps {
  uptime: number;
  status: "healthy" | "degraded" | "unhealthy";
}

export function UptimeIndicator({ uptime, status }: UptimeIndicatorProps) {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  const statusTextColors: Record<string, string> = {
    healthy: "green.600",
    degraded: "yellow.600",
    unhealthy: "red.600",
  };

  const statusDotColors: Record<string, string> = {
    healthy: "green.500",
    degraded: "yellow.500",
    unhealthy: "red.500",
  };

  return (
    <Flex align="center" gap={3} bg="white" borderWidth="1px" borderRadius="lg" px={4} py={3}>
      <Box w={3} h={3} borderRadius="full" bg={statusDotColors[status]} />
      <Box>
        <Text fontSize="sm" fontWeight={600} color={statusTextColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
        <Text fontSize="xs" color="gray.500">
          Uptime: {days > 0 ? `${days}d ` : ""}{hours}h {minutes}m
        </Text>
      </Box>
    </Flex>
  );
}
