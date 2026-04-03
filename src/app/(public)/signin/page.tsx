"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { Box, VStack, Text, Button, Card } from "@chakra-ui/react";

export default function SignInPage() {
  return (
    <Box display="flex" minH="100vh" alignItems="center" justifyContent="center" bg="gray.50" p={4}>
      <Card.Root bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden" w="full" maxW="sm">
        <Card.Body p={8}>
          <VStack gap={0} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="fg.default" fontFamily="heading">
              Sign In
            </Text>
            <Text mt={2} fontSize="sm" color="fg.muted">
              Sign in to manage your orders and bookings
            </Text>
          </VStack>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            mt={8}
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
            rounded="lg"
            border="2px"
            px={4}
            py={3}
            fontWeight="medium"
            color="fg.default"
            transition="colors"
            _hover={{ bg: "bg.subtle" }}
            variant="outline"
          >
            <svg width={20} height={20} viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
          <Text mt={6} textAlign="center" fontSize="sm" color="fg.muted">
            <Link href="/" style={{ color: "#C8A951", textDecoration: "underline" }}>
              Back to Home
            </Link>
          </Text>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
