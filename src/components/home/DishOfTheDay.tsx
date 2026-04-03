"use client";

import Link from "next/link";
import Image from "next/image";
import { useDishOfDay } from "@/hooks/api";
import { formatCurrency } from "@/lib/utils/format-currency";
import { Box, Container, SimpleGrid, Heading, Text, VStack, Button, Badge, HStack } from "@chakra-ui/react";

export function DishOfTheDay() {
  const { data: dish } = useDishOfDay();

  if (!dish) return null;

  const hasDiscount = dish.discountPrice !== null && dish.discountPrice < dish.menuItemPrice;

  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.canvas">
      <Container maxW="6xl" px={{ base: 5, md: 8 }}>
        <Box bg="bg.surface" shadow="xl" borderRadius="2xl" overflow="hidden">
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Box position="relative" minH={{ base: "250px", md: "400px" }}>
              {dish.menuItemImage ? (
                <Image src={dish.menuItemImage} alt={dish.menuItemName} fill style={{ objectFit: "cover" }} />
              ) : (
                <Box h="full" w="full" bg="bg.subtle" display="flex" alignItems="center" justifyContent="center" fontSize="8xl">
                  🍲
                </Box>
              )}
              <Box position="absolute" top={4} left={4}>
                <Badge bg="brand.primary" color="bg.elevated" px={3} py={1} borderRadius="full" fontWeight="bold">
                  Today's Special
                </Badge>
              </Box>
            </Box>

            <Box p={{ base: 8, md: 10 }} display="flex" flexDirection="column" justifyContent="center">
              <VStack align="start" gap={4}>
                <Text fontSize="sm" color="brand.primary" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                  Dish of the Day
                </Text>
                <Heading fontFamily="heading" size={{ base: "xl", md: "2xl" }} color="fg.default">
                  {dish.menuItemName}
                </Heading>
                {dish.menuItemDescription && (
                  <Text color="fg.muted" lineHeight="tall" fontSize={{ base: "sm", md: "md" }}>
                    {dish.menuItemDescription}
                  </Text>
                )}
                <Box>
                  {hasDiscount ? (
                    <VStack align="start" gap={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
                        {formatCurrency(dish.discountPrice!)}
                      </Text>
                      <Text fontSize="lg" color="fg.muted" textDecoration="line-through">
                        {formatCurrency(dish.menuItemPrice)}
                      </Text>
                    </VStack>
                  ) : (
                    <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
                      {formatCurrency(dish.menuItemPrice)}
                    </Text>
                  )}
                </Box>
                <HStack gap={3} pt={2}>
                  <Link href={`/menu/${dish.menuItemSlug}`}>
                    <Button bg="brand.primary" color="bg.elevated" borderRadius="full" px={6}
                      _hover={{ bg: "yellow.500" }}>
                      Order Now
                    </Button>
                  </Link>
                  <Link href="/menu">
                    <Button variant="outline" borderColor="brand.dark" color="fg.default" borderRadius="full" px={6}>
                      View Full Menu
                    </Button>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
