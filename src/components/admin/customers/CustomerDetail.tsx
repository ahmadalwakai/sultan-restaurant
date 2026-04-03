"use client";

import { Box, Card, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

interface CustomerDetailProps {
  customer: {
    name: string;
    email: string;
    phone?: string | null;
    createdAt: string;
    _count?: { orders: number; bookings: number };
  };
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <Card.Root>
      <Card.Body p={6}>
        <Flex align="center" gap={4}>
          <Flex w={14} h={14} rounded="full" bg="amber.100" align="center" justify="center" fontSize="xl" fontWeight="bold" color="amber.700">
            {customer.name.charAt(0).toUpperCase()}
          </Flex>
          <Box>
            <Heading size="md">{customer.name}</Heading>
            <Text fontSize="sm" color="gray.500">{customer.email}</Text>
            {customer.phone && <Text fontSize="sm" color="gray.400">{customer.phone}</Text>}
          </Box>
        </Flex>
        <SimpleGrid columns={3} gap={4} pt={4} mt={4} borderTopWidth="1px">
          <Box><Text fontSize="xs" color="gray.400">Joined</Text><Text fontWeight="medium">{new Date(customer.createdAt).toLocaleDateString()}</Text></Box>
          <Box><Text fontSize="xs" color="gray.400">Total Orders</Text><Text fontWeight="medium">{customer._count?.orders ?? 0}</Text></Box>
          <Box><Text fontSize="xs" color="gray.400">Total Bookings</Text><Text fontWeight="medium">{customer._count?.bookings ?? 0}</Text></Box>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
}
