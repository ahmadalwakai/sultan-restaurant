"use client";

// ─── Error Fallback Minimal ─────────────────────────────

import { Flex, Text, Button } from "@chakra-ui/react";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorFallbackMinimal({
  message = "Failed to load this section",
  onRetry,
}: Props) {
  return (
    <Flex align="center" gap={3} p={4} bg="red.50" borderRadius="md">
      <Text fontSize="sm" color="red.700" flex={1}>
        {message}
      </Text>
      {onRetry && (
        <Button onClick={onRetry} size="xs" variant="outline" colorScheme="red">
          Retry
        </Button>
      )}
    </Flex>
  );
}
