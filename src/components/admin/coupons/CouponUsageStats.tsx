"use client";

import { SimpleGrid, Card, Text } from "@chakra-ui/react";

interface CouponUsageStatsProps {
  usedCount: number;
  maxUses?: number | null;
  totalRevenue?: number;
}

export function CouponUsageStats({ usedCount, maxUses, totalRevenue }: CouponUsageStatsProps) {
  const usagePercent = maxUses ? Math.round((usedCount / maxUses) * 100) : null;

  return (
    <SimpleGrid columns={3} gap={4}>
      <Card.Root bg="bg.surface" borderRadius="lg">
        <Card.Body p={4} textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="amber.600">{usedCount}</Text>
          <Text fontSize="xs" color="gray.500">Times Used</Text>
        </Card.Body>
      </Card.Root>
      <Card.Root bg="bg.surface" borderRadius="lg">
        <Card.Body p={4} textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">{maxUses ?? "\u221e"}</Text>
          <Text fontSize="xs" color="gray.500">Max Uses</Text>
        </Card.Body>
      </Card.Root>
      <Card.Root bg="bg.surface" borderRadius="lg">
        <Card.Body p={4} textAlign="center">
          {usagePercent !== null ? (
            <>
              <Text fontSize="2xl" fontWeight="bold">{usagePercent}%</Text>
              <Text fontSize="xs" color="gray.500">Usage Rate</Text>
            </>
          ) : totalRevenue !== undefined ? (
            <>
              <Text fontSize="2xl" fontWeight="bold">£{Number(totalRevenue).toFixed(0)}</Text>
              <Text fontSize="xs" color="gray.500">Revenue</Text>
            </>
          ) : (
            <>
              <Text fontSize="2xl" fontWeight="bold">-</Text>
              <Text fontSize="xs" color="gray.500">No Limit</Text>
            </>
          )}
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
}
