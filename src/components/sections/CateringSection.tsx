"use client";

import { Box, Container, SimpleGrid, VStack, Heading, Text, Button, HStack, Icon, List } from "@chakra-ui/react";
import { LuUsers, LuCalendar, LuMapPin, LuPhone, LuCheck } from "react-icons/lu";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";

const cateringFeatures = [
  "Corporate events & meetings",
  "Wedding & engagement parties",
  "Birthday celebrations",
  "Family gatherings",
  "Office lunches",
  "Private dining experiences",
];

const cateringStats = [
  { icon: LuUsers, value: "500+", label: "Events Catered" },
  { icon: LuCalendar, value: "15+", label: "Years Experience" },
  { icon: LuMapPin, value: "30mi", label: "Service Radius" },
];

/**
 * CateringSection - Promotes catering and private events services
 * Features image, feature list, stats, and CTA
 */
export function CateringSection() {
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24 }} 
      bg="bg.elevated"
      position="relative"
    >
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 12, lg: 16 }} alignItems="center">
          {/* Left - Content */}
          <VStack align="start" gap={8}>
            <FadeInUp>
              <VStack align="start" gap={4}>
                <Text
                  color="brand.primary"
                  fontWeight="bold"
                  fontSize="sm"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  Catering Services
                </Text>
                <Heading
                  as="h2"
                  size={{ base: "xl", md: "2xl" }}
                  style={{ color: "#FFFFFF" }}
                  fontFamily="heading"
                  lineHeight="tight"
                >
                  Bring Sultan to Your Event
                </Heading>
                <Text style={{ color: "rgba(255,255,255,0.9)" }} fontSize="lg" lineHeight="tall">
                  From intimate gatherings to grand celebrations, our catering team 
                  delivers the same authentic flavours and impeccable service that 
                  Sultan is known for — directly to your venue.
                </Text>
              </VStack>
            </FadeInUp>

            {/* Feature list */}
            <FadeInUp delay={0.2}>
              <SimpleGrid columns={2} gap={3}>
                {cateringFeatures.map((feature) => (
                  <HStack key={feature} gap={2}>
                    <Icon as={LuCheck} color="brand.primary" boxSize={4} />
                    <Text fontSize="sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </FadeInUp>

            {/* Stats */}
            <FadeInUp delay={0.3}>
              <HStack gap={8} pt={4}>
                {cateringStats.map((stat) => (
                  <VStack key={stat.label} gap={1}>
                    <Icon as={stat.icon} color="brand.primary" boxSize={6} />
                    <Text fontSize="2xl" fontWeight="bold" style={{ color: "#FFFFFF" }} fontFamily="heading">
                      {stat.value}
                    </Text>
                    <Text fontSize="xs" style={{ color: "rgba(255,255,255,0.7)" }} textTransform="uppercase" letterSpacing="wide">
                      {stat.label}
                    </Text>
                  </VStack>
                ))}
              </HStack>
            </FadeInUp>

            {/* CTAs */}
            <FadeInUp delay={0.4}>
              <HStack gap={4} pt={4}>
                <Link href="/contact" passHref>
                  <Button
                    bg="brand.primary"
                    color="bg.canvas"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ bg: "brand.primaryHover", transform: "translateY(-2px)" }}
                    transition="all 0.2s"
                  >
                    Request a Quote
                  </Button>
                </Link>
                <Link href="tel:+441413918883" passHref>
                  <Button
                    variant="outline"
                    borderColor="brand.primary"
                    color="brand.primary"
                    size="lg"
                    _hover={{ bg: "rgba(200, 169, 81, 0.1)" }}
                  >
                    <Icon as={LuPhone} mr={2} />
                    Call Us
                  </Button>
                </Link>
              </HStack>
            </FadeInUp>
          </VStack>

          {/* Right - Image */}
          <FadeInUp delay={0.2}>
            <Box
              position="relative"
              h={{ base: "350px", md: "500px" }}
              borderRadius="2xl"
              overflow="hidden"
              shadow="2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop&q=80"
                alt="Catering spread with Middle Eastern dishes"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Premium badge overlay */}
              <Box
                position="absolute"
                top={6}
                right={6}
                bg="brand.primary"
                color="bg.canvas"
                px={4}
                py={2}
                borderRadius="full"
                fontWeight="bold"
                fontSize="sm"
                shadow="lg"
              >
                Premium Catering
              </Box>
              {/* Gradient overlay */}
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(to top, rgba(26, 15, 10, 0.4) 0%, transparent 50%)"
              />
            </Box>
          </FadeInUp>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
