"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface DishOfDayHistoryItem {
  id: string;
  date: string;
  discountPrice: number;
  reason: string | null;
  menuItem: { name: string; price: number; image?: string | null };
}

interface DishOfDayHistoryProps {
  items: DishOfDayHistoryItem[];
}

export function DishOfDayHistory({ items }: DishOfDayHistoryProps) {
  return (
    <VStack gap={3} align="stretch">
      <Heading size="sm" color="gray.500">Recent History</Heading>
      {items.length === 0 ? (
        <Text fontSize="sm" color="gray.400">No history yet.</Text>
      ) : (
        <VStack gap={2}>
          {items.map((item) => (
            <Flex key={item.id} align="center" gap={3} rounded="lg" borderWidth="1px" borderColor="gray.100" bg="white" p={3} w="full">
              <Box position="relative" h={10} w={10} flexShrink={0} overflow="hidden" rounded="lg">
                {item.menuItem.image ? (
                  <Image src={item.menuItem.image} alt={item.menuItem.name} fill className="object-cover" sizes="40px" />
                ) : (
                  <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="lg">🍛</Flex>
                )}
              </Box>
              <Box minW="0" flex="1">
                <Text truncate fontSize="sm" fontWeight="medium" color="gray.900">{item.menuItem.name}</Text>
                <Text fontSize="xs" color="gray.400">
                  {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  {item.reason && ` • ${item.reason}`}
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="semibold" color="green.600">{formatCurrency(item.discountPrice)}</Text>
                <Text fontSize="xs" color="gray.400" textDecoration="line-through">{formatCurrency(item.menuItem.price)}</Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      )}
    </VStack>
  );
}
