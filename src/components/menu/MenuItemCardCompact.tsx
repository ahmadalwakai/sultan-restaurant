"use client";

import { HStack, Box, VStack, Text, Image } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemCardCompactProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MenuItemCardCompact({ item, onClick }: MenuItemCardCompactProps) {
  return (
    <HStack
      cursor="pointer"
      gap={3}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.100"
      bg="bg.surface"
      p={3}
      transition="all"
      _hover={{ borderColor: "amber.200", shadow: "sm" }}
      onClick={onClick}
    >
      <Box position="relative" h="16" w="16" flexShrink={0} overflow="hidden" borderRadius="lg">
        {item.image ? (
          <Image src={item.image} alt={item.name} w="full" h="full" objectFit="cover" />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="full"
            h="full"
            bg="amber.50"
            fontSize="2xl"
          >
            🍛
          </Box>
        )}
      </Box>
      <VStack align="start" minW={0} flex={1} gap={0}>
        <Text fontWeight="medium" color="gray.900" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {item.name}
        </Text>
        {item.description && (
          <Text fontSize="xs" color="gray.400" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {item.description}
          </Text>
        )}
        <Text mt={1} fontWeight="semibold" color="amber.600">
          {formatCurrency(item.price)}
        </Text>
      </VStack>
      <Box onClick={(e) => e.stopPropagation()}>
        <MenuItemAddButton item={item} />
      </Box>
    </HStack>
  );
}
