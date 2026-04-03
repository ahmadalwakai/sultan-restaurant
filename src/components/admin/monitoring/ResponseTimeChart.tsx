"use client";

// ─── Response Time Chart (Simple Bar) ────────────────────

import { Box, Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface ResponseTimeChartProps {
  stats: {
    count: number;
    avgDurationMs: number;
    maxDurationMs: number;
    minDurationMs: number;
    slowRequests: number;
    windowHours: number;
  } | null;
  isLoading?: boolean;
}

export function ResponseTimeChart({ stats, isLoading }: ResponseTimeChartProps) {
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

  const items = [
    { label: "Avg", value: stats.avgDurationMs, color: "blue.400" },
    { label: "Max", value: stats.maxDurationMs, color: "red.400" },
    { label: "Min", value: stats.minDurationMs, color: "green.400" },
  ];

  const maxVal = Math.max(...items.map((i) => i.value), 1);

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Heading size="md" color="gray.900" mb={1}>Response Times</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {stats.count} requests &middot; {stats.slowRequests} slow (&gt;3s) &middot; last {stats.windowHours}h
        </Text>
        <VStack gap={3}>
          {items.map((item) => (
            <Flex key={item.label} align="center" gap={3} w="full">
              <Text fontSize="xs" fontWeight="medium" w="10" color="gray.600">{item.label}</Text>
              <Box flex="1" h="6" bg="gray.100" rounded="full" overflow="hidden">
                <Box
                  h="full"
                  rounded="full"
                  bg={item.color}
                  style={{ width: `${(item.value / maxVal) * 100}%` }}
                />
              </Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" w="16" textAlign="right">{item.value}ms</Text>
            </Flex>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
