"use client";

import { Box, Text, Heading, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuBadge from "./MenuBadge";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemCardProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      shadow="sm"
      cursor="pointer"
      onClick={onClick}
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <Box position="relative" aspectRatio={4/3}>
        {item.image ? (
          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <Box bg="brand.50" h="full" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="4xl">🍛</Text>
          </Box>
        )}
        <HStack position="absolute" top={2} left={2} gap={1}>
          {item.isPopular && <MenuBadge label="Popular" />}
          {item.isVegetarian && <MenuBadge label="V" colorScheme="vegetarian" />}
          {item.isVegan && <MenuBadge label="VG" colorScheme="vegan" />}
        </HStack>
      </Box>
      <VStack p={4} align="stretch" gap={2}>
        <Heading as="h3" fontSize="md" lineClamp={1}>{item.name}</Heading>
        {item.description && <Text fontSize="sm" color="gray.500" lineClamp={2}>{item.description}</Text>}
        <HStack justify="space-between" align="center">
          <Text fontWeight="bold" color="brand.600">{formatCurrency(item.price)}</Text>
          <MenuItemAddButton item={item} />
        </HStack>
      </VStack>
    </Box>
  );
}
