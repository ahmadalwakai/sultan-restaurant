"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";
import { Box, Heading, Text } from "@chakra-ui/react";

interface OfferCardProps {
  offer: OfferPublic;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Box role="group" position="relative" overflow="hidden" borderRadius="2xl" bgGradient="to-br" gradientFrom="amber.500" gradientTo="orange.500" p={6} shadow="md" transition="all 0.2s" _hover={{ shadow: "xl", translateY: "-1px" }}>
      {offer.image && (
        <Image src={offer.image} alt="" fill className="object-cover" style={{ opacity: 0.2 }} />
      )}
      <Box position="relative" zIndex={10}>
        <Box display="inline-block" borderRadius="full" bg="whiteAlpha.200" px={3} py={1} fontSize="sm" fontWeight="bold" color="white">
          {offer.discountType === "PERCENTAGE" ? `${offer.discount}% OFF` : `£${offer.discount} OFF`}
        </Box>
        <Heading mt={3} size="md" fontWeight="bold" color="white">{offer.title}</Heading>
        {offer.description && <Text mt={2} fontSize="sm" color="whiteAlpha.800" lineClamp={2}>{offer.description}</Text>}
        {offer.code && (
          <Box mt={3} display="inline-block" borderRadius="md" border="1px dashed" borderColor="whiteAlpha.400" bg="whiteAlpha.100" px={3} py={1} fontFamily="mono" fontSize="sm" color="white">
            {offer.code}
          </Box>
        )}
        <Box mt={4}>
          <Link href="/menu">
            <Text as="span" fontSize="sm" fontWeight="semibold" color="white" textDecoration="underline" textUnderlineOffset="2px" _hover={{ textDecoration: "none" }}>
              Order Now →
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
