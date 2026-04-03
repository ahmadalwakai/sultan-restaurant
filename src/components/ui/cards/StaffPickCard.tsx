"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

interface StaffPickCardProps {
  item: MenuItemPublic;
  staffNote?: string;
  onAddToCart?: () => void;
}

export function StaffPickCard({ item, staffNote, onAddToCart }: StaffPickCardProps) {
  return (
    <Box role="group" position="relative" overflow="hidden" borderRadius="xl" bg="bg.surface" shadow="sm" transition="shadow 0.2s" _hover={{ shadow: "md" }}>
      <Box position="absolute" left={3} top={3} zIndex={10} borderRadius="full" bg="amber.500" px={3} py={1} fontSize="xs" fontWeight="bold" color="white" shadow="sm">
        ⭐ Staff Pick
      </Box>
      <Box position="relative" h={48}>
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="300px" />
        ) : (
          <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="5xl">🍽️</Flex>
        )}
      </Box>
      <Box p={4}>
        <Heading size="sm" fontWeight="bold" color="gray.900">{item.name}</Heading>
        {staffNote && <Text mt={1} fontSize="sm" fontStyle="italic" color="gray.500">&ldquo;{staffNote}&rdquo;</Text>}
        <Flex mt={3} align="center" justify="space-between">
          <Text fontSize="lg" fontWeight="bold" color="amber.600">{formatCurrency(item.price)}</Text>
          {onAddToCart && (
            <Button
              size="sm"
              borderRadius="lg"
              bg="amber.500"
              color="white"
              fontWeight="medium"
              _hover={{ bg: "amber.600" }}
              onClick={onAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
