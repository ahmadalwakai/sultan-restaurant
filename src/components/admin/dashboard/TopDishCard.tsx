"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import { HStack, Flex, Box, Text } from "@chakra-ui/react";

interface TopDishCardProps {
  dish: {
    name: string;
    image?: string | null;
    ordersCount: number;
    revenue: number;
  };
  rank: number;
}

export function TopDishCard({ dish, rank }: TopDishCardProps) {
  return (
    <HStack gap={4} borderRadius="lg" border="1px solid" borderColor="gray.100" bg="bg.surface" p={3}>
      <Flex h={8} w={8} flexShrink={0} align="center" justify="center" borderRadius="full" bg="amber.50" fontSize="sm" fontWeight="bold" color="amber.600">
        #{rank}
      </Flex>
      <Box position="relative" h={12} w={12} flexShrink={0} overflow="hidden" borderRadius="lg">
        {dish.image ? (
          <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="48px" />
        ) : (
          <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="xl">🍛</Flex>
        )}
      </Box>
      <Box minW={0} flex={1}>
        <Text truncate fontWeight="medium" color="gray.900">{dish.name}</Text>
        <Text fontSize="xs" color="gray.400">{dish.ordersCount} orders</Text>
      </Box>
      <Text flexShrink={0} fontWeight="semibold" color="gray.900">{formatCurrency(dish.revenue)}</Text>
    </HStack>
  );
}
