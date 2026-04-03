"use client";

import { Box, Card, Heading, SimpleGrid, Text } from "@chakra-ui/react";

interface RequestVolumeChartProps {
  stats: {
    count: number;
    avgDurationMs: number;
    windowHours: number;
  } | null;
  isLoading?: boolean;
}

export function RequestVolumeChart({ stats, isLoading }: RequestVolumeChartProps) {
  if (isLoading || !stats) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h={5} w={36} bg="gray.100" borderRadius="md" className="animate-pulse" mb={4} />
          <Box h={20} bg="gray.50" borderRadius="md" className="animate-pulse" />
        </Card.Body>
      </Card.Root>
    );
  }

  const reqPerHour = stats.count > 0 ? Math.round(stats.count / stats.windowHours) : 0;

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Heading as="h3" fontSize="lg" fontWeight={600} color="gray.900" mb={1}>Request Volume</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>Last {stats.windowHours} hours</Text>
        <SimpleGrid columns={2} gap={4}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold" color="gray.900">{stats.count.toLocaleString()}</Text>
            <Text fontSize="sm" color="gray.500">Total requests</Text>
          </Box>
          <Box>
            <Text fontSize="3xl" fontWeight="bold" color="gray.900">{reqPerHour}</Text>
            <Text fontSize="sm" color="gray.500">Per hour</Text>
          </Box>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
}
