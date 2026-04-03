"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Box, VStack, Text, Heading, Flex } from "@chakra-ui/react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <Flex minH="screen" flexDir="column" align="center" justify="center" bg="gray.50" p={4}>
      <Box maxW="md" rounded="2xl" bg="white" p={8} textAlign="center" shadow="lg">
        <Text fontSize="6xl">🎉</Text>
        <Heading mt={4} fontFamily="heading" size="3xl" fontWeight="bold" color="gray.900">
          Order Placed!
        </Heading>
        <Text mt={2} color="gray.600">Thank you for your order.</Text>
        {orderId && (
          <Text mt={1} fontSize="sm" color="gray.500">
            Order reference: <strong>{orderId}</strong>
          </Text>
        )}
        <VStack mt={6} gap={3}>
          {orderId && (
            <Link
              href={`/orders/${orderId}/track`}
              className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
            >
              Track Order
            </Link>
          )}
          <Link
            href="/menu"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 hover:bg-gray-50"
          >
            Back to Menu
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
}
