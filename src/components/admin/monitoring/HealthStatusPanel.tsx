"use client";

import type { HealthReport } from "@/lib/monitoring/health/health-types";
import { ServiceHealthCard } from "./ServiceHealthCard";
import { Box, Card, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

interface HealthStatusPanelProps {
  health: HealthReport | null;
  isLoading?: boolean;
}

const statusColors: Record<string, { bg: string; color: string }> = {
  healthy: { bg: "green.100", color: "green.800" },
  degraded: { bg: "yellow.100", color: "yellow.800" },
  unhealthy: { bg: "red.100", color: "red.800" },
};

export function HealthStatusPanel({ health, isLoading }: HealthStatusPanelProps) {
  if (isLoading || !health) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h={6} w={40} bg="gray.100" borderRadius="md" className="animate-pulse" mb={4} />
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={3}>
            {[...Array(5)].map((_, i) => (
              <Box key={i} h={20} bg="gray.100" borderRadius="md" className="animate-pulse" />
            ))}
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
    );
  }

  const colors = statusColors[health.status] ?? { bg: "gray.100", color: "gray.800" };

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Flex align="center" justify="space-between" mb={4}>
          <Heading as="h3" fontSize="lg" fontWeight={600} color="gray.900">System Health</Heading>
          <Text as="span" fontSize="xs" fontWeight="medium" px={2.5} py={1} borderRadius="full" bg={colors.bg} color={colors.color}>
            {health.status.toUpperCase()}
          </Text>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={3}>
          {health.services.map((service) => (
            <ServiceHealthCard key={service.service} service={service} />
          ))}
        </SimpleGrid>
        <Text mt={4} fontSize="xs" color="gray.400">
          Version {health.version} &middot; Uptime {Math.floor(health.uptime / 3600)}h {Math.floor((health.uptime % 3600) / 60)}m
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
