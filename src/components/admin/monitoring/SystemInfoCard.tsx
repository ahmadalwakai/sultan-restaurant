"use client";

// ─── System Info Card ────────────────────────────────────

import { Box, Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import type { SystemInfo } from "@/types/monitoring";

interface SystemInfoCardProps {
  system: SystemInfo | null;
  isLoading?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function SystemInfoCard({ system, isLoading }: SystemInfoCardProps) {
  if (isLoading || !system) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h="5" w="28" bg="gray.100" rounded="md" className="animate-pulse" mb={4} />
          <VStack gap={2}>
            {[...Array(4)].map((_, i) => (
              <Box key={i} h="5" bg="gray.50" rounded="md" className="animate-pulse" w="full" />
            ))}
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  const items = [
    { label: "Node", value: system.nodeVersion },
    { label: "Platform", value: system.platform },
    { label: "Heap Used", value: formatBytes(system.memoryUsage.heapUsed) },
    { label: "Heap Total", value: formatBytes(system.memoryUsage.heapTotal) },
    { label: "RSS", value: formatBytes(system.memoryUsage.rss) },
    { label: "Process Uptime", value: `${Math.floor(system.uptime / 3600)}h ${Math.floor((system.uptime % 3600) / 60)}m` },
  ];

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Heading size="md" color="gray.900" mb={4}>System Info</Heading>
        <VStack gap={2}>
          {items.map((item) => (
            <Flex key={item.label} align="center" justify="space-between" w="full" fontSize="sm">
              <Text color="gray.500">{item.label}</Text>
              <Text fontWeight="medium" color="gray.900">{item.value}</Text>
            </Flex>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
