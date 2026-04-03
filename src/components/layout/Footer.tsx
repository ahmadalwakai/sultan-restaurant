import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/constants/site";
import { Logo } from "@/components/shared/Logo";
import { FOOTER_NAV } from "@/lib/constants/navigation";
import { Box, Container, SimpleGrid, VStack, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box as="footer" bg="bg.elevated" color="text.on-dark" borderTopWidth="1px" borderColor="brand.600">
      <Container maxW="7xl" py={12} px={{ base: 4, md: 6, lg: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={8}>
          {/* Brand column */}
          <VStack align="start" gap={4}>
            <Logo size="sm" />
            <VStack align="start" gap={1.5}>
              <Text fontSize="sm" color="gray.400">{CONTACT.address}</Text>
              <Link href={`tel:${CONTACT.phone}`}>
                <Text fontSize="sm" color="gray.400" _hover={{ color: "white" }}>
                  {CONTACT.phone}
                </Text>
              </Link>
              <Link href={`mailto:${CONTACT.email}`}>
                <Text fontSize="sm" color="gray.400" _hover={{ color: "white" }}>
                  {CONTACT.email}
                </Text>
              </Link>
            </VStack>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="xs" fontWeight={600} color="white" letterSpacing="0.05em" textTransform="uppercase" mb={1}>
              Quick Links
            </Text>
            {FOOTER_NAV.quickLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <Text fontSize="sm" color="gray.400" _hover={{ color: "white" }} transition="colors 0.2s">
                  {item.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Information */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="xs" fontWeight={600} color="white" letterSpacing="0.05em" textTransform="uppercase" mb={1}>
              Information
            </Text>
            {FOOTER_NAV.info.map((item) => (
              <Link key={item.href} href={item.href}>
                <Text fontSize="sm" color="gray.400" _hover={{ color: "white" }} transition="colors 0.2s">
                  {item.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Legal */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="xs" fontWeight={600} color="white" letterSpacing="0.05em" textTransform="uppercase" mb={1}>
              Legal
            </Text>
            {FOOTER_NAV.legal.map((item) => (
              <Link key={item.href} href={item.href}>
                <Text fontSize="sm" color="gray.400" _hover={{ color: "white" }} transition="colors 0.2s">
                  {item.label}
                </Text>
              </Link>
            ))}
          </VStack>
        </SimpleGrid>

        {/* Bottom bar */}
        <Box mt={10} borderTopWidth="1px" borderColor="gray.700" pt={5} textAlign="center">
          <Text fontSize="xs" color="gray.500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
