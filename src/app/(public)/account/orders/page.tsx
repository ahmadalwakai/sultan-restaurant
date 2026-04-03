"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default function AccountOrdersPage() {
  const { isAuthenticated, isLoading } = useAuth();
  if (!isLoading && !isAuthenticated) redirect("/signin");

  return (
    <Box minH="screen" bg="gray.50" py={12}>
      <Container maxW="3xl" px={4}>
        <Link href="/account" className="text-sm text-amber-600 hover:underline">
          &larr; Account
        </Link>
        <Heading mt={4} fontFamily="heading" size="xl" fontWeight="bold">My Orders</Heading>
        <Box mt={6} rounded="2xl" bg="white" p={6} shadow="lg">
          <Text textAlign="center" color="gray.500">No orders yet. Start by browsing our menu!</Text>
          <Box mt={4} textAlign="center">
            <Link href="/menu" className="text-amber-600 font-semibold hover:underline">
              View Menu
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
