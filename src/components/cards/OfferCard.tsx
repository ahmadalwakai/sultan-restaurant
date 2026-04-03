"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";
import { Card, Box, Flex, Heading, Text } from "@chakra-ui/react";

interface OfferCardProps {
  offer: OfferPublic;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card.Root
      overflow="hidden"
      position="relative"
      bgGradient="to-br"
      gradientFrom="amber.500"
      gradientTo="orange.600"
      color="white"
      shadow="sm"
      borderRadius="xl"
      transition="all 0.2s"
      _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
    >
      {offer.image && (
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          style={{ objectFit: "cover", opacity: 0.15 }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <Card.Body p={{ base: 7, sm: 8 }} position="relative" zIndex={1} display="flex" flexDirection="column" gap={3}>
        <Box alignSelf="flex-start" borderRadius="full" bg="whiteAlpha.300" px={3.5} py={1} fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
          {offer.discountType === "PERCENTAGE"
            ? `${offer.discount}% OFF`
            : `£${(offer.discount / 100).toFixed(2)} OFF`}
        </Box>
        <Heading as="h3" fontSize="xl" fontWeight="bold" fontFamily="heading" lineHeight="snug">{offer.title}</Heading>
        {offer.description && (
          <Text fontSize="sm" lineHeight="relaxed" color="whiteAlpha.800" lineClamp={2}>
            {offer.description}
          </Text>
        )}
        <Flex mt="auto" align="center" justify="space-between" gap={4} pt={2}>
          <Link href="/menu">
            <Box
              display="inline-block"
              borderRadius="lg"
              bg="white"
              px={5}
              py={2.5}
              fontSize="sm"
              fontWeight="semibold"
              color="amber.700"
              transition="background 0.2s"
              _hover={{ bg: "whiteAlpha.900" }}
            >
              Order Now
            </Box>
          </Link>
          {offer.validUntil && (
            <Text fontSize="xs" color="whiteAlpha.600">
              Until{" "}
              {new Date(offer.validUntil).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          )}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
