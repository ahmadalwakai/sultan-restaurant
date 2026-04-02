"use client";

import { Box, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";
import AccountNav from "./AccountNav";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction={{ base: "column", md: "row" }} gap={8} maxW="6xl" mx="auto" px={4} py={8}>
      <Box w={{ base: "full", md: "250px" }} flexShrink={0}>
        <AccountNav />
      </Box>
      <Box flex={1}>{children}</Box>
    </Flex>
  );
}
