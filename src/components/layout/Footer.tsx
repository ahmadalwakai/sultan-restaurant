import Link from "next/link";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { SITE_NAME, CONTACT } from "@/lib/constants/site";
import { Logo } from "@/components/shared/Logo";
import { FOOTER_NAV } from "@/lib/constants/navigation";
import { brandColors, brandTypography } from "@/theme/branding";
import { brandGradients } from "@/lib/design";

export function Footer() {
  return (
    <Box as="footer" bg={brandColors.charcoal} color="gray.300" py={12}>
      {/* Top gold edge */}
      <Box h="3px" w="full" bg={brandGradients.footerEdge} mb={-12} mt={-12} position="relative" top={-12} />
      <Container maxW="7xl">
        <Flex direction={{ base: "column", md: "row" }} gap={8} mb={8}>
          {/* Brand */}
          <Box flex={1}>
            <Box mb={2}>
              <Logo size="sm" />
            </Box>
            <Text fontSize="sm" mb={1} fontFamily={brandTypography.fonts.body}>{CONTACT.address}</Text>
            <Text fontSize="sm" mb={1} fontFamily={brandTypography.fonts.body}>{CONTACT.phone}</Text>
            <Text fontSize="sm" fontFamily={brandTypography.fonts.body}>{CONTACT.email}</Text>
          </Box>

          {/* Quick Links */}
          <Box flex={1}>
            <Text
              fontWeight={brandTypography.weights.semibold}
              color="white"
              mb={3}
              fontFamily={brandTypography.fonts.heading}
              fontSize={brandTypography.sizes.body}
              letterSpacing={brandTypography.letterSpacing.wide}
            >
              Quick Links
            </Text>
            <Flex direction="column" gap={2}>
              {FOOTER_NAV.quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: brandTypography.sizes.small,
                    fontFamily: brandTypography.fonts.body,
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Info */}
          <Box flex={1}>
            <Text
              fontWeight={brandTypography.weights.semibold}
              color="white"
              mb={3}
              fontFamily={brandTypography.fonts.heading}
              fontSize={brandTypography.sizes.body}
              letterSpacing={brandTypography.letterSpacing.wide}
            >
              Information
            </Text>
            <Flex direction="column" gap={2}>
              {FOOTER_NAV.info.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: brandTypography.sizes.small,
                    fontFamily: brandTypography.fonts.body,
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Legal */}
          <Box flex={1}>
            <Text
              fontWeight={brandTypography.weights.semibold}
              color="white"
              mb={3}
              fontFamily={brandTypography.fonts.heading}
              fontSize={brandTypography.sizes.body}
              letterSpacing={brandTypography.letterSpacing.wide}
            >
              Legal
            </Text>
            <Flex direction="column" gap={2}>
              {FOOTER_NAV.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: brandTypography.sizes.small,
                    fontFamily: brandTypography.fonts.body,
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Box>
        </Flex>

        <Box borderTopWidth="1px" borderColor="gray.700" pt={6}>
          <Text fontSize="sm" textAlign="center" fontFamily={brandTypography.fonts.body}>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
