"use client";

import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function MobileHero() {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      bg="brand.50"
      py={12}
      px={6}
      textAlign="center"
    >
      <VStack gap={4}>
        <Heading as="h1" fontSize="2xl" fontFamily="var(--font-heading)" color="brand.800">
          Authentic Middle Eastern Cuisine
        </Heading>
        <Text color="gray.600">Fresh, flavourful dishes crafted with love</Text>
        <VStack gap={2} w="full">
          <Link href="/menu" style={{ width: "100%" }}>
            <Button colorPalette="brand" w="full">View Menu</Button>
          </Link>
          <Link href="/book" style={{ width: "100%" }}>
            <Button variant="outline" colorPalette="brand" w="full">Book a Table</Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}
