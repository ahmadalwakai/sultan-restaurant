"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, VStack, HStack, Heading, Text, Button, SimpleGrid, Badge } from "@chakra-ui/react";
import { LuClock, LuUsers, LuCalendar, LuMapPin, LuPhone, LuStar, LuCheck, LuInfo } from "react-icons/lu";
import { motion } from "framer-motion";
import { ShishaBookingForm } from "@/components/shisha/ShishaBookingForm";
import { ShishaMenuPreview } from "@/components/shisha/ShishaMenuPreview";
import { ShishaGallery } from "@/components/shisha/ShishaGallery";

const MotionBox = motion.create(Box);

type TableAvailability = {
  totalTables: number;
  availableTables: number;
  isAvailable: boolean;
};

export default function ShishaPage() {
  const [availability, setAvailability] = useState<TableAvailability | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Check current availability
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().slice(0, 5);
    
    fetch(`/api/shisha/tables/available?date=${date}&time=${time}&guests=2`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAvailability(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Box bg="#0D0906">
      {/* Hero Section */}
      <Box
        position="relative"
        minH={{ base: "90vh", md: "85vh" }}
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        {/* Background Image */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
        >
          <Image
            src="https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=1920&q=80"
            alt="Premium Shisha Lounge"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <Box
            position="absolute"
            inset={0}
            bg="linear-gradient(to bottom, rgba(13,9,6,0.7) 0%, rgba(13,9,6,0.85) 100%)"
          />
        </Box>

        <Container maxW="6xl" position="relative" zIndex={1} py={{ base: 16, md: 20 }}>
          <VStack gap={8} textAlign="center" color="white">
            {/* Availability Badge */}
            {availability && (
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  bg={availability.isAvailable ? "green.500" : "orange.500"}
                  color="white"
                >
                  {availability.isAvailable 
                    ? `${availability.availableTables} Tables Available Now`
                    : "Limited Availability"}
                </Badge>
              </MotionBox>
            )}

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Text
                fontSize={{ base: "sm", md: "md" }}
                textTransform="uppercase"
                letterSpacing="0.3em"
                color="#C8A951"
                fontWeight="600"
              >
                Sultan Restaurant Glasgow
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="800"
                lineHeight="1.1"
                fontFamily="heading"
              >
                Premium Shisha
                <br />
                <Text as="span" color="#C8A951">Lounge</Text>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              maxW="2xl"
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="whiteAlpha.800"
                lineHeight="1.7"
              >
                Experience the finest shisha in Glasgow. Premium flavours, fresh mocktails, 
                hot & cold drinks in our exclusive outdoor lounge area. 
                Book your table online for a memorable evening.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HStack gap={4} flexWrap="wrap" justifyContent="center">
                <Button
                  size="lg"
                  bg="#C8A951"
                  color="#0D0906"
                  px={8}
                  fontWeight="700"
                  borderRadius="full"
                  _hover={{ bg: "#B89841", transform: "scale(1.02)" }}
                  onClick={() => setShowBooking(true)}
                >
                  <LuCalendar style={{ marginRight: "8px" }} />
                  Book a Table
                </Button>
                <Link href="/shisha/menu">
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="white"
                    color="white"
                    px={8}
                    fontWeight="600"
                    borderRadius="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    View Menu
                  </Button>
                </Link>
              </HStack>
            </MotionBox>

            {/* Quick Info */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              pt={8}
            >
              <HStack
                gap={{ base: 4, md: 8 }}
                flexWrap="wrap"
                justifyContent="center"
                color="whiteAlpha.700"
                fontSize="sm"
              >
                <HStack gap={2}>
                  <LuClock size={16} />
                  <Text>Open Daily 4PM - 12AM</Text>
                </HStack>
                <HStack gap={2}>
                  <LuUsers size={16} />
                  <Text>10 Tables</Text>
                </HStack>
                <HStack gap={2}>
                  <LuMapPin size={16} />
                  <Text>Outdoor Terrace</Text>
                </HStack>
              </HStack>
            </MotionBox>
          </VStack>
        </Container>

        {/* Scroll Indicator */}
        <Box
          position="absolute"
          bottom={8}
          left="50%"
          transform="translateX(-50%)"
          color="whiteAlpha.500"
          animation="bounce 2s infinite"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 16l-6-6h12l-6 6z" />
          </svg>
        </Box>
      </Box>

      {/* Legal Compliance Notice */}
      <Box bg="#1A0F0A" py={4}>
        <Container maxW="6xl">
          <HStack 
            gap={3} 
            color="whiteAlpha.700" 
            fontSize="sm"
            justifyContent="center"
            flexWrap="wrap"
            textAlign="center"
          >
            <LuInfo size={16} />
            <Text>
              Our shisha lounge is located in a legally compliant outdoor/ventilated area 
              in accordance with Scottish smoking legislation. 18+ only.
            </Text>
          </HStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg="#1A0F0A" py={{ base: 16, md: 20 }}>
        <Container maxW="6xl">
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Text
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="#C8A951"
                fontWeight="600"
              >
                Why Choose Us
              </Text>
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                color="white"
                fontWeight="700"
              >
                The Ultimate Shisha Experience
              </Heading>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="full">
              {[
                { icon: "🌬️", title: "Premium Flavours", desc: "50+ authentic Al Fakher, premium & exclusive blends" },
                { icon: "🍹", title: "Fresh Drinks", desc: "Fresh juices, mocktails, hot & cold beverages" },
                { icon: "🛋️", title: "Luxury Seating", desc: "Comfortable outdoor terrace with 10 private tables" },
                { icon: "⭐", title: "5-Star Service", desc: "Attentive staff & quick table service" },
              ].map((feature, i) => (
                <Box
                  key={i}
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid rgba(255,255,255,0.1)"
                  borderRadius="xl"
                  p={6}
                  textAlign="center"
                  _hover={{ bg: "rgba(255,255,255,0.05)", borderColor: "#C8A951" }}
                  transition="all 0.3s"
                >
                  <Text fontSize="3xl" mb={3}>{feature.icon}</Text>
                  <Text fontWeight="700" fontSize="lg" color="white" mb={2}>{feature.title}</Text>
                  <Text fontSize="sm" color="whiteAlpha.700">{feature.desc}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Menu Preview Section */}
      <ShishaMenuPreview />

      {/* Gallery Section */}
      <ShishaGallery />

      {/* Booking Section */}
      <Box bg="#1A0F0A" py={{ base: 16, md: 20 }} id="booking">
        <Container maxW="4xl">
          <VStack gap={8}>
            <VStack gap={4} textAlign="center">
              <Text
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="#C8A951"
                fontWeight="600"
              >
                Reserve Your Spot
              </Text>
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                color="white"
                fontWeight="700"
              >
                Book a Shisha Table
              </Heading>
              <Text color="whiteAlpha.700" maxW="lg">
                Secure your table in our premium outdoor lounge. 
                Each booking includes 2.5 hours of relaxation.
              </Text>
            </VStack>

            <Box w="full" maxW="xl" bg="rgba(255,255,255,0.03)" borderRadius="xl" p={{ base: 6, md: 8 }}>
              <ShishaBookingForm />
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box bg="#0D0906" py={{ base: 16, md: 20 }}>
        <Container maxW="4xl">
          <VStack gap={8}>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} color="white" fontWeight="700" textAlign="center">
              Frequently Asked Questions
            </Heading>

            <VStack gap={4} w="full" align="stretch">
              {[
                {
                  q: "Is the shisha lounge indoors or outdoors?",
                  a: "Our shisha lounge is located in a legally compliant outdoor terrace area with heating and weather protection, in accordance with Scottish smoking legislation."
                },
                {
                  q: "What age do I need to be?",
                  a: "You must be 18 years or older to use our shisha lounge. ID may be required."
                },
                {
                  q: "How long is each booking?",
                  a: "Each table booking includes 2 hours 30 minutes of shisha and seating time."
                },
                {
                  q: "Do you serve alcohol?",
                  a: "Our shisha lounge menu includes fresh juices, mocktails, hot drinks, and soft drinks. We do not serve alcohol in the shisha area."
                },
                {
                  q: "Can I book for a group?",
                  a: "Yes! Our tables accommodate 2-6 guests. For larger parties, please contact us directly."
                },
              ].map((faq, i) => (
                <Box
                  key={i}
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid rgba(255,255,255,0.1)"
                  borderRadius="lg"
                  p={5}
                >
                  <Text fontWeight="600" color="#C8A951" mb={2}>{faq.q}</Text>
                  <Text color="whiteAlpha.800" fontSize="sm" lineHeight="1.7">{faq.a}</Text>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Contact CTA */}
      <Box bg="#C8A951" py={12}>
        <Container maxW="4xl">
          <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
            <VStack align={{ base: "center", md: "start" }} textAlign={{ base: "center", md: "left" }}>
              <Heading fontSize="xl" color="#0D0906" fontWeight="700">
                Questions? Get in Touch
              </Heading>
              <Text color="#0D0906" opacity={0.8}>
                Our team is here to help with any enquiries
              </Text>
            </VStack>
            <Link href="/contact">
              <Button
                size="lg"
                bg="#0D0906"
                color="white"
                px={8}
                borderRadius="full"
                fontWeight="600"
                _hover={{ bg: "#1A0F0A" }}
              >
                <LuPhone style={{ marginRight: "8px" }} />
                Contact Us
              </Button>
            </Link>
          </HStack>
        </Container>
      </Box>

      {/* Floating Book Button (Mobile) */}
      <Box
        display={{ base: "block", md: "none" }}
        position="fixed"
        bottom={4}
        left={4}
        right={4}
        zIndex={50}
      >
        <Button
          w="full"
          size="lg"
          bg="#C8A951"
          color="#0D0906"
          fontWeight="700"
          borderRadius="full"
          boxShadow="0 4px 20px rgba(200,169,81,0.4)"
          _hover={{ bg: "#B89841" }}
          onClick={() => {
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <LuCalendar style={{ marginRight: "8px" }} />
          Book Shisha Table
        </Button>
      </Box>
    </Box>
  );
}
