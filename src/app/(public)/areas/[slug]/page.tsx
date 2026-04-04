import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, SimpleGrid, VStack, HStack, Heading, Text, Button, Card } from "@chakra-ui/react";
import { MapPin, Clock, Phone, Truck } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { glasgowAreas, cuisineTypes } from "@/data/seo/glasgow-areas";
import { generateAreaContent } from "@/lib/seo/area-content-generator";
import { SITE_URL, SITE_CONFIG } from "@/lib/constants/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glasgowAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = glasgowAreas.find((a) => a.slug === slug);
  if (!area) return {};

  const content = generateAreaContent(area);
  const canonicalUrl = `${SITE_URL}/areas/${area.slug}`;

  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = glasgowAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const content = generateAreaContent(area);

  // Nearby areas: same region, excluding self, max 6
  const nearbyAreas = glasgowAreas
    .filter((a) => a.region === area.region && a.slug !== area.slug)
    .slice(0, 6);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Sultan Restaurant",
    description: content.intro,
    url: `${SITE_URL}/areas/${area.slug}`,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "577 Gallowgate",
      addressLocality: "Glasgow",
      postalCode: "G40 2PE",
      addressCountry: "GB",
    },
    servesCuisine: ["Middle Eastern", "Halal", "Kebab", "Syrian", "Lebanese"],
    hasMenu: `${SITE_URL}/menu`,
    areaServed: {
      "@type": "Place",
      name: area.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.name,
        postalCode: area.postcode,
        addressCountry: "GB",
      },
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "21:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Box bg="bg.elevated" py={{ base: 10, md: 16 }}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <SectionHeader
            label="Delivery Area"
            title={content.h1}
            subtitle={content.intro}
            light
          />
          <HStack justify="center" gap={4} mt={8} flexWrap="wrap">
            <Button asChild size="lg" colorPalette="orange">
              <Link href="/menu">Order Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/book">Book a Table</Link>
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Info cards */}
      <Box bg="bg.canvas" py={{ base: 8, md: 12 }}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6}>
            <Card.Root shadow="sm">
              <Card.Body p={6}>
                <VStack align="start" gap={3}>
                  <HStack>
                    <Truck size={20} />
                    <Heading size="sm">Delivery to {area.name}</Heading>
                  </HStack>
                  <Text fontSize="sm" color="fg.muted">
                    Approx. {area.deliveryTime ?? "20-30 min"} from our kitchen at 577 Gallowgate, Glasgow G40 2PE.
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root shadow="sm">
              <Card.Body p={6}>
                <VStack align="start" gap={3}>
                  <HStack>
                    <Clock size={20} />
                    <Heading size="sm">Opening Hours</Heading>
                  </HStack>
                  <Text fontSize="sm" color="fg.muted">
                    Every day: 12:00 PM – 9:00 PM
                    <br />
                    7 days a week
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root shadow="sm">
              <Card.Body p={6}>
                <VStack align="start" gap={3}>
                  <HStack>
                    <Phone size={20} />
                    <Heading size="sm">Call to Order</Heading>
                  </HStack>
                  <Text fontSize="sm" color="fg.muted">
                    {SITE_CONFIG.contact.phone}
                    <br />
                    Or order online at any time
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Cuisine cross-links */}
      <Box bg="bg.surface" py={{ base: 8, md: 12 }}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <SectionHeader
            label="What We Serve"
            title={`Cuisines Available in ${area.name}`}
            subtitle="Explore our menu by cuisine type — all halal, all freshly prepared."
          />
          <SimpleGrid columns={{ base: 2, sm: 4 }} gap={4} mt={8}>
            {cuisineTypes.map((cuisine) => (
              <Link key={cuisine.slug} href={`/cuisine/${cuisine.slug}-in-${area.slug}`}>
                <Box
                  p={4}
                  bg="bg.elevated"
                  rounded="md"
                  textAlign="center"
                  _hover={{ bg: "bg.canvas", shadow: "md" }}
                  transition="all 0.15s"
                >
                  <Text fontWeight="semibold" fontSize="sm">
                    {cuisine.name} in {area.name}
                  </Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* About the area */}
      <Box bg="bg.canvas" py={{ base: 8, md: 12 }}>
        <Container maxW="3xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack gap={4} align="start">
            <Heading as="h2" size="lg" fontFamily="heading">
              Delivering to {area.name} ({area.postcode})
            </Heading>
            <Text color="fg.muted">{area.description}</Text>
            {area.landmarks && area.landmarks.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                <MapPin size={16} />
                <Text fontSize="sm" color="fg.muted">
                  Near: {area.landmarks.join(", ")}
                </Text>
              </HStack>
            )}
            <Text color="fg.muted">{content.nearText}</Text>
          </VStack>
        </Container>
      </Box>

      {/* Nearby areas */}
      {nearbyAreas.length > 0 && (
        <Box bg="bg.surface" py={{ base: 8, md: 12 }}>
          <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
            <Heading as="h2" size="md" fontFamily="heading" mb={6}>
              We Also Deliver Nearby
            </Heading>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} gap={3}>
              {nearbyAreas.map((nearby) => (
                <Link key={nearby.slug} href={`/areas/${nearby.slug}`}>
                  <Box
                    p={3}
                    bg="bg.elevated"
                    rounded="md"
                    textAlign="center"
                    fontSize="sm"
                    _hover={{ shadow: "sm" }}
                    transition="all 0.15s"
                  >
                    {nearby.name}
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
            <Box mt={6}>
              <Link href="/areas">
                <Text fontSize="sm" color="fg.muted" _hover={{ color: "fg.default" }}>
                  View all delivery areas →
                </Text>
              </Link>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}
