"use client";

import { HStack, Box, Text } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemQuickAddProps {
  item: MenuItemPublic;
}

export default function MenuItemQuickAdd({ item }: MenuItemQuickAddProps) {
  return (
    <HStack
      justify="space-between"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.100"
      bg="bg.surface"
      px={4}
      py={2}
    >
      <Box minW={0} flex={1}>
        <Text fontSize="sm" fontWeight="medium" color="gray.900" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {item.name}
        </Text>
        <Text fontSize="sm" color="amber.600" ml={2}>
          {formatCurrency(item.price)}
        </Text>
      </Box>
      <MenuItemAddButton item={item} />
    </HStack>
  );
}
