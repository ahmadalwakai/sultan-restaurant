import Link from "next/link";
import { Box, Container, SimpleGrid, VStack, Text, HStack, Heading } from "@chakra-ui/react";
import { ArabicPatternOverlay } from "@/components/decorative/ArabicPattern";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { SOCIAL } from "@/lib/constants/site";
import { glasgowAreas } from "@/data/seo/glasgow-areas";

export function Footer() {
  return (
    <Box as="footer" bg="bg.elevated" color="fg.on-dark" py={16} position="relative" overflow="hidden">
      <ArabicPatternOverlay opacity={0.02} />
      <Container maxW="7xl" px={{ base: 5, md: 8 }} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap={10}>
          {/* Column 1: Brand */}
          <VStack align="start" gap={4}>
            <Heading size="lg" fontFamily="heading" color="brand.primary">Sultan</Heading>
            <Text fontSize="sm" color="whiteAlpha.700" lineHeight="tall">
              Authentic Middle Eastern & Indian cuisine in the heart of Glasgow's East End.
              Charcoal grills, fresh spices, and a warm welcome since 2014.
            </Text>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <a 
                href={SOCIAL.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.2s" }}
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href={SOCIAL.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.2s" }}
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href={SOCIAL.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.2s" }}
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </VStack>

          {/* Column 2: Quick Links */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color="fg.on-dark" fontSize="sm" textTransform="uppercase" letterSpacing="wider">Navigate</Text>
            {["Menu", "Book a Table", "Order Pickup", "Offers", "Gallery", "About Us", "Contact"].map(link => (
              <Link key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`}>
                <Text fontSize="sm" color="whiteAlpha.700" _hover={{ color: "brand.primary" }} transition="color 0.2s">
                  {link}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Column 3: Contact */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color="fg.on-dark" fontSize="sm" textTransform="uppercase" letterSpacing="wider">Visit Us</Text>
            <Text fontSize="sm" color="whiteAlpha.700">577 Gallowgate</Text>
            <Text fontSize="sm" color="whiteAlpha.700">Glasgow G40 2PE</Text>
            <Text fontSize="sm" color="whiteAlpha.700">Scotland, UK</Text>
            <Text fontSize="sm" color="brand.primary" fontWeight="bold" mt={2}>+44 141 391 8883</Text>
            <Text fontSize="sm" color="whiteAlpha.700">info@sultanrestaurant.co.uk</Text>
          </VStack>

          {/* Column 4: Hours */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color="fg.on-dark" fontSize="sm" textTransform="uppercase" letterSpacing="wider">Opening Hours</Text>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="whiteAlpha.700">Every Day</Text>
              <Text fontSize="sm" color="whiteAlpha.700">12:00 PM – 9:00 PM</Text>
            </HStack>
          </VStack>

          {/* Column 5: Areas We Serve */}
          <VStack align="start" gap={3}>
            <Text fontWeight="bold" color="fg.on-dark" fontSize="sm" textTransform="uppercase" letterSpacing="wider">Areas We Serve</Text>
            {glasgowAreas
              .filter((a) => ["city-centre", "gallowgate", "dennistoun", "parkhead", "shawlands", "partick", "rutherglen"].includes(a.slug))
              .slice(0, 6)
              .map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`}>
                  <Text fontSize="sm" color="whiteAlpha.700" _hover={{ color: "brand.primary" }} transition="color 0.2s">
                    {area.name}
                  </Text>
                </Link>
              ))}
            <Link href="/areas">
              <Text fontSize="sm" color="brand.primary" _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
                View all areas →
              </Text>
            </Link>
          </VStack>
        </SimpleGrid>

        {/* Bottom bar */}
        <Box borderTop="1px solid" borderColor="whiteAlpha.200" mt={12} pt={8}>
          <HStack justify="space-between" flexWrap="wrap" gap={4}>
            <VStack align="start" gap={1}>
              <Text fontSize="xs" color="whiteAlpha.500">
                © 2025 Sultan Restaurant. All rights reserved.
              </Text>
              <Text fontSize="xs" color="whiteAlpha.300">
                Custom-built by{" "}
                <a
                  href="https://github.com/ahmadalwakai"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Ahmad Alwakai
                </a>
                {" "}— Next.js, React, TypeScript, PostgreSQL
              </Text>
            </VStack>
            <HStack gap={4}>
              <Link href="/privacy"><Text fontSize="xs" color="whiteAlpha.500" _hover={{ color: "brand.primary" }}>Privacy</Text></Link>
              <Link href="/terms"><Text fontSize="xs" color="whiteAlpha.500" _hover={{ color: "brand.primary" }}>Terms</Text></Link>
              <Link href="/cookies"><Text fontSize="xs" color="whiteAlpha.500" _hover={{ color: "brand.primary" }}>Cookies</Text></Link>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
