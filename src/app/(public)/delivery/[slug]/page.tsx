import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, VStack, HStack, Heading, Text, Button, Card } from "@chakra-ui/react";
import { Truck, Clock, ExternalLink } from "lucide-react";
import { glasgowAreas } from "@/data/seo/glasgow-areas";
import { generateAreaContent } from "@/lib/seo/area-content-generator";
import { SITE_URL, SITE_CONFIG } from "@/lib/constants/site";
import { SectionHeader } from "@/components/sections/SectionHeader";

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
  return {
    title: `Food Delivery to ${area.name} | Sultan Restaurant Glasgow`,
    description: `Order halal Middle Eastern food for delivery to ${area.name}, ${area.postcode}. Charcoal-grilled kebabs, shawarma, biryani delivered via Uber Eats, Deliveroo & Just Eat. ${area.deliveryTime}.`,
    alternates: { canonical: `${SITE_URL}/delivery/${area.slug}` },
  };
}

const deliveryPartners = [
  {
    name: "Uber Eats",
    url: "https://www.ubereats.com/store-browse-uuid/54ba9b20-fdd8-556a-9bf6-20c2425d1f27?diningMode=DELIVERY",
    color: "#06C167",
    promo: "Code: eats-nirxu1ngpa",
  },
  {
    name: "Just Eat",
    url: "https://www.just-eat.co.uk/restaurants-sultan-restaurant-glasgow/menu?shipping=pickup",
    color: "#FF8000",
    promo: null,
  },
  {
    name: "Deliveroo",
    url: "https://deliveroo.co.uk/menu/Glasgow/bridgeton-camlachie/sultan-restaurant-577-gallowgate?day=today&geohash=gcuvzbj5jw4g&time=ASAP",
    color: "#00CCBC",
    promo: null,
  },
];

export default async function DeliveryAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = glasgowAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const content = generateAreaContent(area);

  // JSON-LD for delivery service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Sultan Restaurant",
    description: `Halal Middle Eastern food delivery to ${area.name}`,
    url: `${SITE_URL}/delivery/${area.slug}`,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "577 Gallowgate",
      addressLocality: "Glasgow",
      postalCode: "G40 2PE",
      addressCountry: "GB",
    },
    servesCuisine: ["Middle Eastern", "Halal", "Kebab", "Syrian", "Lebanese"],
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
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/menu`,
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Box bg="bg.elevated" py={{ base: 12, md: 20 }}>
        <Container maxW="5xl" px={{ base: 5, md: 8 }} textAlign="center">
          <VStack gap={5}>
            <HStack gap={2}>
              <Truck size={18} color="#C8A951" />
              <Text fontSize="sm" color="brand.primary" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                Delivery to {area.name}
              </Text>
            </HStack>
            <Heading fontFamily="heading" size={{ base: "2xl", md: "4xl" }} color="fg.on-dark">
              Food Delivery in {area.name}
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800" maxW="2xl">
              {content.intro}
            </Text>
            {area.deliveryTime && (
              <HStack gap={2} bg="whiteAlpha.100" px={4} py={2} borderRadius="full">
                <Clock size={16} color="#C8A951" />
                <Text fontSize="sm" color="whiteAlpha.900">Estimated: {area.deliveryTime}</Text>
              </HStack>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Delivery Partners */}
      <Box py={{ base: 12, md: 16 }} bg="bg.canvas">
        <Container maxW="3xl" px={{ base: 5, md: 8 }}>
          <SectionHeader label="Order Now" title="Choose Your Delivery App" />
          <VStack gap={4} mt={8}>
            {deliveryPartners.map((p) => (
              <Link key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
                <Card.Root
                  shadow="sm"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="transparent"
                  _hover={{ borderColor: p.color, shadow: "md" }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Card.Body p={5}>
                    <HStack justify="space-between">
                      <VStack align="start" gap={0}>
                        <Text fontWeight="bold" color="fg.default">{p.name}</Text>
                        {p.promo && <Text fontSize="xs" color="green.600" fontWeight="semibold">{p.promo}</Text>}
                        <Text fontSize="xs" color="fg.muted">Delivery to {area.name}</Text>
                      </VStack>
                      <ExternalLink size={18} color="#C8A951" />
                    </HStack>
                  </Card.Body>
                </Card.Root>
              </Link>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* Pickup option */}
      <Box py={{ base: 10, md: 14 }} bg="bg.subtle" textAlign="center">
        <Container maxW="3xl" px={{ base: 5, md: 8 }}>
          <VStack gap={4}>
            <Heading size="md" fontFamily="heading">Prefer to Collect?</Heading>
            <Text fontSize="sm" color="fg.muted">
              Order online and pick up from 577 Gallowgate, Glasgow G40 2PE. Ready in ~30 minutes.
            </Text>
            <Link href="/menu">
              <Button bg="brand.primary" color="bg.elevated" borderRadius="full" px={8} fontWeight="bold" _hover={{ bg: "yellow.500" }}>
                Order for Pickup
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      {/* Link to area page */}
      <Box py={8} bg="bg.canvas" textAlign="center">
        <Link href={`/areas/${area.slug}`}>
          <Text fontSize="sm" color="fg.muted" _hover={{ color: "brand.primary" }}>
            ← More about Sultan in {area.name}
          </Text>
        </Link>
      </Box>
    </>
  );
}
