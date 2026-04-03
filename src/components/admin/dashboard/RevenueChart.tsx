"use client";

import { Card, Flex, Box, Text } from "@chakra-ui/react";

interface DataPoint {
  createdAt: string;
  total: number;
}

export function RevenueChart({ data }: { data: DataPoint[] }) {
  if (!data.length) {
    return (
      <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
        <Card.Body p={5}>
          <Text fontWeight="semibold" color="gray.900" mb={4}>Revenue (30 days)</Text>
          <Text fontSize="sm" color="gray.500" py={8} textAlign="center">No revenue data yet</Text>
        </Card.Body>
      </Card.Root>
    );
  }

  const max = Math.max(...data.map((d) => Number(d.total)));

  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={5}>
        <Text fontWeight="semibold" color="gray.900" mb={4}>Revenue (30 days)</Text>
        <Flex align="flex-end" gap={1} h="40">
          {data.map((d, i) => {
            const height = max > 0 ? (Number(d.total) / max) * 100 : 0;
            return (
              <Box
                key={i}
                flex={1}
                bg="amber.500"
                borderTopRadius="sm"
                transition="background 0.2s"
                _hover={{ bg: "amber.600" }}
                style={{ height: `${Math.max(height, 2)}%` }}
                title={`£${(Number(d.total) / 100).toFixed(2)} - ${new Date(d.createdAt).toLocaleDateString()}`}
              />
            );
          })}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
