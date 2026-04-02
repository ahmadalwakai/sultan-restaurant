import Link from "next/link";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { SITE_NAME, CONTACT } from "@/lib/constants/site";
import { Logo } from "@/components/shared/Logo";
import { FOOTER_NAV } from "@/lib/constants/navigation";
import { brandColors, brandTypography, brandSpacing } from "@/theme/branding";
import { brandCopy } from "@/lib/content";

export function Footer() {
  return (
    <Box as="footer" bg={brandColors.charcoal} color="gray.300">
      {/* Gold separator line */}
      <Box h="3px" w="full" bgGradient="to-r" gradientFrom={brandColors.gold[600]} gradientVia={brandColors.gold[400]} gradientTo={brandColors.gold[600]} />
      <Container maxW={brandSpacing.maxWidth.full} py={12} px={{ base: 5, md: 8, lg: 12 }}>
        <Flex direction={{ base: "column", md: "row" }} gap={8} mb={8}>
          {/* Brand */}
          <Box flex={1.2}>
            <Box mb={3}>
              <Logo size="sm" />
            </Box>
            <Text
              fontSize="sm"
              mb={2}
              fontFamily={brandTypography.fonts.body}
              color="rgba(255,255,255,0.55)"
              lineHeight="tall"
              maxW="280px"
            >
              {brandCopy.footerTagline}
            </Text>
            <Text fontSize="sm" mb={1} fontFamily={brandTypography.fonts.body} color="rgba(255,255,255,0.65)">{CONTACT.address}</Text>
            <Text fontSize="sm" mb={1} fontFamily={brandTypography.fonts.body} color="rgba(255,255,255,0.65)">{CONTACT.phone}</Text>
            <Text fontSize="sm" fontFamily={brandTypography.fonts.body} color="rgba(255,255,255,0.65)">{CONTACT.email}</Text>
          </Box>

          {/* Quick Links */}
          <Box flex={1}>
            <Text
              fontWeight={brandTypography.weights.semibold}
              color="white"
              mb={3}
              fontFamily={brandTypography.fonts.heading}
              fontSize={brandTypography.sizes.small}
              letterSpacing={brandTypography.letterSpacing.wider}
              textTransform="uppercase"
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
                    color: "rgba(255,255,255,0.55)",
                    transition: "color 0.2s",
                    textDecoration: "none",
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
              fontSize={brandTypography.sizes.small}
              letterSpacing={brandTypography.letterSpacing.wider}
              textTransform="uppercase"
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
                    color: "rgba(255,255,255,0.55)",
                    transition: "color 0.2s",
                    textDecoration: "none",
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
              fontSize={brandTypography.sizes.small}
              letterSpacing={brandTypography.letterSpacing.wider}
              textTransform="uppercase"
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
                    color: "rgba(255,255,255,0.55)",
                    transition: "color 0.2s",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Box>
        </Flex>

        <Box borderTopWidth="1px" borderColor="rgba(255,255,255,0.1)" pt={6}>
          <Text
            fontSize="xs"
            textAlign="center"
            fontFamily={brandTypography.fonts.body}
            color="rgba(255,255,255,0.4)"
          >
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
