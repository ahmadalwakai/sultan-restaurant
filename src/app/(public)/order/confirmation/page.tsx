"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Flex, Box, Text, Heading, Card, Button, Spinner, VStack } from "@chakra-ui/react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi2";

interface OrderDetails {
  orderNumber: string;
  customerEmail: string;
  amount: number;
  status: string;
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifySession() {
      if (!sessionId) {
        setError("No session ID provided");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/checkout/stripe/verify?session_id=${sessionId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error || "Failed to verify payment");
          setLoading(false);
          return;
        }

        setOrder(data.data.order);
      } catch {
        setError("Failed to verify payment");
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, [sessionId]);

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <VStack gap={4}>
          <Spinner size="xl" color="brand.primary" />
          <Text color="fg.muted">Verifying your payment...</Text>
        </VStack>
      </Flex>
    );
  }

  if (error || !order) {
    return (
      <Flex minH="100vh" flexDir="column" align="center" justify="center" bg="gray.50" p={4}>
        <Card.Root bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden" maxW="md">
          <Card.Body p={8} textAlign="center">
            <Box as={HiExclamationCircle} boxSize={16} color="red.500" mx="auto" />
            <Heading mt={4} fontFamily="heading" size="xl" fontWeight="bold" color="fg.default">
              Something went wrong
            </Heading>
            <Text mt={2} color="fg.muted">
              {error || "We couldn't verify your payment. Please contact support."}
            </Text>
            <Link href="/pickup">
              <Button
                mt={6}
                bg="brand.primary"
                color="bg.elevated"
                px={6}
                py={3}
                borderRadius="lg"
                fontWeight="semibold"
                _hover={{ bg: "yellow.500" }}
              >
                Try Again
              </Button>
            </Link>
          </Card.Body>
        </Card.Root>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" flexDir="column" align="center" justify="center" bg="gray.50" p={4}>
      <Card.Root bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden" maxW="md">
        <Card.Body p={8} textAlign="center">
          <Box as={HiCheckCircle} boxSize={16} color="green.500" mx="auto" />
          <Heading mt={4} fontFamily="heading" size="2xl" fontWeight="bold" color="fg.default">
            Order Confirmed!
          </Heading>
          <Text mt={2} color="fg.muted" fontSize="lg">
            Thank you for your order
          </Text>

          <Box mt={6} p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="sm" color="fg.muted">Order Number</Text>
            <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
              {order.orderNumber}
            </Text>
          </Box>

          <Box mt={4} p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="sm" color="fg.muted">Total Paid</Text>
            <Text fontSize="xl" fontWeight="semibold">
              £{order.amount.toFixed(2)}
            </Text>
          </Box>

          <Text mt={6} fontSize="sm" color="fg.muted">
            A confirmation email has been sent to{" "}
            <Text as="span" fontWeight="semibold">{order.customerEmail}</Text>
          </Text>

          <VStack mt={6} gap={3}>
            <Link href={`/orders/${order.orderNumber}`} style={{ width: "100%" }}>
              <Button
                w="full"
                bg="brand.primary"
                color="bg.elevated"
                px={6}
                py={3}
                borderRadius="lg"
                fontWeight="semibold"
                _hover={{ bg: "yellow.500" }}
              >
                View Order Details
              </Button>
            </Link>
            <Link href="/" style={{ width: "100%" }}>
              <Button
                w="full"
                variant="outline"
                borderColor="brand.primary"
                color="brand.primary"
                px={6}
                py={3}
                borderRadius="lg"
                fontWeight="semibold"
                _hover={{ bg: "yellow.50" }}
              >
                Back to Home
              </Button>
            </Link>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
