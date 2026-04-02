"use client";

import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

interface OrderCancelledMessageProps {
  orderNumber: string;
  reason?: string;
}

export default function OrderCancelledMessage({ orderNumber, reason }: OrderCancelledMessageProps) {
  return (
    <VStack py={12} gap={4} textAlign="center">
      <Text fontSize="5xl">❌</Text>
      <Heading as="h2" fontSize="2xl" fontFamily="var(--font-heading)">Order Cancelled</Heading>
      <Text color="gray.600">Order #{orderNumber} has been cancelled.</Text>
      {reason && <Text color="gray.500" fontSize="sm">Reason: {reason}</Text>}
      <Link href="/menu">
        <Button colorPalette="brand">Order Again</Button>
      </Link>
    </VStack>
  );
}
