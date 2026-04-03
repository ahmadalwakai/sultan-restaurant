"use client";

import { VStack, Heading, Text } from "@chakra-ui/react";
import { GoldDivider } from "@/components/decorative/GoldDivider";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeader({ label, title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <VStack gap={3} textAlign="center" maxW="3xl" mx="auto">
      {label && (
        <>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color={light ? "brand.primary" : "brand.primary"}
            textTransform="uppercase"
            letterSpacing="widest"
          >
            {label}
          </Text>
          <GoldDivider />
        </>
      )}
      <Heading
        fontFamily="heading"
        size={{ base: "2xl", md: "4xl" }}
        color={light ? "fg.on-dark" : "fg.default"}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          fontSize={{ base: "sm", md: "lg" }}
          color={light ? "whiteAlpha.800" : "fg.muted"}
          lineHeight="tall"
        >
          {subtitle}
        </Text>
      )}
    </VStack>
  );
}
