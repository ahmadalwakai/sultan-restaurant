"use client";

import { AdminSignInForm } from "@/components/admin/auth/AdminSignInForm";
import { Box, VStack, Text } from "@chakra-ui/react";

export default function AdminSignInPage() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} rounded="xl" shadow="sm" border="1px" w="full" maxW="md">
        <VStack textAlign="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            Sultan Admin
          </Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Sign in to manage your restaurant
          </Text>
        </VStack>
        <AdminSignInForm />
      </Box>
    </Box>
  );
}
