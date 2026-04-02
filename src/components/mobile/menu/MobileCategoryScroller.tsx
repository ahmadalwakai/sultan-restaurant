"use client";

import { HStack, Button } from "@chakra-ui/react";
import type { CategoryPublic } from "@/types/category";

interface MobileCategoryScrollerProps {
  categories: CategoryPublic[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export default function MobileCategoryScroller({ categories, activeSlug, onSelect }: MobileCategoryScrollerProps) {
  return (
    <HStack
      gap={2}
      overflowX="auto"
      py={2}
      px={4}
      display={{ base: "flex", md: "none" }}
      css={{ "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}
    >
      <Button
        size="sm"
        borderRadius="full"
        variant={!activeSlug ? "solid" : "ghost"}
        colorPalette="brand"
        onClick={() => onSelect("")}
        flexShrink={0}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          size="sm"
          borderRadius="full"
          variant={activeSlug === cat.slug ? "solid" : "ghost"}
          colorPalette="brand"
          onClick={() => onSelect(cat.slug)}
          flexShrink={0}
        >
          {cat.name}
        </Button>
      ))}
    </HStack>
  );
}
