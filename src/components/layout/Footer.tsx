import Link from "next/link";
import { Box, Container, SimpleGrid, VStack, Text, HStack, Heading } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box as="footer" bg="bg.elevated" color="fg.on-dark" py={16}>
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={10}>
          {/* Column 1: Brand */}
          <VStack align="start" gap={4}>
            <Heading size="lg" fontFamily="heading" color="brand.primary">Sultan</Heading>
            <Text fontSize="sm" color="whiteAlpha.700" lineHeight="tall">
              Authentic Middle Eastern & Indian cuisine in the heart of Glasgow's East End.
              Charcoal grills, fresh spices, and a warm welcome since 2014.
            </Text>
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
              <Text fontSize="sm" color="whiteAlpha.700">Mon – Thu</Text>
              <Text fontSize="sm" color="whiteAlpha.700">12:00 – 10:00 PM</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="whiteAlpha.700">Fri – Sat</Text>
              <Text fontSize="sm" color="whiteAlpha.700">12:00 – 11:00 PM</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="whiteAlpha.700">Sunday</Text>
              <Text fontSize="sm" color="whiteAlpha.700">1:00 – 10:00 PM</Text>
            </HStack>
          </VStack>
        </SimpleGrid>

        {/* Bottom bar */}
        <Box borderTop="1px solid" borderColor="whiteAlpha.200" mt={12} pt={8}>
          <HStack justify="space-between" flexWrap="wrap" gap={4}>
            <Text fontSize="xs" color="whiteAlpha.500">
              © 2025 Sultan Restaurant. All rights reserved. Custom-built by Ahmad Alwakai.
            </Text>
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
