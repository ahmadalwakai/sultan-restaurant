"use client";

import Link from "next/link";
import { Box, VStack, Button, Text } from "@chakra-ui/react";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}

export function CTABanner({ title, subtitle, buttonText, buttonHref }: CTABannerProps) {
  return (
    <Box as="section" bg="amber.500" py={16}>
      <Box maxW="4xl" mx="auto" px={4} textAlign="center" color="white">
        <VStack gap={3}>
          <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="lg" color="whiteAlpha.900">
              {subtitle}
            </Text>
          )}
          <Link href={buttonHref}>
            <Button
              mt={8}
              bg="white"
              color="amber.600"
              borderRadius="lg"
              px={8}
              py={3.5}
              fontSize="lg"
              fontWeight="semibold"
              _hover={{ bg: "gray.100" }}
            >
              {buttonText}
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
}
