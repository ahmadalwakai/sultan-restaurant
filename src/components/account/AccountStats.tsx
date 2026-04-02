"use client";

import { SimpleGrid, Box, Text } from "@chakra-ui/react";

interface AccountStatsProps {
  totalOrders: number;
  totalBookings: number;
  totalSpent: string;
}

export default function AccountStats({ totalOrders, totalBookings, totalSpent }: AccountStatsProps) {
  const stats = [
    { label: "Total Orders", value: totalOrders },
    { label: "Total Bookings", value: totalBookings },
    { label: "Total Spent", value: totalSpent },
  ];

  return (
    <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
      {stats.map((s) => (
        <Box key={s.label} bg="white" p={4} borderRadius="lg" shadow="sm" textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="brand.600">{s.value}</Text>
          <Text fontSize="sm" color="gray.500">{s.label}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}
