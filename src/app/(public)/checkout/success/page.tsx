"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Box, VStack, Text, Heading, Flex, Card, Button } from "@chakra-ui/react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <Flex minH="screen" flexDir="column" align="center" justify="center" bg="bg.canvas" p={4}>
      <Card.Root maxW="md" bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
        <Card.Body p={8} textAlign="center">
          <Text fontSize="6xl">🎉</Text>
          <Heading mt={4} fontFamily="heading" size="3xl" fontWeight="bold" color="fg.default">
            Order Placed!
          </Heading>
          <Text mt={2} color="fg.muted">Thank you for your order.</Text>
          {orderId && (
            <Text mt={1} fontSize="sm" color="fg.muted">
              Order reference: <strong>{orderId}</strong>
            </Text>
          )}
          <VStack mt={6} gap={3}>
            {orderId && (
              <Link href={`/orders/${orderId}/track`}>
                <Button
                  bg="brand.primary"
                  color="bg.elevated"
                  px={6}
                  py={3}
                  borderRadius="lg"
                  fontWeight="semibold"
                  _hover={{ bg: "yellow.500" }}
                  w="full"
                >
                  Track Order
                </Button>
              </Link>
            )}
            <Link href="/menu">
              <Button
                variant="outline"
                borderColor="gray.300"
                color="fg.default"
                px={6}
                py={3}
                borderRadius="lg"
                fontWeight="medium"
                _hover={{ bg: "bg.subtle" }}
                w="full"
              >
                Back to Menu
              </Button>
            </Link>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
