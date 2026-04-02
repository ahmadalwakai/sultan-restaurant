"use client";

import { Box, Text, Flex } from "@chakra-ui/react";

interface CartAddedToastProps {
  itemName: string;
  visible: boolean;
}

export default function CartAddedToast({ itemName, visible }: CartAddedToastProps) {
  if (!visible) return null;

  return (
    <Box
      position="fixed"
      bottom={20}
      left="50%"
      transform="translateX(-50%)"
      bg="gray.800"
      color="white"
      px={4}
      py={3}
      borderRadius="lg"
      shadow="lg"
      zIndex="toast"
    >
      <Flex align="center" gap={2}>
        <Text>✓</Text>
        <Text fontSize="sm" fontWeight="medium">{itemName} added to cart</Text>
      </Flex>
    </Box>
  );
}
