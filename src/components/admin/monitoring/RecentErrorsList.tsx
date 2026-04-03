"use client";

// ─── Recent Errors List ──────────────────────────────────

import { Box, Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface ErrorEntry {
  id: string;
  message: string;
  severity: string;
  path?: string;
  createdAt: string;
}

interface RecentErrorsListProps {
  errors: ErrorEntry[];
  isLoading?: boolean;
}

const severityColors: Record<string, { bg: string; color: string }> = {
  low: { bg: "blue.100", color: "blue.800" },
  medium: { bg: "yellow.100", color: "yellow.800" },
  high: { bg: "orange.100", color: "orange.800" },
  critical: { bg: "red.100", color: "red.800" },
};

export function RecentErrorsList({ errors, isLoading }: RecentErrorsListProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h="5" w="32" bg="gray.100" rounded="md" className="animate-pulse" mb={4} />
          {[...Array(5)].map((_, i) => (
            <Box key={i} h="12" bg="gray.50" rounded="md" className="animate-pulse" mb={2} />
          ))}
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Heading size="md" color="gray.900" mb={4}>Recent Errors</Heading>
        {errors.length === 0 ? (
          <Text fontSize="sm" color="gray.500">No errors recorded</Text>
        ) : (
          <VStack gap={2}>
            {errors.map((error) => (
              <Flex key={error.id} align="flex-start" gap={3} p={3} bg="gray.50" rounded="lg" w="full">
                <Box
                  as="span"
                  fontSize="xs"
                  fontWeight="medium"
                  px={2}
                  py={0.5}
                  rounded="md"
                  bg={severityColors[error.severity]?.bg ?? "gray.100"}
                  color={severityColors[error.severity]?.color}
                >
                  {error.severity}
                </Box>
                <Box flex="1" minW="0">
                  <Text fontSize="sm" color="gray.900" truncate>{error.message}</Text>
                  <Text fontSize="xs" color="gray.400">
                    {error.path && <Box as="span">{error.path} &middot; </Box>}
                    {new Date(error.createdAt).toLocaleString()}
                  </Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}
