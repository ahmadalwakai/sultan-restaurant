"use client";

// ─── Error Rate Chart (Simple Bar) ──────────────────────

import { Box, Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface ErrorRateChartProps {
  stats: {
    total: number;
    bySeverity: Record<string, number>;
    windowHours: number;
  } | null;
  isLoading?: boolean;
}

const severityColors: Record<string, string> = {
  low: "blue.400",
  medium: "yellow.400",
  high: "orange.400",
  critical: "red.500",
};

export function ErrorRateChart({ stats, isLoading }: ErrorRateChartProps) {
  if (isLoading || !stats) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h="5" w="36" bg="gray.100" rounded="md" className="animate-pulse" mb={4} />
          <Box h="32" bg="gray.50" rounded="md" className="animate-pulse" />
        </Card.Body>
      </Card.Root>
    );
  }

  const maxCount = Math.max(...Object.values(stats.bySeverity), 1);

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Heading size="md" color="gray.900" mb={1}>Error Rate</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {stats.total} errors in last {stats.windowHours}h
        </Text>
        <VStack gap={3}>
          {Object.entries(stats.bySeverity).map(([severity, count]) => (
            <Flex key={severity} align="center" gap={3} w="full">
              <Text fontSize="xs" fontWeight="medium" w="16" color="gray.600" textTransform="capitalize">{severity}</Text>
              <Box flex="1" h="6" bg="gray.100" rounded="full" overflow="hidden">
                <Box
                  h="full"
                  rounded="full"
                  bg={severityColors[severity] ?? "gray.400"}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" w="8" textAlign="right">{count}</Text>
            </Flex>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
