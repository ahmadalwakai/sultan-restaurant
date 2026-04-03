"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import { Box, Container, Heading, VStack, Text, Card } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) redirect("/signin");
  if (isLoading) return null;

  return (
    <Box minH="screen" bg="bg.canvas" py={12}>
      <Container maxW="2xl" px={4}>
        <Heading fontFamily="heading" size="lg" fontWeight="bold" color="fg.default">Profile</Heading>
        <Card.Root mt={6} bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
          <Card.Body p={6}>
            <VStack gap={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="fg.muted">Name</Text>
                <Text color="fg.default">{user?.name ?? "-"}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="fg.muted">Email</Text>
                <Text color="fg.default">{user?.email ?? "-"}</Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
