"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Box, Container, Text, Heading, Button, Card } from "@chakra-ui/react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <Box display="flex" minH="screen" flexDirection="column" alignItems="center" justifyContent="center" bg="gray.50" p={4}>
      <Container maxW="md">
        <Card.Root bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
          <Card.Body p={8} textAlign="center">
            <Text fontSize="5xl">⚠️</Text>
            <Heading mt={4} fontFamily="heading" size="lg" fontWeight="bold" color="fg.default">
              Authentication Error
            </Heading>
            <Text mt={2} color="fg.muted">
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
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
