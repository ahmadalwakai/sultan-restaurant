"use client";

import { useAuth } from "@/hooks";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Box, Container, Heading, Text, VStack, HStack, Spinner, SimpleGrid } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default function AccountPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) redirect("/signin");

  if (isLoading) {
    return (
      <Box display="flex" minH="screen" alignItems="center" justifyContent="center">
        <Spinner size="lg" color="orange.500" />
      </Box>
    );
  }

  const links = [
    { href: "/account/orders", label: "My Orders", icon: "📦" },
    { href: "/account/bookings", label: "My Bookings", icon: "📅" },
    { href: "/account/profile", label: "Profile Settings", icon: "⚙️" },
  ];

  return (
    <Box minH="screen" bg="gray.50" py={12}>
      <Container maxW="2xl" px={4}>
        <Heading fontFamily="heading" size="xl" fontWeight="bold" color="gray.900">
          Welcome, {user?.name ?? "User"}
        </Heading>
        <Text mt={1} color="gray.500">{user?.email}</Text>
        <SimpleGrid mt={8} gap={4} columns={1}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Box
                display="flex"
                alignItems="center"
                gap={4}
                rounded="xl"
                bg="white"
                p={5}
                shadow="md"
                transition="all 0.2s"
                _hover={{ shadow: "lg" }}
              >
                <Text fontSize="2xl">{link.icon}</Text>
                <Text fontSize="lg" fontWeight="medium" color="gray.900">{link.label}</Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
