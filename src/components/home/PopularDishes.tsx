"use client";

import Link from "next/link";
import Image from "next/image";
import { usePopularMenu } from "@/hooks/api";
import { MenuItemCard } from "@/components/cards/MenuItemCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Text, Card, HStack, Heading } from "@chakra-ui/react";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/animation";

const fallbackDishes = [
  {
    name: "Sultan Mixed Grill",
    description: "Lamb chops, chicken shish, kofte, and seekh kebab. Charcoal-grilled with rice and fresh salad.",
    price: "£18.95",
    badge: "Chef's Signature",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&q=80",
  },
  {
    name: "Lamb Shawarma Platter",
    description: "Slow-marinated lamb from the vertical spit, with garlic sauce, pickles, and sumac onions.",
    price: "£14.95",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop&q=80",
  },
  {
    name: "Chicken Biryani",
    description: "Fragrant basmati rice with spiced chicken, caramelised onions, saffron, and fresh herbs.",
    price: "£12.95",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop&q=80",
  },
  {
    name: "Hummus & Mezzeh",
    description: "Creamy hummus, baba ghanoush, falafel, tabbouleh, and stuffed vine leaves.",
    price: "£11.95",
    badge: "Vegetarian",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop&q=80",
  },
  {
    name: "Adana Kebab",
    description: "Hand-minced lamb with Aleppo pepper, charcoal-grilled on a flat skewer.",
    price: "£13.95",
    badge: "Spicy",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&h=400&fit=crop&q=80",
  },
  {
    name: "Tandoori Lamb Chops",
    description: "Lamb chops marinated overnight in yoghurt, ginger, and Kashmiri spices.",
    price: "£16.95",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop&q=80",
  },
];

function FallbackDishCard({ dish }: { dish: typeof fallbackDishes[number] }) {
  return (
    <Card.Root bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
      <Box position="relative" h="200px">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        {dish.badge && (
          <Box position="absolute" top={3} left={3}>
            <Text
              bg="brand.primary"
              color="bg.elevated"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
            >
              {dish.badge}
            </Text>
          </Box>
        )}
      </Box>
      <Card.Body p={5}>
        <HStack justify="space-between" mb={2}>
          <Heading size="sm" fontFamily="heading" color="fg.default">{dish.name}</Heading>
          <Text fontWeight="bold" color="brand.primary" fontSize="lg">{dish.price}</Text>
        </HStack>
        <Text fontSize="sm" color="fg.muted" lineHeight="tall">{dish.description}</Text>
      </Card.Body>
    </Card.Root>
  );
}

export function PopularDishes() {
  const { data: items, isLoading, isError } = usePopularMenu();
  const hasApiData = !isLoading && !isError && items && items.length > 0;

  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="bg.subtle">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <FadeInUp>
            <SectionHeader
              title="Most Popular Dishes"
              subtitle="Our customers' all-time favourites"
            />
          </FadeInUp>
          {isLoading ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6} w="full">
              {Array.from({ length: 6 }).map((_, i) => (
                <Box key={i} h="72" borderRadius="xl" bg="gray.200" animation="pulse 2s infinite" />
              ))}
            </SimpleGrid>
          ) : hasApiData ? (
            <StaggerContainer>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6} w="full">
                {items.slice(0, 6).map((item) => (
                  <StaggerItem key={item.id}>
                    <AnimatedCard>
                      <MenuItemCard item={item} />
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </SimpleGrid>
            </StaggerContainer>
          ) : (
            <StaggerContainer>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6} w="full">
                {fallbackDishes.map((dish) => (
                  <StaggerItem key={dish.name}>
                    <AnimatedCard>
                      <FallbackDishCard dish={dish} />
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </SimpleGrid>
            </StaggerContainer>
          )}
          <FadeInUp delay={0.4}>
            <Link href="/menu">
              <Box
                borderRadius="lg"
                borderWidth="2px"
                borderColor="amber.500"
                px={8}
                py={3}
                fontWeight="semibold"
                color="amber.600"
                transition="all 0.2s"
                _hover={{ bg: "amber.500", color: "white" }}
              >
                See Full Menu
              </Box>
            </Link>
          </FadeInUp>
        </VStack>
      </Container>
    </Box>
  );
}
