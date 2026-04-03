"use client";

import { use } from "react";
import { useOrderTracking } from "@/hooks/checkout";
import { LoadingState } from "@/components/shared/LoadingState";
import Link from "next/link";
import { Box, Container, Heading, Text, Flex, VStack, HStack } from "@chakra-ui/react";

const statusSteps = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"];

export default function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderTracking(id);

  if (isLoading) return <LoadingState message="Loading..." />;
  if (!order) return <Box p={8} textAlign="center">Order not found</Box>;

  const currentIdx = statusSteps.indexOf(order.status);

  return (
    <Box minH="screen" bg="gray.50" py={12}>
      <Container maxW="2xl" px={4}>
        <Link href="/" className="text-sm text-amber-600 hover:underline">&larr; Home</Link>
        <Box mt={4} rounded="2xl" bg="white" p={6} shadow="lg">
          <Heading fontFamily="heading" size="xl" fontWeight="bold">Track Order #{order.orderNumber}</Heading>
          <Box mt={8}>
            <Flex justify="space-between">
              {statusSteps.map((step, i) => (
                <VStack key={step} align="center">
                  <Box
                    h={10}
                    w={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    rounded="full"
                    fontSize="sm"
                    fontWeight="bold"
                    bg={i <= currentIdx ? "amber.500" : "gray.200"}
                    color={i <= currentIdx ? "white" : "gray.400"}
                  >
                    {i + 1}
                  </Box>
                  <Text mt={2} fontSize="xs" fontWeight="medium" color="gray.500">
                    {step.charAt(0) + step.slice(1).toLowerCase()}
                  </Text>
                </VStack>
              ))}
            </Flex>
            <Box mt={4} h={1} rounded="full" bg="gray.200">
              <Box
                h="full"
                rounded="full"
                bg="amber.500"
                transition="all"
                style={{ width: `${(currentIdx / (statusSteps.length - 1)) * 100}%` }}
              />
            </Box>
          </Box>
          <Text mt={6} textAlign="center" fontSize="sm" color="gray.500">
            This page refreshes automatically every 30 seconds
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
