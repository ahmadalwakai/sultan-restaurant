"use client";

import { Box, Text, Heading, VStack, Link } from "@chakra-ui/react";
import Image from "next/image";

interface DeliveryPartnerCardProps {
  name: string;
  logo: string;
  url: string;
}

export default function DeliveryPartnerCard({ name, logo, url }: DeliveryPartnerCardProps) {
  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="sm" textAlign="center">
      <VStack gap={4}>
        <Box position="relative" w="80px" h="80px">
          <Image src={logo} alt={name} fill style={{ objectFit: "contain" }} sizes="80px" />
        </Box>
        <Heading as="h3" fontSize="lg">{name}</Heading>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="full"
          px={4}
          py={2}
          fontWeight="semibold"
          borderRadius="md"
          bg="amber.500"
          color="white"
          _hover={{ bg: "amber.600" }}
        >
          Order on {name}
        </Link>
      </VStack>
    </Box>
  );
}
