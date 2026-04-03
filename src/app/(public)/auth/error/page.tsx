"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Box, Container, Text, Heading, Button } from "@chakra-ui/react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <Box display="flex" minH="screen" flexDirection="column" alignItems="center" justifyContent="center" bg="gray.50" p={4}>
      <Container maxW="md">
        <Box rounded="2xl" bg="white" p={8} textAlign="center" shadow="lg">
          <Text fontSize="5xl">⚠️</Text>
          <Heading mt={4} fontFamily="heading" size="lg" fontWeight="bold" color="gray.900">
            Authentication Error
          </Heading>
          <Text mt={2} color="gray.600">
            {error === "OAuthAccountNotLinked"
              ? "This email is already associated with another account."
              : "An error occurred during sign in. Please try again."}
          </Text>
          <Link href="/signin">
            <Button
              mt={6}
              rounded="lg"
              bg="orange.500"
              px={6}
              py={3}
              fontWeight="semibold"
              color="white"
              _hover={{ bg: "orange.600" }}
            >
              Try Again
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
