"use client";

import { SimpleGrid } from "@chakra-ui/react";
import { DELIVERY_PARTNERS } from "@/content";
import DeliveryPartnerCard from "./DeliveryPartnerCard";

export default function DeliveryPartnersList() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} maxW="5xl" mx="auto" px={4}>
      {DELIVERY_PARTNERS.map((partner) => (
        <DeliveryPartnerCard key={partner.name} {...partner} />
      ))}
    </SimpleGrid>
  );
}
