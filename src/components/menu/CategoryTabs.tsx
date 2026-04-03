"use client";

import { HStack, Button } from "@chakra-ui/react";
import { useCategories } from "@/hooks/api";

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (slug: string) => void;
}

export function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
  const { data: categories } = useCategories();

  return (
    <HStack gap={1} px={1} py={2} borderBottom="1px solid" borderColor="gray.200" overflowX="auto">
      <Button
        onClick={() => onSelect("")}
        size="sm"
        borderRadius="lg"
        px={4}
        py={2}
        fontWeight="medium"
        whiteSpace="nowrap"
        bg={!activeCategory ? "amber.500" : "transparent"}
        color={!activeCategory ? "white" : "gray.600"}
        _hover={!activeCategory ? { bg: "amber.600" } : { bg: "gray.100" }}
      >
        All
      </Button>
      {categories?.map((cat) => (
        <Button
          key={cat.id}
          onClick={() => onSelect(cat.slug)}
          size="sm"
          borderRadius="lg"
          px={4}
          py={2}
          fontWeight="medium"
          whiteSpace="nowrap"
          bg={activeCategory === cat.slug ? "amber.500" : "transparent"}
          color={activeCategory === cat.slug ? "white" : "gray.600"}
          _hover={activeCategory === cat.slug ? { bg: "amber.600" } : { bg: "gray.100" }}
        >
          {cat.name}
        </Button>
      ))}
    </HStack>
  );
}
