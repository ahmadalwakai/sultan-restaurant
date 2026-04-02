"use client";

import { Box, HStack, VStack, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCartStore } from "@/lib/cart";
import type { MenuItemPublic } from "@/types/menu";

interface MobileMenuCardProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MobileMenuCard({ item, onClick }: MobileMenuCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ menuItemId: item.id, name: item.name, price: item.price, image: item.image ?? null });
  };

  return (
    <HStack
      bg="white"
      p={3}
      borderRadius="lg"
      shadow="sm"
      gap={3}
      onClick={onClick}
      cursor="pointer"
      display={{ base: "flex", md: "none" }}
    >
      <Box position="relative" w="80px" h="80px" borderRadius="md" overflow="hidden" flexShrink={0}>
        {item.image ? (
          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="80px" />
        ) : (
          <Box bg="brand.50" h="full" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl">🍛</Text>
          </Box>
        )}
      </Box>
      <VStack align="start" flex={1} gap={1}>
        <Text fontWeight="semibold" fontSize="sm" lineClamp={1}>{item.name}</Text>
        {item.description && <Text fontSize="xs" color="gray.500" lineClamp={2}>{item.description}</Text>}
        <HStack justify="space-between" w="full">
          <Text fontWeight="bold" color="brand.600" fontSize="sm">{formatCurrency(item.price)}</Text>
          <Button size="xs" colorPalette="brand" onClick={handleAdd} disabled={!item.isAvailable}>
            Add
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}
