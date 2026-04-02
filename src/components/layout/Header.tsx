"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Flex, Container, IconButton, Button } from "@chakra-ui/react";
import { HiMenu, HiX } from "react-icons/hi";
import { PUBLIC_NAV } from "@/lib/constants/navigation";
import { Logo } from "@/components/shared/Logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box as="header" bg="white" borderBottomWidth="1px" position="sticky" top={0} zIndex={50}>
      <Container maxW="7xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <Flex gap={6} display={{ base: "none", md: "flex" }} alignItems="center">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ fontSize: "0.9rem", fontWeight: 500, color: "#374151" }}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/pickup">
              <Button size="sm" bg="brand.600" color="white" _hover={{ bg: "brand.700" }}>
                Order Now
              </Button>
            </Link>
          </Flex>

          {/* Mobile Toggle */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Toggle menu"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </IconButton>
        </Flex>

        {/* Mobile Nav */}
        {isOpen && (
          <Box display={{ md: "none" }} pb={4}>
            <Flex direction="column" gap={3}>
              {PUBLIC_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ padding: "0.5rem 0", fontWeight: 500 }}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/pickup" onClick={() => setIsOpen(false)}>
                <Button size="sm" bg="brand.600" color="white" w="full">
                  Order Now
                </Button>
              </Link>
            </Flex>
          </Box>
        )}
      </Container>
    </Box>
  );
}
