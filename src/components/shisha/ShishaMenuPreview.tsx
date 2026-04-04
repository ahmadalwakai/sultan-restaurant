"use client";

import { useEffect, useState } from "react";
import { Box, VStack, HStack, Text, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { LuFlame, LuLeaf, LuStar, LuSparkles } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discountedPrice: number | null;
  image: string | null;
  intensity: number | null;
  isFeatured: boolean;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  items: MenuItem[];
};

const intensityIcons: Record<number, { icon: React.ElementType; color: string; label: string }> = {
  1: { icon: LuLeaf, color: "#4ADE80", label: "Mild" },
  2: { icon: LuLeaf, color: "#84CC16", label: "Light" },
  3: { icon: LuFlame, color: "#FBBF24", label: "Medium" },
  4: { icon: LuFlame, color: "#EF4444", label: "Strong" },
  5: { icon: LuSparkles, color: "#8B5CF6", label: "Extra Strong" },
};

export function ShishaMenuPreview() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/shisha/menu?featured=true");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
      setLoading(false);
    };
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="280px" borderRadius="xl" />
        ))}
      </Grid>
    );
  }

  // Get featured items from all categories
  const featuredItems: (MenuItem & { categoryName: string })[] = [];
  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.isFeatured) {
        featuredItems.push({ ...item, categoryName: cat.name });
      }
    });
  });

  // If no featured items, get first 6 items
  const displayItems = featuredItems.length > 0 
    ? featuredItems.slice(0, 6) 
    : categories.flatMap((cat) => cat.items.slice(0, 2).map((item) => ({ ...item, categoryName: cat.name }))).slice(0, 6);

  if (displayItems.length === 0) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="whiteAlpha.700">Menu coming soon...</Text>
      </Box>
    );
  }

  return (
    <VStack gap={8} align="stretch">
      {/* Featured Items Grid */}
      <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={5}>
        {displayItems.map((item) => {
          const IntensityData = item.intensity ? intensityIcons[item.intensity] : null;
          const hasDiscount = item.discountedPrice && item.discountedPrice < item.price;

          return (
            <Box
              key={item.id}
              bg="rgba(255,255,255,0.03)"
              borderRadius="xl"
              overflow="hidden"
              border="1px solid rgba(255,255,255,0.08)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-4px)",
                borderColor: "rgba(200,169,81,0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
              }}
            >
              {/* Image */}
              <Box position="relative" h="160px" bg="rgba(0,0,0,0.3)">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    w="full"
                    h="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="linear-gradient(135deg, rgba(139,92,246,0.2), rgba(200,169,81,0.2))"
                  >
                    <Text fontSize="4xl" opacity={0.5}>🌬️</Text>
                  </Box>
                )}
                
                {/* Badges */}
                <HStack position="absolute" top={3} left={3} gap={2}>
                  {item.isFeatured && (
                    <Box
                      bg="#C8A951"
                      color="#0D0906"
                      px={2}
                      py={0.5}
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="600"
                    >
                      <LuStar style={{ display: "inline", marginRight: "2px" }} />
                      Featured
                    </Box>
                  )}
                  {IntensityData && (
                    <Box
                      bg="rgba(0,0,0,0.7)"
                      color={IntensityData.color}
                      px={2}
                      py={0.5}
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="500"
                    >
                      <IntensityData.icon style={{ display: "inline", marginRight: "2px" }} />
                      {IntensityData.label}
                    </Box>
                  )}
                </HStack>

                {/* Discount Badge */}
                {hasDiscount && (
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    bg="#EF4444"
                    color="white"
                    px={2}
                    py={0.5}
                    borderRadius="md"
                    fontSize="xs"
                    fontWeight="700"
                  >
                    SALE
                  </Box>
                )}
              </Box>

              {/* Content */}
              <VStack p={4} align="stretch" gap={2}>
                <Text fontSize="xs" color="#C8A951" fontWeight="500">
                  {item.categoryName}
                </Text>
                <Heading size="sm" color="white" fontWeight="600" lineClamp={1}>
                  {item.name}
                </Heading>
                {item.description && (
                  <Text fontSize="sm" color="whiteAlpha.600" lineClamp={2}>
                    {item.description}
                  </Text>
                )}
                <HStack justify="space-between" align="center" pt={2}>
                  <HStack gap={2}>
                    {hasDiscount ? (
                      <>
                        <Text fontSize="lg" fontWeight="700" color="#C8A951">
                          £{item.discountedPrice?.toFixed(2)}
                        </Text>
                        <Text fontSize="sm" textDecoration="line-through" color="whiteAlpha.500">
                          £{item.price.toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <Text fontSize="lg" fontWeight="700" color="#C8A951">
                        £{item.price.toFixed(2)}
                      </Text>
                    )}
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          );
        })}
      </Grid>

      {/* View Full Menu CTA */}
      <Box textAlign="center">
        <Link href="/shisha/menu">
          <Box
            as="span"
            display="inline-flex"
            alignItems="center"
            gap={2}
            px={8}
            py={3}
            bg="transparent"
            border="2px solid #8B5CF6"
            color="#8B5CF6"
            borderRadius="full"
            fontWeight="600"
            fontSize="sm"
            transition="all 0.3s"
            _hover={{
              bg: "#8B5CF6",
              color: "white",
              transform: "translateY(-2px)",
            }}
          >
            View Full Shisha Menu
            <Text as="span">→</Text>
          </Box>
        </Link>
      </Box>

      {/* Category Pills */}
      <HStack
        gap={3}
        flexWrap="wrap"
        justify="center"
        pt={4}
        borderTop="1px solid rgba(255,255,255,0.08)"
      >
        {categories.slice(0, 5).map((cat) => (
          <Link key={cat.id} href={`/shisha/menu#${cat.slug}`}>
            <Box
              px={4}
              py={2}
              bg="rgba(255,255,255,0.05)"
              borderRadius="full"
              fontSize="sm"
              color="whiteAlpha.800"
              transition="all 0.2s"
              _hover={{ bg: "rgba(139,92,246,0.2)", color: "#8B5CF6" }}
            >
              {cat.name}
            </Box>
          </Link>
        ))}
      </HStack>
    </VStack>
  );
}
