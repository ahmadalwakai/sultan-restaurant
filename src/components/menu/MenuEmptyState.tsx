"use client";

import { VStack, Heading, Text, Button } from "@chakra-ui/react";

interface MenuEmptyStateProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function MenuEmptyState({ searchQuery, onClearSearch }: MenuEmptyStateProps) {
  return (
    <VStack py={16} gap={4} textAlign="center">
      <Text fontSize="5xl">🍽️</Text>
      <Heading as="h3" fontSize="xl" fontFamily="var(--font-heading)">
        {searchQuery ? "No items found" : "Menu coming soon"}
      </Heading>
      <Text color="gray.500">
        {searchQuery
          ? `No menu items match "${searchQuery}". Try a different search.`
          : "We're working on our menu. Please check back soon!"}
      </Text>
      {searchQuery && onClearSearch && (
        <Button variant="outline" onClick={onClearSearch}>Clear Search</Button>
      )}
    </VStack>
  );
}
