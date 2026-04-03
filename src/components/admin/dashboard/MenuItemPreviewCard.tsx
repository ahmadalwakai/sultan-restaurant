"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import { HStack, Flex, Box, Text, Button } from "@chakra-ui/react";

interface MenuItemPreviewCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    image?: string | null;
    isAvailable: boolean;
    categoryName?: string;
  };
  onToggleAvailability?: (id: string) => void;
}

export function MenuItemPreviewCard({ item, onToggleAvailability }: MenuItemPreviewCardProps) {
  return (
    <HStack gap={4} borderRadius="lg" border="1px solid" borderColor="gray.100" bg="bg.surface" p={3}>
      <Box position="relative" h={14} w={14} flexShrink={0} overflow="hidden" borderRadius="lg">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
        ) : (
          <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="2xl">🍛</Flex>
        )}
      </Box>
      <Box minW={0} flex={1}>
        <Text truncate fontWeight="medium" color="gray.900">{item.name}</Text>
        <Flex align="center" gap={2}>
          <Text fontSize="sm" color="amber.600">{formatCurrency(item.price)}</Text>
          {item.categoryName && <Text fontSize="xs" color="gray.400">• {item.categoryName}</Text>}
        </Flex>
      </Box>
      {onToggleAvailability && (
        <Button
          size="xs"
          variant="ghost"
          flexShrink={0}
          borderRadius="full"
          px={3}
          fontSize="xs"
          fontWeight="medium"
          bg={item.isAvailable ? "green.100" : "red.100"}
          color={item.isAvailable ? "green.700" : "red.700"}
          onClick={() => onToggleAvailability(item.id)}
        >
          {item.isAvailable ? "Available" : "Unavailable"}
        </Button>
      )}
    </HStack>
  );
}
