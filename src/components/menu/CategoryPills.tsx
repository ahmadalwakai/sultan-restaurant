"use client";

import { HStack, Button } from "@chakra-ui/react";
import type { CategoryPublic } from "@/types/category";

interface CategoryPillsProps {
  categories: CategoryPublic[];
  activeSlug: string;
  onChange: (slug: string) => void;
}

export default function CategoryPills({ categories, activeSlug, onChange }: CategoryPillsProps) {
  return (
    <HStack gap={2} overflowX="auto" py={2} px={1}>
      <Button
        size="sm"
        variant={!activeSlug ? "solid" : "outline"}
        colorPalette="brand"
        onClick={() => onChange("")}
        flexShrink={0}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          size="sm"
          variant={activeSlug === cat.slug ? "solid" : "outline"}
          colorPalette="brand"
          onClick={() => onChange(cat.slug)}
          flexShrink={0}
        >
          {cat.name}
        </Button>
      ))}
    </HStack>
  );
}
