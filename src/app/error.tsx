"use client";

import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Flex minH="100vh" align="center" justify="center" px={4}>
      <VStack gap={4} textAlign="center">
        <Heading size="2xl" fontWeight="bold" color="gray.900">Something went wrong</Heading>
        <Text color="gray.600">{error.message || "An unexpected error occurred."}</Text>
        <Button onClick={reset} bg="orange.500" color="white" px={6} py={3} borderRadius="lg" _hover={{ bg: "orange.600" }}>
          Try Again
        </Button>
      </VStack>
    </Flex>
  );
}
