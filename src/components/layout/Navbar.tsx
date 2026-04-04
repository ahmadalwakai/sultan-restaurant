"use client";

import { Box, Flex, Container, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { PUBLIC_NAV } from "@/lib/constants/navigation";
import { SITE_NAME } from "@/lib/constants/site";
import { useOrderModal } from "@/hooks/useOrderModal";

export default function Navbar() {
  const { open: openOrderModal } = useOrderModal();
  
  return (
    <Box as="nav" bg="white" borderBottomWidth="1px" position="sticky" top={0} zIndex={50}>
      <Container maxW="7xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Link href="/" style={{ fontWeight: 700, fontSize: "1.25rem", color: "#B8860B" }}>
            {SITE_NAME}
          </Link>
          <HStack gap={6} display={{ base: "none", md: "flex" }}>
            {PUBLIC_NAV.map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
            <Button size="sm" colorPalette="brand" onClick={openOrderModal}>Order Now</Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
