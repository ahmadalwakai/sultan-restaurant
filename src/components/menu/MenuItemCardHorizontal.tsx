"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuBadge from "./MenuBadge";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemCardHorizontalProps {
  item: MenuItemPublic;
  onClick?: () => void;
}

export default function MenuItemCardHorizontal({ item, onClick }: MenuItemCardHorizontalProps) {
  return (
    <Flex
      as="div"
      role="group"
      cursor="pointer"
      overflow="hidden"
      borderRadius="xl"
      bg="white"
      shadow="sm"
      transition="box-shadow 0.2s"
      _hover={{ shadow: "md" }}
      onClick={onClick}
    >
      <Box position="relative" w="40" flexShrink={0}>
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="160px" />
        ) : (
          <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="4xl">{String.fromCodePoint(0x1F35B)}</Flex>
        )}
        {item.isPopular && (
          <Box position="absolute" left={2} top={2}>
            <MenuBadge label="Popular" />
          </Box>
        )}
      </Box>
      <Flex flex="1" direction="column" justify="space-between" p={4}>
        <Box>
          <Heading size="sm" color="gray.900" lineClamp={1}>{item.name}</Heading>
          {item.description && <Text mt={1} fontSize="sm" color="gray.500" lineClamp={2}>{item.description}</Text>}
          <Flex mt={2} flexWrap="wrap" gap={1}>
            {item.isVegetarian && <MenuBadge label="V" colorScheme="vegetarian" />}
            {item.isVegan && <MenuBadge label="VG" colorScheme="vegan" />}
            {item.isGlutenFree && <MenuBadge label="GF" colorScheme="gluten-free" />}
            {item.isSpicy && <MenuBadge label={String.fromCodePoint(0x1F336) + String.fromCodePoint(0xFE0F)} colorScheme="spicy" />}
          </Flex>
        </Box>
        <Flex mt={3} align="center" justify="space-between">
          <Text fontSize="lg" fontWeight="bold" color="amber.600">{formatCurrency(item.price)}</Text>
          <Box onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <MenuItemAddButton item={item} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
