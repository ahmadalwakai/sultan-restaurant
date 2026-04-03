"use client";

import { Card, SimpleGrid, Box, Text } from "@chakra-ui/react";

interface CustomerStatsCardProps {
  totalCustomers: number;
  newToday: number;
  returningRate: number;
}

export function CustomerStatsCard({ totalCustomers, newToday, returningRate }: CustomerStatsCardProps) {
  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={6}>
        <Text fontSize="sm" color="gray.500">Customers</Text>
        <Text mt={2} fontSize="3xl" fontWeight="bold" color="gray.900">{totalCustomers.toLocaleString()}</Text>
        <SimpleGrid mt={4} columns={2} gap={4}>
          <Box>
            <Text fontSize="xs" color="gray.400">New Today</Text>
            <Text fontSize="lg" fontWeight="semibold" color="green.600">+{newToday}</Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.400">Returning</Text>
            <Text fontSize="lg" fontWeight="semibold" color="amber.600">{returningRate}%</Text>
          </Box>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
}
