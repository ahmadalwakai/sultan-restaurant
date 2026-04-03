"use client";

// ─── Slow Queries List ───────────────────────────────────

import { Box, Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface SlowQuery {
  id: string;
  path: string;
  method?: string;
  durationMs: number;
  type: string;
  createdAt: string;
}

interface SlowQueriesListProps {
  queries: SlowQuery[];
  isLoading?: boolean;
}

export function SlowQueriesList({ queries, isLoading }: SlowQueriesListProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h="5" w="32" bg="gray.100" rounded="md" className="animate-pulse" mb={4} />
          {[...Array(3)].map((_, i) => (
            <Box key={i} h="10" bg="gray.50" rounded="md" className="animate-pulse" mb={2} />
          ))}
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Heading size="md" color="gray.900" mb={4}>Slow Requests</Heading>
        {queries.length === 0 ? (
          <Text fontSize="sm" color="gray.500">No slow requests recorded</Text>
        ) : (
          <VStack gap={2}>
            {queries.map((q) => (
              <Flex key={q.id} align="center" gap={3} p={2} bg="gray.50" rounded="md" w="full">
                <Box as="span" fontSize="xs" fontFamily="mono" bg="gray.200" px={1.5} py={0.5} rounded="md">
                  {q.method ?? "GET"}
                </Box>
                <Text fontSize="sm" color="gray.700" flex="1" truncate>{q.path}</Text>
                <Text fontSize="sm" fontWeight="medium" color="orange.600">{q.durationMs}ms</Text>
                <Text fontSize="xs" color="gray.400">
                  {new Date(q.createdAt).toLocaleTimeString()}
                </Text>
              </Flex>
            ))}
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}
