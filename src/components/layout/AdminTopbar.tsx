"use client";

import { Flex, Text, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <Flex
      as="header"
      h="14"
      px={6}
      bg="white"
      borderBottomWidth="1px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontWeight="semibold" color="gray.700">Sultan Admin</Text>
      <HStack gap={3}>
        <Link href="/" target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="ghost">View Site</Button>
        </Link>
        <Button size="sm" variant="outline" onClick={handleLogout}>Logout</Button>
      </HStack>
    </Flex>
  );
}
