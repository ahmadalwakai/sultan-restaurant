import { Metadata } from "next";
import { Box, Container, VStack, Heading, Text, Grid, HStack } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db/prisma";
import { ShishaMenuItemCard } from "@/components/shisha/ShishaMenuItemCard";
import { ShishaMenuCartBar } from "@/components/shisha/ShishaMenuCartBar";

export const metadata: Metadata = {
  title: "Shisha Menu | Sultan Restaurant Glasgow",
  description: "Explore our premium shisha menu featuring classic flavors, frozen varieties, fruit heads, and refreshing drinks. All enjoyed in our outdoor lounge. Glasgow.",
  keywords: "shisha menu, hookah flavors, sultan shisha, glasgow shisha lounge, premium hookah, fruit shisha, mocktails, fresh juices",
};

export const dynamic = "force-dynamic";

async function getMenuData() {
  const categories = await prisma.shishaCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
      },
    },
  });
  return categories;
}

export default async function ShishaMenuPage() {
  const categories = await getMenuData();

  return (
    <Box bg="#0D0906" minH="100vh">
      {/* Hero */}
      <Box
        position="relative"
        py={{ base: 24, md: 32 }}
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1920&q=80')"
          bgSize="cover"
          backgroundPosition="center"
          filter="brightness(0.2)"
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, transparent 0%, #0D0906 100%)"
        />
        <Container maxW="7xl" position="relative" zIndex={1}>
          <Link href="/shisha">
            <HStack 
              gap={2} 
              color="whiteAlpha.700" 
              mb={6}
              _hover={{ color: "#C8A951" }}
              transition="color 0.2s"
            >
              <LuArrowLeft size={20} />
              <Text>Back to Shisha Lounge</Text>
            </HStack>
          </Link>
          <VStack gap={4} align="start">
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="800"
              color="white"
            >
              Shisha <Text as="span" color="#8B5CF6">Menu</Text>
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.800"
              maxW="2xl"
            >
              Premium flavors, frozen varieties, and refreshing drinks.
              All prices subject to change. Ask staff for daily specials.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Quick Navigation */}
      <Box 
        position="sticky" 
        top={16} 
        zIndex={50}
        py={4}
        bg="rgba(13,9,6,0.95)"
        backdropFilter="blur(10px)"
        borderBottom="1px solid rgba(255,255,255,0.08)"
      >
        <Container maxW="7xl">
          <HStack gap={3} overflowX="auto" pb={2} css={{ "&::-webkit-scrollbar": { display: "none" } }}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`#${cat.slug}`}>
                <Box
                  px={4}
                  py={2}
                  bg="rgba(255,255,255,0.05)"
                  borderRadius="full"
                  fontSize="sm"
                  color="whiteAlpha.800"
                  whiteSpace="nowrap"
                  transition="all 0.2s"
                  _hover={{ bg: "rgba(139,92,246,0.2)", color: "#8B5CF6" }}
                >
                  {cat.name}
                </Box>
              </Link>
            ))}
          </HStack>
        </Container>
      </Box>

      {/* Menu Sections */}
      <Container maxW="7xl" py={{ base: 8, md: 12 }}>
        <VStack gap={16} align="stretch">
          {categories.map((category) => (
            <Box key={category.id} id={category.slug} scrollMarginTop="120px">
              {/* Category Header */}
              <VStack align="start" gap={2} mb={8}>
                <HStack gap={3} align="center">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={48}
                      height={48}
                      style={{ borderRadius: "12px", objectFit: "cover" }}
                    />
                  )}
                  <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="700"
                    color="white"
                  >
                    {category.name}
                  </Heading>
                </HStack>
                {category.description && (
                  <Text color="whiteAlpha.600" maxW="2xl">
                    {category.description}
                  </Text>
                )}
              </VStack>

              {/* Items Grid */}
              {category.items.length > 0 ? (
                <Grid
                  templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                  gap={5}
                >
                  {category.items.map((item) => (
                    <ShishaMenuItemCard key={item.id} item={item} />
                  ))}
                </Grid>
              ) : (
                <Box
                  p={8}
                  bg="rgba(255,255,255,0.03)"
                  borderRadius="xl"
                  textAlign="center"
                >
                  <Text color="whiteAlpha.500">No items available in this category yet.</Text>
                </Box>
              )}
            </Box>
          ))}

          {categories.length === 0 && (
            <VStack py={16} gap={4}>
              <Text fontSize="4xl">🌬️</Text>
              <Heading size="lg" color="white">Menu Coming Soon</Heading>
              <Text color="whiteAlpha.600">We're preparing an amazing selection for you.</Text>
              <Link href="/shisha">
                <Box
                  as="span"
                  px={6}
                  py={3}
                  bg="#8B5CF6"
                  color="white"
                  borderRadius="lg"
                  fontWeight="600"
                  _hover={{ bg: "#7C3AED" }}
                >
                  Back to Shisha Lounge
                </Box>
              </Link>
            </VStack>
          )}
        </VStack>
      </Container>

      {/* Floating Book Now Button */}
      <Box
        position="fixed"
        bottom={6}
        right={6}
        display={{ base: "block", md: "none" }}
        zIndex={40}
      >
        <Link href="/shisha#booking">
          <Box
            px={6}
            py={3}
            bg="#8B5CF6"
            color="white"
            borderRadius="full"
            fontWeight="600"
            boxShadow="0 4px 20px rgba(139,92,246,0.4)"
            _hover={{ bg: "#7C3AED" }}
          >
            Book a Table
          </Box>
        </Link>
      </Box>

      {/* Legal Notice */}
      <Container maxW="7xl" pb={12}>
        <Box
          p={6}
          bg="rgba(255,255,255,0.03)"
          borderRadius="xl"
          border="1px solid rgba(255,255,255,0.08)"
        >
          <Text fontSize="sm" color="whiteAlpha.600" textAlign="center">
            <strong>Please Note:</strong> In accordance with Scottish smoking laws, 
            our shisha is served in our outdoor/ventilated lounge area. 
            You must be 18+ to use shisha products. Prices may vary. Ask staff for current offers.
          </Text>
        </Box>
      </Container>

      {/* Table Scan Cart Bar */}
      <ShishaMenuCartBar />
    </Box>
  );
}
