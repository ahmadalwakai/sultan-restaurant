import Link from "next/link";
import Image from "next/image";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

export function AboutPreview() {
  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="bg.canvas">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 10, md: 16 }}>
          <Box w={{ base: "full", lg: "5/12" }}>
            <Box position="relative" css={{ aspectRatio: "4/5" }} overflow="hidden" borderRadius="2xl" shadow="lg">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1000&fit=crop&q=80"
                alt="Sultan Restaurant interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                unoptimized
              />
            </Box>
          </Box>
          <Box flex={1} lg={{ w: "7/12" }}>
            <Text fontSize="xs" fontWeight={600} textTransform="uppercase" letterSpacing="widest" color="orange.600">
              Est. 2012 &middot; Glasgow
            </Text>
            <Heading as="h2" mt={3} fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="gray.900">
              Our Story
            </Heading>
            <Text mt={2} fontSize="lg" color="gray.400">
              A taste of the Middle East in the heart of the city
            </Text>
            <Text mt={6} fontSize="base" lineHeight="relaxed" color="gray.600">
              Sultan Restaurant brings together the finest flavours from Iraq, Lebanon, Syria, 
              and India. Our chefs use authentic recipes passed down through generations, combined 
              with the freshest locally sourced ingredients.
            </Text>
            <Text mt={4} fontSize="base" lineHeight="relaxed" color="gray.600">
              Whether you&apos;re craving a traditional mixed grill, creamy hummus, or aromatic 
              biryani, every dish is prepared with passion and served with warmth.
            </Text>
            <Link href="/contact">
            <Box
              display="inline-flex"
              alignItems="center"
              gap={2}
              mt={8}
              borderRadius="lg"
              borderWidth="2px"
              borderColor="gray.900"
              px={7}
              py={3}
              fontSize="sm"
              fontWeight={600}
              color="gray.900"
              transition="all 0.2s"
              _hover={{ bg: "gray.900", color: "white" }}
            >
              Learn More About Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Box>
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
