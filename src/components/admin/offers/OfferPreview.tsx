"use client";

import { Box, VStack, Text, Image } from "@chakra-ui/react";

interface OfferPreviewProps {
  offer: { title: string; description: string; discountType: string; discountValue: number; imageUrl?: string | null };
}

export function OfferPreview({ offer }: OfferPreviewProps) {
  const discountLabel = offer.discountType === "PERCENTAGE" ? `${offer.discountValue}% OFF` : `£${(offer.discountValue / 100).toFixed(2)} OFF`;

  return (
    <Box borderRadius="lg" overflow="hidden" bg="bg.surface" maxW="sm" border="1px solid" borderColor="gray.200">
      {offer.imageUrl && (
        <Box h="40" bg="gray.100">
          <Image src={offer.imageUrl} alt={offer.title} w="full" h="full" objectFit="cover" />
        </Box>
      )}
      <Box p={4}>
        <Text fontSize="xs" fontWeight="bold" color="amber.600">
          {discountLabel}
        </Text>
        <Text fontWeight="semibold" mt={1}>
          {offer.title}
        </Text>
        <Text fontSize="sm" color="gray.500" mt={1}>
          {offer.description}
        </Text>
      </Box>
    </Box>
  );
}
