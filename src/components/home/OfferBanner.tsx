"use client";

import Link from "next/link";
import { useOffers } from "@/hooks/api";
import { Box, Text } from "@chakra-ui/react";

export function OfferBanner() {
  const { data: offers } = useOffers();
  const topOffer = offers?.[0];

  if (!topOffer) return null;

  return (
    <Box bg="amber.500" py={2} textAlign="center" fontSize="sm" fontWeight="medium" color="white">
      <Link href="/offers" className="hover:underline">
        🎉 {topOffer.title} &mdash;{" "}
        {topOffer.discountType === "PERCENTAGE"
          ? `${topOffer.discount}% OFF`
          : `£${(topOffer.discount / 100).toFixed(2)} OFF`}
        {" "}&rarr;
      </Link>
    </Box>
  );
}
