"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Container, VStack, Text, Heading, HStack, Button, Link } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { FadeInUp } from "@/components/animation";
import Image from "next/image";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <Box as="section" position="relative" h={{ base: "85vh", md: "90vh" }} overflow="hidden" bg="bg.elevated">
      {/* Parallax background image */}
      <motion.div style={{ y, position: "absolute", inset: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop&q=80"
          alt="Charcoal grilled kebabs and Middle Eastern dishes at Sultan Restaurant Glasgow"
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="100vw"
          unoptimized
        />
      </motion.div>

      {/* Dark overlay with gradient */}
      <Box position="absolute" inset={0} bgGradient="to-t" gradientFrom="blackAlpha.800" gradientTo="blackAlpha.300" />

      {/* Content */}
      <motion.div style={{ opacity }}>
        <Container maxW="6xl" h="full" display="flex" alignItems="center" justifyContent="center" position="relative" zIndex={1}>
          <VStack gap={6} textAlign="center" color="white">
            <FadeInUp>
              <Text fontSize="sm" fontWeight="bold" color="brand.primary" textTransform="uppercase" letterSpacing="widest">
                Authentic Middle Eastern & Indian Cuisine
              </Text>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <Heading fontFamily="heading" size={{ base: "4xl", md: "6xl" }} fontWeight="bold" lineHeight="1.1">
                Welcome to<br />
                <Text as="span" color="brand.primary">Sultan</Text> Restaurant
              </Heading>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <Text fontSize={{ base: "md", md: "xl" }} color="whiteAlpha.900" maxW="xl">
                Charcoal-grilled kebabs, hand-ground spices, and recipes passed down through generations.
                Glasgow's home for authentic Eastern cuisine since 2014.
              </Text>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <HStack gap={4} flexWrap="wrap" justify="center">
                <Link href="/menu">
                  <Button size="lg" bg="brand.primary" color="bg.elevated" borderRadius="full" px={8}
                    _hover={{ bg: "yellow.500", transform: "translateY(-2px)" }} transition="all 0.2s"
                    fontWeight="bold" fontSize="md">
                    Explore Our Menu
                  </Button>
                </Link>
                <Link href="/book">
                  <Button size="lg" variant="outline" borderColor="white" color="white" borderRadius="full" px={8}
                    _hover={{ bg: "whiteAlpha.200" }} fontWeight="bold" fontSize="md">
                    Reserve a Table
                  </Button>
                </Link>
              </HStack>
            </FadeInUp>

            {/* Scroll indicator */}
            <FadeInUp delay={1}>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Box mt={8}>
                  <ChevronDown size={28} color="rgba(255,255,255,0.5)" />
                </Box>
              </motion.div>
            </FadeInUp>
          </VStack>
        </Container>
      </motion.div>
    </Box>
  );
}
