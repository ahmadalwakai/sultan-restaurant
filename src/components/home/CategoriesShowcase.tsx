"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/api";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { Box, Container, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export function CategoriesShowcase() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <LoadingState message="Loading categories..." />;
  if (!categories || categories.length === 0) return null;

  return (
    <Box as="section" py={20}>
      <Container maxW="7xl" px={4}>
        <SectionHeader
          title="Explore Our Menu"
          subtitle="From traditional Iraqi to Lebanese and Indian cuisine"
        />
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6} mt={10}>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/menu?category=${cat.slug}`}>
            <Box
              position="relative"
              overflow="hidden"
              borderRadius="2xl"
              shadow="md"
              transition="all 0.2s"
              _hover={{ shadow: "xl", transform: "translateY(-4px) scale(1.05)" }}
              display="block"
            >
              <Box position="relative" css={{ aspectRatio: "4/3" }}>
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Flex h="full" w="full" align="center" justify="center" bg="linear-gradient(to bottom right, var(--chakra-colors-orange-100), var(--chakra-colors-orange-200))" fontSize="5xl">
                    🍽️
                  </Flex>
                )}
                <Box position="absolute" inset={0} bg="linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 50%, transparent)" />
              </Box>
              <Box position="absolute" bottom={0} left={0} right={0} p={4} color="white">
                <Heading size="md" fontWeight="bold">{cat.name}</Heading>
                {cat.description && (
                  <Text mt={1} fontSize="sm" color="whiteAlpha.800" lineClamp={1}>{cat.description}</Text>
                )}
                <Text mt={2} fontSize="xs" fontWeight="medium" color="orange.300">
                  {cat.itemCount} items →
                </Text>
              </Box>
            </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
