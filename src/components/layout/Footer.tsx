import Link from "next/link";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { SITE_NAME, CONTACT } from "@/lib/constants/site";
import { Logo } from "@/components/shared/Logo";
import { FOOTER_NAV } from "@/lib/constants/navigation";

export function Footer() {
  return (
    <Box as="footer" bg="gray.900" color="gray.300" py={12}>
      <Container maxW="7xl">
        <Flex direction={{ base: "column", md: "row" }} gap={8} mb={8}>
          {/* Brand */}
          <Box flex={1}>
            <Box mb={2}>
              <Logo size="sm" />
            </Box>
            <Text fontSize="sm" mb={1}>{CONTACT.address}</Text>
            <Text fontSize="sm" mb={1}>{CONTACT.phone}</Text>
            <Text fontSize="sm">{CONTACT.email}</Text>
          </Box>

          {/* Quick Links */}
          <Box flex={1}>
            <Text fontWeight="semibold" color="white" mb={3}>Quick Links</Text>
            <Flex direction="column" gap={2}>
              {FOOTER_NAV.quickLinks.map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: "0.875rem" }}>
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Info */}
          <Box flex={1}>
            <Text fontWeight="semibold" color="white" mb={3}>Information</Text>
            <Flex direction="column" gap={2}>
              {FOOTER_NAV.info.map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: "0.875rem" }}>
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Legal */}
          <Box flex={1}>
            <Text fontWeight="semibold" color="white" mb={3}>Legal</Text>
            <Flex direction="column" gap={2}>
              {FOOTER_NAV.legal.map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: "0.875rem" }}>
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Box>
        </Flex>

        <Box borderTopWidth="1px" borderColor="gray.700" pt={6}>
          <Text fontSize="sm" textAlign="center">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
