"use client";

import { Box, Flex, VStack, Button, IconButton } from "@chakra-ui/react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";
import { PUBLIC_NAV } from "@/lib/constants/navigation";

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box display={{ base: "block", md: "none" }}>
      <IconButton
        aria-label="Toggle menu"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </IconButton>

      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          borderBottomWidth="1px"
          shadow="md"
          py={4}
          px={6}
          zIndex={40}
        >
          <VStack align="stretch" gap={3}>
            {PUBLIC_NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Flex py={2} fontWeight={500}>{item.label}</Flex>
              </Link>
            ))}
            <Link href="/pickup" onClick={() => setIsOpen(false)}>
              <Button size="sm" colorPalette="brand" w="full">Order Now</Button>
            </Link>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
