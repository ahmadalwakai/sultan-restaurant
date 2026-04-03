"use client";

// ─── Service Health Card ─────────────────────────────────

import type { ServiceHealth } from "@/lib/monitoring/health/health-types";
import { Box, Flex, Text } from "@chakra-ui/react";

interface ServiceHealthCardProps {
  service: ServiceHealth;
}

const statusIcon: Record<string, string> = {
  healthy: "🟢",
  degraded: "🟡",
  unhealthy: "🔴",
};

export function ServiceHealthCard({ service }: ServiceHealthCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={3}>
      <Flex align="center" gap={2}>
        <span>{statusIcon[service.status] ?? "⚪"}</span>
        <Text fontSize="sm" fontWeight="medium" color="gray.900" textTransform="capitalize">
          {service.service.replace("-", " ")}
        </Text>
      </Flex>
      <Flex mt={1} align="center" justify="space-between">
        <Text fontSize="xs" color="gray.500">{service.latencyMs}ms</Text>
        {service.message && (
          <Text fontSize="xs" color="gray.400" truncate ml={2}>{service.message}</Text>
        )}
      </Flex>
    </Box>
  );
}
