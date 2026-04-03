"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { CategoryPublic } from "@/types/category";

interface CategoryCardProps {
  category: CategoryPublic;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/menu?category=${category.slug}`}>
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="xl"
        bg="bg.surface"
        shadow="md"
        transition="all 0.2s"
        _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
        role="group"
      >
        <Box position="relative" css={{ aspectRatio: "4/3" }} overflow="hidden">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.5s" }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <Flex h="full" align="center" justify="center" bgGradient="to-br" gradientFrom="amber.100" gradientTo="orange.100">
              <Text fontSize="4xl">🍽️</Text>
            </Flex>
          )}
          <Box position="absolute" inset={0} bgGradient="to-t" gradientFrom="blackAlpha.600" gradientVia="transparent" gradientTo="transparent" />
        </Box>
        <Box position="absolute" bottom={0} left={0} right={0} p={4} color="white">
          <Heading as="h3" fontSize="lg" fontWeight="bold" fontFamily="heading">{category.name}</Heading>
          {category.description && (
            <Text mt={1} fontSize="sm" color="whiteAlpha.800" lineClamp={1}>
              {category.description}
            </Text>
          )}
          <Text mt={1} fontSize="xs" color="amber.300">
            {category.itemCount} items
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
