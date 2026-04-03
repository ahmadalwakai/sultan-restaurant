"use client";

import Image from "next/image";
import Link from "next/link";
import { VStack, Box, Flex, Text } from "@chakra-ui/react";

interface MobileCategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    image?: string | null;
    itemCount?: number;
  };
}

export function MobileCategoryCard({ category }: MobileCategoryCardProps) {
  return (
    <Link href={`/menu?category=${category.slug}`}>
      <VStack gap={2} _active={{ transform: "scale(0.95)" }}>
        <Box position="relative" h={16} w={16} overflow="hidden" borderRadius="full" borderWidth="2px" borderColor="amber.200">
          {category.image ? (
            <Image src={category.image} alt={category.name} fill style={{ objectFit: "cover" }} sizes="64px" />
          ) : (
            <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="2xl">🍽️</Flex>
          )}
        </Box>
        <Text textAlign="center" fontSize="xs" fontWeight="medium" color="gray.700" lineClamp={1}>{category.name}</Text>
      </VStack>
    </Link>
  );
}
