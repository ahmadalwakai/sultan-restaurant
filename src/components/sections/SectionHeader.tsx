"use client";

import { VStack, Heading, Text } from "@chakra-ui/react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  titleColor?: string;
  subtitleColor?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  titleColor = "gray.900",
  subtitleColor = "gray.500",
}: SectionHeaderProps) {
  return (
    <VStack gap={2} textAlign={centered ? "center" : "start"} w="full">
      <Heading
        as="h2"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="bold"
        fontFamily="heading"
        lineHeight="tight"
        color={titleColor}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text color={subtitleColor} fontSize={{ base: "sm", md: "md" }}>
          {subtitle}
        </Text>
      )}
    </VStack>
  );
}
