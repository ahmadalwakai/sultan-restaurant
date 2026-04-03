"use client";

import Link from "next/link";
import { Card, Flex, VStack, Box, Text } from "@chakra-ui/react";

interface PendingAction {
  label: string;
  count: number;
  href: string;
  urgency: "high" | "medium" | "low";
}

interface PendingActionsCardProps {
  actions: PendingAction[];
}

const urgencyStyles: Record<string, { color: string; bg: string }> = {
  high: { color: "red.600", bg: "red.50" },
  medium: { color: "amber.600", bg: "amber.50" },
  low: { color: "blue.600", bg: "blue.50" },
};

export function PendingActionsCard({ actions }: PendingActionsCardProps) {
  const totalPending = actions.reduce((sum, a) => sum + a.count, 0);

  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={6}>
        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold" color="gray.900">Pending Actions</Text>
          <Box borderRadius="full" bg="red.100" px={2.5} py={0.5} fontSize="sm" fontWeight="bold" color="red.600">{totalPending}</Box>
        </Flex>
        <VStack mt={4} gap={3} align="stretch">
          {actions.map((action) => {
            const style = urgencyStyles[action.urgency];
            return (
              <Link key={action.label} href={action.href}>
                <Flex
                  align="center"
                  justify="space-between"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.50"
                  p={3}
                  transition="background 0.2s"
                  _hover={{ bg: "gray.50" }}
                >
                  <Text fontSize="sm" color="gray.700">{action.label}</Text>
                <Box borderRadius="full" px={2} py={0.5} fontSize="xs" fontWeight="bold" color={style.color} bg={style.bg}>
                  {action.count}
                </Box>
                </Flex>
              </Link>
            );
          })}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
