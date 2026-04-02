"use client";

import { Box, Heading, Text, VStack, HStack, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import MenuAllergenInfo from "./MenuAllergenInfo";
import MenuBadge from "./MenuBadge";
import MenuItemAddButton from "./MenuItemAddButton";

interface MenuItemDetailProps {
  item: MenuItemPublic;
}

export default function MenuItemDetail({ item }: MenuItemDetailProps) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
      <GridItem>
        <Box position="relative" aspectRatio={4/3} borderRadius="xl" overflow="hidden">
          {item.image ? (
            <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="50vw" />
          ) : (
            <Box bg="brand.50" h="full" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="6xl">🍛</Text>
            </Box>
          )}
        </Box>
      </GridItem>
      <GridItem>
        <VStack align="start" gap={4}>
          <HStack gap={2}>
            {item.isPopular && <MenuBadge label="Popular" />}
            {item.isVegetarian && <MenuBadge label="Vegetarian" colorScheme="vegetarian" />}
            {item.isVegan && <MenuBadge label="Vegan" colorScheme="vegan" />}
            {item.isGlutenFree && <MenuBadge label="Gluten Free" colorScheme="gluten-free" />}
            {item.isSpicy && <MenuBadge label="Spicy" colorScheme="spicy" />}
          </HStack>
          <Heading as="h1" fontSize="2xl" fontFamily="var(--font-heading)">{item.name}</Heading>
          {item.description && <Text color="gray.600">{item.description}</Text>}
          <Text fontSize="2xl" fontWeight="bold" color="brand.600">{formatCurrency(item.price)}</Text>
          <MenuAllergenInfo allergens={item.allergens} />
          <MenuItemAddButton item={item} size="lg" />
        </VStack>
      </GridItem>
    </Grid>
  );
}
