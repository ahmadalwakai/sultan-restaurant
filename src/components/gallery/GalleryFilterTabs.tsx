"use client";

import { HStack, Button } from "@chakra-ui/react";

interface GalleryFilterTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function GalleryFilterTabs({ categories, activeCategory, onChange }: GalleryFilterTabsProps) {
  return (
    <HStack gap={2} flexWrap="wrap" justify="center">
      <Button
        size="sm"
        variant={activeCategory === "all" ? "solid" : "outline"}
        colorPalette="brand"
        onClick={() => onChange("all")}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          size="sm"
          variant={activeCategory === cat ? "solid" : "outline"}
          colorPalette="brand"
          onClick={() => onChange(cat)}
        >
          {cat}
        </Button>
      ))}
    </HStack>
  );
}
