"use client";

// ─── Error Fallback (Full) ──────────────────────────────

import { Flex, Text, Heading, Button, Box } from "@chakra-ui/react";

type Props = {
  error: Error;
  resetErrorBoundary?: () => void;
};

export function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" py={20} gap={4}>
      <Heading as="h2" fontSize="xl" color="red.600">
        Something went wrong
      </Heading>
      <Text color="gray.500" textAlign="center" maxW="md">
        An unexpected error occurred. Please try again or contact support if the problem persists.
      </Text>
      {process.env.NODE_ENV !== "production" && (
        <Box bg="red.50" p={4} borderRadius="md" maxW="lg" w="full" overflow="auto">
          <Text fontSize="sm" fontFamily="mono" color="red.700">
            {error.message}
          </Text>
        </Box>
      )}
      {resetErrorBoundary && (
        <Button onClick={resetErrorBoundary} colorScheme="red" variant="outline">
          Try Again
        </Button>
      )}
    </Flex>
  );
}
