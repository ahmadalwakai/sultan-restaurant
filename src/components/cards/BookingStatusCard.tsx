"use client";

import { Card, HStack, Text, VStack } from "@chakra-ui/react";
import type { BookingStatusType } from "@/types/booking";

interface BookingStatusCardProps {
  status: BookingStatusType;
  bookingDate: string;
  bookingTime: string;
}

const statusConfig: Record<BookingStatusType, { label: string; bg: string; borderColor: string; color: string; icon: string }> = {
  PENDING: { label: "Pending Confirmation", bg: "yellow.50", borderColor: "yellow.200", color: "yellow.700", icon: "⏳" },
  CONFIRMED: { label: "Confirmed", bg: "green.50", borderColor: "green.200", color: "green.700", icon: "✅" },
  CANCELLED: { label: "Cancelled", bg: "red.50", borderColor: "red.200", color: "red.700", icon: "❌" },
  COMPLETED: { label: "Completed", bg: "gray.50", borderColor: "gray.200", color: "gray.600", icon: "✅" },
  NO_SHOW: { label: "No Show", bg: "red.50", borderColor: "red.200", color: "red.600", icon: "🚫" },
};

export function BookingStatusCard({ status, bookingDate, bookingTime }: BookingStatusCardProps) {
  const config = statusConfig[status];
  const dateObj = new Date(bookingDate);

  return (
    <Card.Root borderRadius="xl" borderWidth="1px" borderColor={config.borderColor} bg={config.bg}>
      <Card.Body p={4} color={config.color}>
        <HStack gap={3}>
          <Text fontSize="2xl">{config.icon}</Text>
          <VStack align="start" gap={0}>
            <Text fontSize="lg" fontWeight="bold">{config.label}</Text>
            <Text fontSize="sm" opacity={0.8}>
              {dateObj.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} at {bookingTime}
            </Text>
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
