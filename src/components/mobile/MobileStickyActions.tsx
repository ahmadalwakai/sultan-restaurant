"use client";

import { HStack, Button, Box } from "@chakra-ui/react";
import Link from "next/link";

export default function MobileStickyActions() {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTopWidth="1px"
      p={3}
      display={{ base: "block", md: "none" }}
      zIndex={40}
    >
      <HStack gap={2}>
        <Link href="/menu" style={{ flex: 1 }}>
          <Button w="full" variant="outline" colorPalette="brand" size="sm">Menu</Button>
        </Link>
        <Link href="/book" style={{ flex: 1 }}>
          <Button w="full" variant="outline" colorPalette="brand" size="sm">Book</Button>
        </Link>
        <Link href="/pickup" style={{ flex: 1 }}>
          <Button w="full" colorPalette="brand" size="sm">Order</Button>
        </Link>
      </HStack>
    </Box>
  );
}
