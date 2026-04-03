"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import { Box, Container, Heading, VStack, Text } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) redirect("/signin");
  if (isLoading) return null;

  return (
    <Box minH="screen" bg="gray.50" py={12}>
      <Container maxW="2xl" px={4}>
        <Heading fontFamily="heading" size="lg" fontWeight="bold">Profile</Heading>
        <Box mt={6} rounded="2xl" bg="white" p={6} shadow="lg">
          <VStack gap={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">Name</Text>
              <Text color="gray.900">{user?.name ?? "-"}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">Email</Text>
              <Text color="gray.900">{user?.email ?? "-"}</Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
