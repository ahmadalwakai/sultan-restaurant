"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import GoogleSignInButton from "./GoogleSignInButton";

export default function SignInForm() {
  return (
    <Box maxW="md" mx="auto" py={16} px={4}>
      <VStack gap={6} bg="white" p={8} borderRadius="xl" shadow="sm">
        <Heading as="h1" fontSize="2xl" fontFamily="var(--font-heading)">Sign In</Heading>
        <Text color="gray.600" textAlign="center">
          Sign in to manage your orders and bookings.
        </Text>
        <GoogleSignInButton />
      </VStack>
    </Box>
  );
}
