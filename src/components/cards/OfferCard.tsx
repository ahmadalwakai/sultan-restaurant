"use client";

import Image from "next/image";
import type { OfferPublic } from "@/types/offer";
import { Card, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useOrderModal } from "@/hooks/useOrderModal";

interface OfferCardProps {
  offer: OfferPublic;
}

// Format date consistently for SSR/client
function formatOfferDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function OfferCard({ offer }: OfferCardProps) {
  const { open: openOrderModal } = useOrderModal();
  
  return (
    <Card.Root
      overflow="hidden"
      position="relative"
      bg="black"
      color="white"
      shadow="lg"
      borderRadius="xl"
      transition="all 0.2s"
      _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
      h="320px"
    >
      {offer.image && (
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          style={{ objectFit: "cover", opacity: 0.4 }}
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      )}
      {/* Solid gradient overlay for text readability */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        top={0}
        bg="linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)"
        zIndex={1}
      />
      <Card.Body
        p={{ base: 6, sm: 8 }}
        position="relative"
        zIndex={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        h="full"
      >
        <VStack align="start" gap={3}>
          <Box
            borderRadius="full"
            bg="brand.primary"
            px={4}
            py={1.5}
            fontSize="sm"
            fontWeight="bold"
            color="black"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {offer.discountType === "PERCENTAGE"
              ? `${offer.discount}% OFF`
              : `£${Number(offer.discount).toFixed(2)} OFF`}
          </Box>
          <Heading as="h3" fontSize="2xl" fontWeight="bold" fontFamily="heading" lineHeight="short" color="white">
            {offer.title}
          </Heading>
          {offer.description && (
            <Text fontSize="md" lineHeight="relaxed" color="whiteAlpha.900" lineClamp={2}>
              {offer.description}
            </Text>
          )}
          <Flex mt={2} align="center" justify="space-between" gap={4} w="full" pt={2}>
            <Box
              as="button"
              onClick={openOrderModal}
              display="inline-block"
              borderRadius="full"
              bg="brand.primary"
              px={6}
              py={3}
              fontSize="sm"
              fontWeight="bold"
              color="black"
              transition="all 0.2s"
              cursor="pointer"
              _hover={{ bg: "yellow.400", transform: "translateY(-2px)" }}
            >
              Order Now
            </Box>
            {offer.validUntil && (
              <Text fontSize="sm" color="whiteAlpha.700">
                Until {formatOfferDate(offer.validUntil)}
              </Text>
            )}
          </Flex>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
