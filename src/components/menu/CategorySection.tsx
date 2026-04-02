"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import type { MenuItemPublic } from "@/types/menu";
import MenuItemCard from "./MenuItemCard";

interface CategorySectionProps {
  title: string;
  items: MenuItemPublic[];
  onItemClick?: (item: MenuItemPublic) => void;
}

export default function CategorySection({ title, items, onItemClick }: CategorySectionProps) {
  if (items.length === 0) return null;

  return (
    <Box mb={10}>
      <Heading as="h2" fontSize="xl" fontFamily="var(--font-heading)" mb={4} borderBottomWidth="2px" borderColor="brand.200" pb={2}>
        {title}
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onClick={() => onItemClick?.(item)} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
