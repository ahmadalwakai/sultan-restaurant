"use client";

// ─── Alert History ───────────────────────────────────────

import { Box, Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import type { Alert } from "@/lib/monitoring/alerts/alert-types";

interface AlertHistoryProps {
  alerts: Alert[];
  isLoading?: boolean;
}

const levelColors: Record<string, { bg: string; color: string }> = {
  info: { bg: "blue.100", color: "blue.800" },
  warning: { bg: "yellow.100", color: "yellow.800" },
  critical: { bg: "red.100", color: "red.800" },
};

export function AlertHistory({ alerts, isLoading }: AlertHistoryProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h="5" w="32" bg="gray.100" rounded="md" className="animate-pulse" mb={4} />
          {[...Array(3)].map((_, i) => (
            <Box key={i} h="14" bg="gray.50" rounded="md" className="animate-pulse" mb={2} />
          ))}
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root>
      <Card.Body p={6}>
        <Heading size="md" color="gray.900" mb={4}>Alert History</Heading>
        {alerts.length === 0 ? (
          <Text fontSize="sm" color="gray.500">No alerts triggered</Text>
        ) : (
          <VStack gap={2}>
            {alerts.map((alert) => (
              <Flex key={alert.id} align="flex-start" gap={3} p={3} bg="gray.50" rounded="lg" w="full">
                <Box
                  as="span"
                  fontSize="xs"
                  fontWeight="medium"
                  px={2}
                  py={0.5}
                  rounded="md"
                  bg={levelColors[alert.level]?.bg ?? "gray.100"}
                  color={levelColors[alert.level]?.color}
                >
                  {alert.level}
                </Box>
                <Box flex="1" minW="0">
                  <Text fontSize="sm" fontWeight="medium" color="gray.900">{alert.title}</Text>
                  <Text fontSize="xs" color="gray.500" truncate>{alert.message}</Text>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    Sent via {alert.sentVia.join(", ") || "none"} &middot; {new Date(alert.createdAt).toLocaleString()}
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
