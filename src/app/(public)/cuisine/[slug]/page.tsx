import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, SimpleGrid, VStack, HStack, Heading, Text, Button } from "@chakra-ui/react";
import { MapPin, Clock, ShoppingBag } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { glasgowAreas, cuisineTypes } from "@/data/seo/glasgow-areas";
import { generateCuisineAreaContent } from "@/lib/seo/area-content-generator";
import { SITE_URL, SITE_CONFIG } from "@/lib/constants/site";

interface Props {
  params: Promise<{ slug: string }>;
}

// slug format: {cuisine-slug}-in-{area-slug}
function parseCuisineAreaSlug(slug: string) {
  const match = slug.match(/^(.+)-in-(.+)$/);
  if (!match) return null;
  const [, cuisineSlug, areaSlug] = match;
  const cuisine = cuisineTypes.find((c) => c.slug === cuisineSlug);
  const area = glasgowAreas.find((a) => a.slug === areaSlug);
  if (!cuisine || !area) return null;
  return { cuisine, area };
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const cuisine of cuisineTypes) {
    for (const area of glasgowAreas) {
      params.push({ slug: `${cuisine.slug}-in-${area.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseCuisineAreaSlug(slug);
  if (!parsed) return {};

  const { cuisine, area } = parsed;
  const content = generateCuisineAreaContent(cuisine, area);
  const canonicalUrl = `${SITE_URL}/cuisine/${slug}`;

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

export default async function CuisineAreaPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseCuisineAreaSlug(slug);
  if (!parsed) notFound();

  const { cuisine, area } = parsed;
  const content = generateCuisineAreaContent(cuisine, area);
  const deliveryTime = area.deliveryTime ?? "20-30 min";

  // Other cuisines in this area
  const otherCuisines = cuisineTypes.filter((c) => c.slug !== cuisine.slug);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Sultan Restaurant",
    description: content.intro,
    url: `${SITE_URL}/cuisine/${slug}`,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "577 Gallowgate",
      addressLocality: "Glasgow",
      postalCode: "G40 2PE",
      addressCountry: "GB",
    },
    servesCuisine: cuisine.name,
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
            label={`${cuisine.name} · ${area.name}`}
            title={content.h1}
            subtitle={content.intro}
            light
          />
          <HStack justify="center" gap={4} mt={8} flexWrap="wrap">
            <Button asChild size="lg" colorPalette="orange">
              <Link href="/menu">View Our Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/areas/${area.slug}`}>All Food in {area.name}</Link>
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Quick facts */}
      <Box bg="bg.canvas" py={{ base: 8, md: 12 }}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6}>
            <Box p={6} bg="bg.surface" rounded="md" shadow="sm">
              <VStack align="start" gap={2}>
                <HStack>
                  <MapPin size={18} />
                  <Text fontWeight="semibold" fontSize="sm">Location</Text>
                </HStack>
                <Text fontSize="sm" color="fg.muted">577 Gallowgate, Glasgow G40 2PE</Text>
              </VStack>
            </Box>
            <Box p={6} bg="bg.surface" rounded="md" shadow="sm">
              <VStack align="start" gap={2}>
                <HStack>
                  <Clock size={18} />
                  <Text fontWeight="semibold" fontSize="sm">Delivery to {area.name}</Text>
                </HStack>
                <Text fontSize="sm" color="fg.muted">Approx. {deliveryTime}</Text>
              </VStack>
            </Box>
            <Box p={6} bg="bg.surface" rounded="md" shadow="sm">
              <VStack align="start" gap={2}>
                <HStack>
                  <ShoppingBag size={18} />
                  <Text fontWeight="semibold" fontSize="sm">Open Daily</Text>
                </HStack>
                <Text fontSize="sm" color="fg.muted">12:00 PM – 9:00 PM, 7 days</Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Other cuisines in this area */}
      <Box bg="bg.surface" py={{ base: 8, md: 12 }}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <Heading as="h2" size="md" fontFamily="heading" mb={6}>
            More Cuisines We Deliver to {area.name}
          </Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={3}>
            {otherCuisines.map((c) => (
              <Link key={c.slug} href={`/cuisine/${c.slug}-in-${area.slug}`}>
                <Box
                  p={4}
                  bg="bg.elevated"
                  rounded="md"
                  textAlign="center"
                  _hover={{ shadow: "sm" }}
                  transition="all 0.15s"
                >
                  <Text fontSize="sm" fontWeight="semibold">{c.name}</Text>
                  <Text fontSize="xs" color="fg.muted">in {area.name}</Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Back nav */}
      <Box bg="bg.canvas" py={6}>
        <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
          <HStack gap={6} flexWrap="wrap">
            <Link href={`/areas/${area.slug}`}>
              <Text fontSize="sm" color="fg.muted" _hover={{ color: "fg.default" }}>
                ← All food delivery to {area.name}
              </Text>
            </Link>
            <Link href="/areas">
              <Text fontSize="sm" color="fg.muted" _hover={{ color: "fg.default" }}>
                View all delivery areas →
              </Text>
            </Link>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
