"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface OfferCardFullProps {
  offer: OfferPublic;
}

// Format date consistently for SSR/client
function formatExpiryDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${months[date.getUTCMonth()]}`;
}

export function OfferCardFull({ offer }: OfferCardFullProps) {
  return (
    <Box overflow="hidden" borderRadius="2xl" bg="white" shadow="lg">
      <Box position="relative" h={48}>
        {offer.image ? (
          <Image src={offer.image} alt={offer.title} fill className="object-cover" />
        ) : (
          <Flex h="full" w="full" align="center" justify="center" bg="linear-gradient(to bottom right, var(--chakra-colors-orange-400), var(--chakra-colors-orange-500))" fontSize="6xl">🎉</Flex>
        )}
        <Box position="absolute" inset={0} bg="linear-gradient(to top, rgba(0,0,0,0.6), transparent)" />
        <Box position="absolute" bottom={4} left={4} right={4} color="white">
          <Box display="inline-block" borderRadius="full" bg="red.500" px={3} py={1} fontSize="sm" fontWeight="bold">
            {offer.discountType === "PERCENTAGE" ? `${offer.discount}% OFF` : `£${Number(offer.discount).toFixed(2)} OFF`}
          </Box>
        </Box>
      </Box>
      <Box p={6}>
        <Heading as="h3" fontSize="xl" fontWeight="bold" color="gray.900">{offer.title}</Heading>
        {offer.description && <Text mt={2} color="gray.600">{offer.description}</Text>}
        <Flex mt={4} align="center" justify="space-between">
          <Box>
            {offer.code && (
              <Text as="span" borderRadius="md" borderWidth="1px" borderStyle="dashed" borderColor="orange.300" bg="orange.50" px={3} py={1} fontFamily="mono" fontSize="sm" fontWeight={600} color="orange.700">
                {offer.code}
              </Text>
            )}
            {offer.minOrder && (
              <Text mt={2} fontSize="xs" color="gray.400">Min. order: £{Number(offer.minOrder).toFixed(2)}</Text>
            )}
          </Box>
          <Box textAlign="right">
            {offer.validUntil && (
              <Text fontSize="xs" color="gray.400">
                Expires {formatExpiryDate(offer.validUntil)}
              </Text>
            )}
          </Box>
        </Flex>
        <Link href="/menu">
        <Box
          display="block"
          mt={4}
          borderRadius="lg"
          bg="orange.500"
          py={3}
          textAlign="center"
          fontWeight={600}
          color="white"
          transition="background 0.2s"
          _hover={{ bg: "orange.600" }}
        >
          Use This Offer
        </Box>
        </Link>
      </Box>
    </Box>
  );
}
