"use client";

import { Card, VStack, HStack, Box, Text } from "@chakra-ui/react";

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  if (!activities.length) {
    return (
      <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
        <Card.Body p={5}>
          <Text fontWeight="semibold" color="gray.900" mb={4}>Activity</Text>
          <Text fontSize="sm" color="gray.500" textAlign="center" py={4}>No recent activity</Text>
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={5}>
        <Text fontWeight="semibold" color="gray.900" mb={4}>Activity</Text>
        <VStack gap={3} align="stretch">
          {activities.map((a) => (
            <HStack key={a.id} gap={3} fontSize="sm" align="start">
              <Box w={2} h={2} mt={1.5} borderRadius="full" bg="amber.500" flexShrink={0} />
              <Box>
                <Text color="gray.700">{a.message}</Text>
                <Text fontSize="xs" color="gray.400">{new Date(a.timestamp).toLocaleString()}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
