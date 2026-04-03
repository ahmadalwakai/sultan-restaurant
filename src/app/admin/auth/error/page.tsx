"use client";

import Link from "next/link";
import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";

export default function AdminAuthErrorPage() {
  return (
    <Box minH="screen" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Container maxW="md">
        <Box bg="white" p={8} rounded="xl" shadow="sm" borderWidth={1} textAlign="center">
          <Heading size="lg" fontWeight="bold" color="gray.900" mb={2}>Authentication Error</Heading>
          <Text color="gray.500" mb={4}>Something went wrong during sign in.</Text>
          <Link href="/admin/signin">
            <Button variant="ghost" color="orange.600" _hover={{ textDecoration: "underline" }}>
              Try again
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
