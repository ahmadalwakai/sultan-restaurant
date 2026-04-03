import Link from "next/link";
import Image from "next/image";
import { Box, Container, VStack, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export function AboutPreview() {
  const paragraphs = [
    "Since opening our doors on Gallowgate, Sultan Restaurant has become Glasgow's destination for authentic Middle Eastern and South Asian cuisine. Our kitchen is led by chefs who carry generations of culinary heritage — from the smoky grills of Damascus to the aromatic tandoors of Lahore.",
    "Every dish tells a story. Our hand-ground spice blends are prepared fresh daily. Our kebabs are charcoal-grilled to order. Our breads are baked in clay ovens minutes before they reach your table. This is not fast food — this is food made with intention.",
    "We serve families celebrating milestones, friends gathering after work, and neighbours who've made us their weekly tradition. Sultan is not just a restaurant — it's where Glasgow comes to eat together."
  ];

  const stats = [
    { number: "10+", label: "Years Serving Glasgow" },
    { number: "50+", label: "Signature Dishes" },
    { number: "15,000+", label: "Happy Customers" },
    { number: "4.7★", label: "Average Rating" },
  ];

  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.subtle">
      <Container maxW="6xl" px={{ base: 5, md: 8 }}>
        <VStack gap={10} textAlign="center">
          <VStack gap={3}>
            <Text fontSize="sm" fontWeight="bold" color="brand.primary" textTransform="uppercase" letterSpacing="widest">
              Our Story
            </Text>
            <Heading fontFamily="heading" size={{ base: "2xl", md: "4xl" }} color="fg.default">
              The Sultan Experience
            </Heading>
            <Text fontSize="lg" color="fg.muted" maxW="2xl">
              Where Ancient Recipes Meet Modern Glasgow
            </Text>
          </VStack>

          <VStack gap={6} maxW="3xl" textAlign="center">
            {paragraphs.map((paragraph, index) => (
              <Text key={index} fontSize="base" lineHeight="tall" color="fg.default">
                {paragraph}
              </Text>
            ))}
          </VStack>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} w="full" maxW="4xl" pt={6}>
            {stats.map(stat => (
              <VStack key={stat.label} gap={1}>
                <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="brand.primary">
                  {stat.number}
                </Text>
                <Text fontSize="sm" color="fg.muted">{stat.label}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
