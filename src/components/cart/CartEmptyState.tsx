"use client";

import { VStack, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function CartEmptyState() {
  return (
    <VStack py={12} gap={4} textAlign="center">
      <Text fontSize="4xl">🛒</Text>
      <Text fontWeight="semibold" color="gray.600">Your cart is empty</Text>
      <Text fontSize="sm" color="gray.500">Browse our menu and add items to get started.</Text>
      <Link href="/menu">
        <Button colorPalette="brand" size="sm">Browse Menu</Button>
      </Link>
    </VStack>
  );
}
