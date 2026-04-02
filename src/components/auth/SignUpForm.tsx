"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import GoogleSignInButton from "./GoogleSignInButton";

export default function SignUpForm() {
  return (
    <Box maxW="md" mx="auto" py={16} px={4}>
      <VStack gap={6} bg="white" p={8} borderRadius="xl" shadow="sm">
        <Heading as="h1" fontSize="2xl" fontFamily="var(--font-heading)">Create Account</Heading>
        <Text color="gray.600" textAlign="center">
          Create an account to track orders and manage bookings.
        </Text>
        <GoogleSignInButton />
      </VStack>
    </Box>
  );
}
