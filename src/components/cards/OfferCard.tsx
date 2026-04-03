"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";
import { Card, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface OfferCardProps {
  offer: OfferPublic;
}

export function OfferCard({ offer }: OfferCardProps) {
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
              : `£${(offer.discount / 100).toFixed(2)} OFF`}
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
            <Link href="/menu">
              <Box
                display="inline-block"
                borderRadius="full"
                bg="brand.primary"
                px={6}
                py={3}
                fontSize="sm"
                fontWeight="bold"
                color="black"
                transition="all 0.2s"
                _hover={{ bg: "yellow.400", transform: "translateY(-2px)" }}
              >
                Order Now
              </Box>
            </Link>
            {offer.validUntil && (
              <Text fontSize="sm" color="whiteAlpha.700">
                Until{" "}
                {new Date(offer.validUntil).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            )}
          </Flex>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
