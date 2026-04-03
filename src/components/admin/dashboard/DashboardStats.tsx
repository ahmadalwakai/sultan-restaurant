"use client";

import { SimpleGrid, Card, Flex, Box, Text } from "@chakra-ui/react";

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
}

interface DashboardStatsProps {
  stats: StatCard[];
  isLoading?: boolean;
}

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
        {[...Array(4)].map((_, i) => (
          <Box key={i} h="28" bg="gray.100" borderRadius="lg" animation="pulse 2s infinite" />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {stats.map((stat) => (
        <Card.Root key={stat.label} bg="bg.surface" shadow="sm" borderRadius="xl">
          <Card.Body p={5}>
            <Flex align="center" justify="space-between">
              <Text fontSize="2xl">{stat.icon}</Text>
              {stat.change && (
                <Box fontSize="xs" fontWeight="medium" color="green.600" bg="green.50" px={2} py={1} borderRadius="md">
                  {stat.change}
                </Box>
              )}
            </Flex>
            <Text mt={3} fontSize="2xl" fontWeight="bold" color="gray.900">{stat.value}</Text>
            <Text fontSize="sm" color="gray.500">{stat.label}</Text>
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}
