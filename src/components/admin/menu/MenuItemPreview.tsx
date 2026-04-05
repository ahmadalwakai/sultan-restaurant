"use client";

import { Box, Flex, Heading, Text, chakra } from "@chakra-ui/react";

interface MenuItemPreviewProps {
  name: string;
  description?: string;
  price: number;
  image?: string | null;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export function MenuItemPreview({ name, description, price, image, isVegetarian, isVegan, isGlutenFree }: MenuItemPreviewProps) {
  return (
    <Box bg="white" borderWidth="1px" rounded="lg" overflow="hidden" maxW="xs">
      {image && <chakra.img src={image} alt={name} w="full" h="40" objectFit="cover" />}
      <Box p={4}>
        <Flex align="flex-start" justify="space-between">
          <Heading size="sm">{name}</Heading>
          <Text fontWeight="bold" color="amber.600">{String.fromCharCode(163)}{Number(price).toFixed(2)}</Text>
        </Flex>
        {description && <Text fontSize="xs" color="gray.500" mt={1}>{description}</Text>}
        <Flex gap={1} mt={2}>
          {isVegetarian && <Box as="span" fontSize="xs" px={1.5} py={0.5} bg="green.100" color="green.700" rounded="md">V</Box>}
          {isVegan && <Box as="span" fontSize="xs" px={1.5} py={0.5} bg="green.100" color="green.700" rounded="md">VG</Box>}
          {isGlutenFree && <Box as="span" fontSize="xs" px={1.5} py={0.5} bg="yellow.100" color="yellow.700" rounded="md">GF</Box>}
        </Flex>
      </Box>
    </Box>
  );
}
