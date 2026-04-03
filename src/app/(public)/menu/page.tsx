"use client";

import { useSearchParams } from "next/navigation";
import { useMenuFilters } from "@/hooks";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, Flex, Input } from "@chakra-ui/react";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const { filters, queryParams, setSearch, setCategory } = useMenuFilters();

  if (!filters.categoryId && initialCategory) {
    setCategory(initialCategory);
  }

  return (
    <Box minH="100vh" bg="bg.canvas">
      <Box bg="bg.surface" py={{ base: 8, md: 12 }}>
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <SectionHeader
            title="Our Menu"
            subtitle="Explore our authentic dishes"
          />
        </Container>
      </Box>

      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }} py={8}>
        <VStack gap={6} align="stretch">
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={4}
            align={{ sm: "center" }}
            justify="space-between"
          >
            <CategoryTabs
              activeCategory={filters.categoryId}
              onSelect={setCategory}
            />
            <Input
              type="text"
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes..."
              size="sm"
              w={{ base: "full", sm: "64" }}
              borderColor="gray.200"
              _focus={{ borderColor: "amber.500" }}
            />
          </Flex>
          <MenuGrid params={queryParams} />
        </VStack>
      </Container>
    </Box>
  );
}
