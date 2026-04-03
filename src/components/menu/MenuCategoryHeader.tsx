"use client";

import { VStack, HStack, Text, Box } from "@chakra-ui/react";

interface MenuCategoryHeaderProps {
  name: string;
  description?: string;
  itemCount: number;
}

export default function MenuCategoryHeader({ name, description, itemCount }: MenuCategoryHeaderProps) {
  return (
    <Box mb={4} borderBottom="1px solid" borderColor="gray.100" pb={4}>
      <HStack justify="space-between" align="baseline">
        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {itemCount} items
        </Text>
      </HStack>
      {description && (
        <Text mt={1} fontSize="sm" color="gray.500">
          {description}
        </Text>
      )}
    </Box>
  );
}
