"use client";

import { VStack, Button, Text } from "@chakra-ui/react";

interface SeoPage { pageSlug: string; title: string; description?: string }

export function SeoPagesList({ pages, activeSlug, onSelect }: { pages: SeoPage[]; activeSlug: string; onSelect: (slug: string) => void }) {
  return (
    <VStack align="stretch" gap={1}>
      {pages.map((page) => (
        <Button
          key={page.pageSlug}
          onClick={() => onSelect(page.pageSlug)}
          variant="ghost"
          justifyContent="start"
          px={3}
          py={2}
          borderRadius="lg"
          fontSize="sm"
          fontWeight={activeSlug === page.pageSlug ? "medium" : "normal"}
          bg={activeSlug === page.pageSlug ? "amber.50" : "transparent"}
          color={activeSlug === page.pageSlug ? "amber.700" : "gray.600"}
          _hover={{ bg: activeSlug === page.pageSlug ? "amber.50" : "gray.50" }}
          h="auto"
          whiteSpace="normal"
        >
          <VStack align="start" gap={0} w="full">
            <Text fontSize="sm" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {page.title || page.pageSlug}
            </Text>
            {page.description && (
              <Text fontSize="xs" color="gray.400" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {page.description}
              </Text>
            )}
          </VStack>
        </Button>
      ))}
    </VStack>
  );
}
