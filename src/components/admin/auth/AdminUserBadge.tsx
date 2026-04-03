"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface AdminUserBadgeProps {
  name: string;
  email: string;
}

export function AdminUserBadge({ name, email }: AdminUserBadgeProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/admin/logout", { method: "POST" });
    router.push("/admin/signin");
    router.refresh();
  }

  return (
    <Flex align="center" gap={3}>
      <Flex w={8} h={8} rounded="full" bg="amber.100" align="center" justify="center" color="amber.700" fontWeight="semibold" fontSize="sm">
        {name.charAt(0).toUpperCase()}
      </Flex>
      <Box display={{ base: "none", md: "block" }}>
        <Text fontSize="sm" fontWeight="medium" color="gray.900">{name}</Text>
        <Text fontSize="xs" color="gray.500">{email}</Text>
      </Box>
      <Button
        onClick={handleLogout}
        variant="ghost"
        size="xs"
        color="gray.400"
        _hover={{ color: "red.500" }}
        ml={2}
      >
        Logout
      </Button>
    </Flex>
  );
}
