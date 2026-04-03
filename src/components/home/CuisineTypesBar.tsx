"use client";

import { useCategories } from "@/hooks/api";
import Link from "next/link";
import { Box, Container, Flex, Text } from "@chakra-ui/react";

export function CuisineTypesBar() {
  const { data: categories } = useCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <Box as="section" borderBottomWidth="1px" bg="bg.canvas" py={4}>
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }} overflowX="auto">
        <Flex gap={6} align="center">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/menu?category=${cat.slug}`}>
              <Text whiteSpace="nowrap" fontSize="sm" fontWeight="medium" color="gray.600" transition="colors 0.2s" _hover={{ color: "amber.600" }}>
                {cat.name}
              </Text>
            </Link>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
