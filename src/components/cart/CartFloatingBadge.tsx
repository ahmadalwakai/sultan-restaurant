"use client";

import { Box, Text, IconButton } from "@chakra-ui/react";

interface CartFloatingBadgeProps {
  itemCount: number;
  onClick: () => void;
}

export default function CartFloatingBadge({ itemCount, onClick }: CartFloatingBadgeProps) {
  if (itemCount === 0) return null;

  return (
    <Box position="fixed" bottom={6} right={6} zIndex="overlay">
      <IconButton
        aria-label="Open cart"
        onClick={onClick}
        borderRadius="full"
        size="lg"
        bg="brand.500"
        color="white"
        shadow="lg"
        _hover={{ bg: "brand.600" }}
      >
        🛒
      </IconButton>
      <Box
        position="absolute"
        top={-1}
        right={-1}
        bg="red.500"
        color="white"
        borderRadius="full"
        w={5}
        h={5}
        fontSize="xs"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{itemCount}</Text>
      </Box>
    </Box>
  );
}
