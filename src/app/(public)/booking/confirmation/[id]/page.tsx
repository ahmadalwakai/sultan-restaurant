"use client";

import { use } from "react";
import Link from "next/link";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";

export default function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Flex minH="screen" flexDir="column" align="center" justify="center" bg="gray.50" p={4}>
      <Box rounded="2xl" bg="white" p={8} textAlign="center" shadow="lg">
        <Text fontSize="6xl">✅</Text>
        <Heading mt={4} fontFamily="heading" size="3xl" fontWeight="bold" color="gray.900">
          Booking Confirmed!
        </Heading>
        <Text mt={2} color="gray.600">
          Your booking reference is: <strong>{id}</strong>
        </Text>
        <Text mt={1} fontSize="sm" color="gray.500">
          We&apos;ve sent a confirmation email with all the details.
        </Text>
        <Link
          href="/"
          className="inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
        >
          Back to Home
        </Link>
      </Box>
    </Flex>
  );
}
