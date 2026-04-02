"use client";

import { HStack, Text, Box } from "@chakra-ui/react";

interface MenuAllergenInfoProps {
  allergens: string[];
}

export default function MenuAllergenInfo({ allergens }: MenuAllergenInfoProps) {
  if (allergens.length === 0) return null;

  return (
    <Box>
      <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={1}>Allergens:</Text>
      <HStack gap={1} flexWrap="wrap">
        {allergens.map((allergen) => (
          <Text
            key={allergen}
            fontSize="xs"
            bg="red.50"
            color="red.600"
            px={2}
            py={0.5}
            borderRadius="full"
          >
            {allergen}
          </Text>
        ))}
      </HStack>
    </Box>
  );
}
