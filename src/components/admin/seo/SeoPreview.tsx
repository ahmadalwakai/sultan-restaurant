"use client";

import { Box, VStack, Text } from "@chakra-ui/react";

export function SeoPreview({ title, description, url }: { title: string; description: string; url?: string }) {
  return (
    <Box bg="bg.surface" borderRadius="lg" border="1px solid" borderColor="gray.200" p={4} maxW="xl">
      <Text fontSize="xs" color="gray.500" mb={2}>Google Search Preview</Text>
      <VStack align="start" gap={1}>
        <Text
          color="blue.600"
          fontSize="lg"
          lineHeight="tight"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {title || "Page Title"}
        </Text>
        <Text color="green.600" fontSize="sm" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {url || "https://sultanrestaurant.co.uk"}
        </Text>
        <Text fontSize="sm" color="gray.600" overflow="hidden" textOverflow="ellipsis" display="-webkit-box" style={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {description || "No description set. Add a meta description to improve SEO."}
        </Text>
      </VStack>
    </Box>
  );
}
