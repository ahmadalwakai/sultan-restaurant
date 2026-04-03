"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Text, HStack } from "@chakra-ui/react";

interface LocationAreaCardProps {
  area: {
    name: string;
    image: string;
    deliveryTime: string;
    deliveryFee?: string;
  };
}

export function LocationAreaCard({ area }: LocationAreaCardProps) {
  return (
    <Link href="/delivery">
      <Box
        display="block"
        overflow="hidden"
        rounded="xl"
        bg="white"
        shadow="sm"
        transition="shadow"
        _hover={{ shadow: "md" }}
        _groupHover={{ shadow: "md" }}
      >
      <Box position="relative" h={28}>
        <Image
          src={area.image}
          alt={area.name}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.3s",
          }}
          className="group-hover:scale-105"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, blackAlpha.600, transparent)"
        />
        <Text
          position="absolute"
          bottom={2}
          left={3}
          fontWeight="semibold"
          color="white"
        >
          {area.name}
        </Text>
      </Box>
      <HStack justify="space-between" p={3}>
        <Text fontSize="sm" color="gray.600">
          🕐 {area.deliveryTime}
        </Text>
        {area.deliveryFee && (
          <Text fontSize="sm" fontWeight="medium" color="amber.600">
            {area.deliveryFee}
          </Text>
        )}
      </HStack>
    </Box>
    </Link>
  );
}
