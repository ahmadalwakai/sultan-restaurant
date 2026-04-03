"use client";

import { Box, VStack, HStack, Text, Image } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuBadge from "./MenuBadge";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemCardFeaturedProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MenuItemCardFeatured({ item, onClick }: MenuItemCardFeaturedProps) {
  return (
    <Box
      position="relative"
      cursor="pointer"
      overflow="hidden"
      borderRadius="2xl"
      shadow="lg"
      _groupHover={{ transform: "scale(1.05)" }}
      transition="transform 0.5s"
      onClick={onClick}
    >
      <Box position="relative" h="72">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            w="full"
            h="full"
            objectFit="cover"
            transition="transform 0.5s"
            _groupHover={{ transform: "scale(1.1)" }}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="full"
            h="full"
            bgGradient="linear(to-br, amber.400, orange.500)"
            fontSize="6xl"
          >
            🍛
          </Box>
        )}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, blackAlpha.800, blackAlpha.200, transparent)"
        />
        <HStack position="absolute" left={4} top={4} gap={2}>
          {item.isPopular && <MenuBadge label="Popular" />}
          <Box borderRadius="full" bg="amber.500" px={3} py={1} fontSize="xs" fontWeight="bold" color="white">
            Featured
          </Box>
        </HStack>
      </Box>
      <Box position="absolute" bottom={0} left={0} right={0} p={6}>
        <VStack align="start" gap={1}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            {item.name}
          </Text>
          {item.description && (
            <Text fontSize="sm" color="whiteAlpha.800" overflow="hidden" textOverflow="ellipsis" display="-webkit-box" style={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {item.description}
            </Text>
          )}
          <HStack justify="space-between" w="full" mt={4}>
            <Text fontSize="2xl" fontWeight="bold" color="amber.400">
              {formatCurrency(item.price)}
            </Text>
            <Box onClick={(e) => e.stopPropagation()}>
              <MenuItemAddButton item={item} />
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
