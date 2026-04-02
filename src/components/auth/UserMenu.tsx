"use client";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Link href="/auth/signin">
        <Button variant="outline" size="sm">Sign In</Button>
      </Link>
    );
  }

  return (
    <Box position="relative" className="group">
      <UserAvatar name={session.user.name} image={session.user.image} size="sm" />
      <Box
        position="absolute"
        right={0}
        top="100%"
        mt={2}
        bg="white"
        borderRadius="lg"
        shadow="lg"
        p={4}
        minW="200px"
        display="none"
        _groupHover={{ display: "block" }}
        zIndex="dropdown"
      >
        <VStack align="stretch" gap={2}>
          <Text fontWeight="semibold" fontSize="sm">{session.user.name}</Text>
          <Text fontSize="xs" color="gray.500">{session.user.email}</Text>
          <Link href="/account"><Text fontSize="sm" py={1}>My Account</Text></Link>
          <Link href="/account/orders"><Text fontSize="sm" py={1}>My Orders</Text></Link>
          <Button size="sm" variant="ghost" onClick={() => signOut()} w="full">Sign Out</Button>
        </VStack>
      </Box>
    </Box>
  );
}
