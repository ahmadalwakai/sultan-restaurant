import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, SimpleGrid, VStack, Heading, Text } from "@chakra-ui/react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { glasgowAreas } from "@/data/seo/glasgow-areas";
import { SITE_URL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Halal Food Delivery Areas in Glasgow | Sultan Restaurant",
  description:
    "Sultan Restaurant delivers authentic Middle Eastern and halal food across Glasgow and surrounding areas. View all our delivery zones — from Gallowgate to Newton Mearns, Clydebank to Coatbridge.",
  alternates: { canonical: `${SITE_URL}/areas` },
  openGraph: {
    title: "Halal Food Delivery Areas in Glasgow | Sultan Restaurant",
    description:
      "We deliver charcoal-grilled kebabs, mezze platters, biryani and more across Glasgow. Find your area and order now.",
    url: `${SITE_URL}/areas`,
    type: "website",
  },
};

const REGION_LABELS: Record<string, string> = {
  "city-centre": "City Centre",
  east: "East End",
  west: "West End & West",
  north: "North Glasgow",
  south: "South Glasgow & Southside",
  surrounding: "Surrounding Towns",
};

const REGION_ORDER = ["city-centre", "east", "west", "north", "south", "surrounding"];

export default function AreasIndexPage() {
  const grouped = REGION_ORDER.map((region) => ({
    region,
    label: REGION_LABELS[region],
    areas: glasgowAreas.filter((a) => a.region === region),
  }));

  return (
    <Box minH="100vh" bg="bg.canvas">
      {/* Hero */}
      <Box bg="bg.elevated" py={{ base: 10, md: 16 }}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <SectionHeader
            label="Delivery Coverage"
            title="Glasgow & Surrounding Areas We Serve"
            subtitle={`Sultan Restaurant delivers authentic halal and Middle Eastern food to ${glasgowAreas.length}+ areas across Glasgow and beyond. Find your area below.`}
            light
          />
        </Container>
      </Box>

      {/* Areas by region */}
      <Box py={{ base: 10, md: 16 }}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack gap={12} align="stretch">
            {grouped.map(({ region, label, areas }) =>
              areas.length === 0 ? null : (
                <Box key={region}>
                  <Heading as="h2" size="lg" fontFamily="heading" mb={6}>
                    {label}
                  </Heading>
                  <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={3}>
                    {areas.map((area) => (
                      <Link key={area.slug} href={`/areas/${area.slug}`}>
                        <Box
                          p={4}
                          bg="bg.surface"
                          rounded="md"
                          border="1px solid"
                          borderColor="border.subtle"
                          _hover={{ bg: "bg.elevated", shadow: "sm", borderColor: "border.default" }}
                          transition="all 0.15s"
                        >
                          <Text fontWeight="semibold" fontSize="sm" mb={1}>
                            {area.name}
                          </Text>
                          <Text fontSize="xs" color="fg.muted">
                            {area.postcode} · {area.deliveryTime ?? "delivery available"}
                          </Text>
                        </Box>
                      </Link>
                    ))}
                  </SimpleGrid>
                </Box>
              )
            )}
          </VStack>
        </Container>
      </Box>

      {/* CTA */}
      <Box bg="bg.elevated" py={{ base: 10, md: 16 }}>
        <Container maxW="3xl" px={{ base: 4, md: 6, lg: 8 }} textAlign="center">
          <Heading as="h2" size="lg" fontFamily="heading" mb={4}>
            Don't See Your Area?
          </Heading>
          <Text color="fg.muted" mb={6}>
            Call us on 0141 391 8883 and we'll let you know if we can deliver to you, or arrange collection from 577 Gallowgate.
          </Text>
          <Link href="/contact">
            <Text fontWeight="semibold" fontSize="sm">
              Contact Us →
            </Text>
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
