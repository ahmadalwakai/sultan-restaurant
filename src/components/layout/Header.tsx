"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Flex, Container, IconButton, Button } from "@chakra-ui/react";
import { HiMenu, HiX } from "react-icons/hi";
import { PUBLIC_NAV } from "@/lib/constants/navigation";
import { Logo } from "@/components/shared/Logo";
import { brandColors, brandTypography, brandShadows } from "@/theme/branding";
import { zIndex } from "@/lib/design";
import { useOrderModal } from "@/hooks/useOrderModal";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openOrderModal } = useOrderModal();

  return (
    <Box
      as="header"
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.100"
      position="sticky"
      top={0}
      zIndex={zIndex.header}
      boxShadow={brandShadows.header}
    >
      <Container maxW="7xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Link href="/" aria-label="Sultan Restaurant — Home">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <Flex gap={7} display={{ base: "none", md: "flex" }} alignItems="center">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: brandTypography.sizes.small,
                  fontWeight: brandTypography.weights.medium,
                  color: "#374151",
                  fontFamily: brandTypography.fonts.body,
                  letterSpacing: brandTypography.letterSpacing.wide,
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/shisha">
              <Button
                size="sm"
                variant="outline"
                borderColor="#8B5CF6"
                color="#7C3AED"
                borderRadius="full"
                px={5}
                fontWeight={brandTypography.weights.semibold}
                fontSize={brandTypography.sizes.small}
                letterSpacing={brandTypography.letterSpacing.wide}
                textTransform="uppercase"
                _hover={{ bg: "#F5F3FF", borderColor: "#7C3AED" }}
              >
                🌬️ Shisha
              </Button>
            </Link>
            <Link href="/book/wedding">
              <Button
                size="sm"
                variant="outline"
                borderColor={brandColors.gold[500]}
                color={brandColors.gold[600]}
                borderRadius="full"
                px={5}
                fontWeight={brandTypography.weights.semibold}
                fontSize={brandTypography.sizes.small}
                letterSpacing={brandTypography.letterSpacing.wide}
                textTransform="uppercase"
                _hover={{ bg: brandColors.gold[50], borderColor: brandColors.gold[600] }}
              >
                💒 Weddings
              </Button>
            </Link>
            <Link href="/pickup">
              <Button
                size="sm"
                bg={brandColors.gold[600]}
                color="white"
                borderRadius="full"
                px={6}
                fontWeight={brandTypography.weights.semibold}
                fontSize={brandTypography.sizes.small}
                letterSpacing={brandTypography.letterSpacing.wide}
                textTransform="uppercase"
                _hover={{ bg: brandColors.gold[700], boxShadow: brandShadows.cta }}
                onClick={(e) => {
                  e.preventDefault();
                  openOrderModal();
                }}
              >
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
                  style={{
                    padding: "0.75rem 0",
                    fontWeight: brandTypography.weights.medium,
                    fontFamily: brandTypography.fonts.body,
                    fontSize: brandTypography.sizes.body,
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/shisha" onClick={() => setIsOpen(false)}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="#8B5CF6"
                  color="#7C3AED"
                  w="full"
                  borderRadius="full"
                  mb={2}
                  _hover={{ bg: "#F5F3FF" }}
                >
                  🌬️ Shisha Lounge
                </Button>
              </Link>
              <Link href="/book/wedding" onClick={() => setIsOpen(false)}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor={brandColors.gold[500]}
                  color={brandColors.gold[600]}
                  w="full"
                  borderRadius="full"
                  mb={2}
                  _hover={{ bg: brandColors.gold[50] }}
                >
                  💒 Book Wedding
                </Button>
              </Link>
              <Link href="/pickup" onClick={() => setIsOpen(false)}>
                <Button
                  size="sm"
                  bg={brandColors.gold[600]}
                  color="white"
                  w="full"
                  borderRadius="full"
                  _hover={{ bg: brandColors.gold[700] }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    openOrderModal();
                  }}
                >
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
