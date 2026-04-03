"use client";

import { formatCurrency } from "@/lib/utils/format-currency";
import { Card, Flex, Text } from "@chakra-ui/react";

interface RevenueCardProps {
  title: string;
  amount: number;
  previousAmount?: number;
  period: string;
}

export function RevenueCard({ title, amount, previousAmount, period }: RevenueCardProps) {
  const change = previousAmount ? ((amount - previousAmount) / previousAmount) * 100 : null;

  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={6}>
        <Text fontSize="sm" color="gray.500">{title}</Text>
        <Text mt={2} fontSize="3xl" fontWeight="bold" color="gray.900">{formatCurrency(amount)}</Text>
        <Flex mt={2} align="center" justify="space-between">
          <Text fontSize="xs" color="gray.400">{period}</Text>
          {change !== null && (
            <Text fontSize="sm" fontWeight="medium" color={change >= 0 ? "green.600" : "red.600"}>
              {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
            </Text>
          )}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
