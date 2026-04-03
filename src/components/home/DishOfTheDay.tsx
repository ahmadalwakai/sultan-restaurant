"use client";

import Link from "next/link";
import Image from "next/image";
import { useDishOfDay } from "@/hooks/api";
import { formatCurrency } from "@/lib/utils/format-currency";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export function DishOfTheDay() {
  const { data: dish } = useDishOfDay();

  if (!dish) return null;

  const hasDiscount = dish.discountPrice !== null && dish.discountPrice < dish.menuItemPrice;

  return (
    <Box as="section" bg="linear-gradient(to right, var(--chakra-colors-orange-600), var(--chakra-colors-orange-500))" py={{ base: 12, md: 16 }}>
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <SectionHeader
            title="Dish of the Day"
            subtitle={dish.reason || "Chef's special selection for today"}
            titleColor="white"
            subtitleColor="whiteAlpha.800"
          />
          <Flex direction={{ base: "column", md: "row" }} align="center" gap={8} mt={12}>
            <Box position="relative" css={{ aspectRatio: "1" }} w="full" maxW="24rem" overflow="hidden" borderRadius="2xl" shadow="2xl" md={{ w: "50%" }}>
              {dish.menuItemImage ? (
                <Image
                  src={dish.menuItemImage}
                  alt={dish.menuItemName}
                  fill
                  className="object-cover"
                />
              ) : (
                <Flex h="full" w="full" align="center" justify="center" bg="orange.200" fontSize="8xl">
                  🍲
                </Flex>
              )}
              {hasDiscount && (
                <Box position="absolute" right={3} top={3} borderRadius="full" bg="red.500" px={3} py={1} fontSize="sm" fontWeight="bold" color="white" shadow="lg">
                  SAVE {Math.round(((dish.menuItemPrice - dish.discountPrice!) / dish.menuItemPrice) * 100)}%
                </Box>
              )}
            </Box>
            <Box flex={1} textAlign={{ base: "center", md: "left" }} color="white">
              <Heading as="h3" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">{dish.menuItemName}</Heading>
              {dish.menuItemDescription && (
                <Text mt={3} fontSize="lg" color="whiteAlpha.900" lineHeight="relaxed">{dish.menuItemDescription}</Text>
              )}
              <Flex mt={6} align="center" justify={{ base: "center", md: "flex-start" }} gap={3}>
                {hasDiscount ? (
                  <>
                    <Text as="span" fontSize="3xl" fontWeight="bold" color="white">
                      {formatCurrency(dish.discountPrice!)}
                    </Text>
                    <Text as="span" fontSize="xl" color="whiteAlpha.600" textDecoration="line-through">
                      {formatCurrency(dish.menuItemPrice)}
                    </Text>
                  </>
                ) : (
                  <Text as="span" fontSize="3xl" fontWeight="bold" color="white">
                    {formatCurrency(dish.menuItemPrice)}
                  </Text>
                )}
              </Flex>
              <Link href={`/menu/${dish.menuItemSlug}`}>
              <Box
                display="inline-block"
                mt={6}
                borderRadius="lg"
                bg="white"
                px={8}
                py={3}
                fontWeight={600}
                color="orange.700"
                transition="background 0.2s"
                _hover={{ bg: "orange.50" }}
              >
                Order Now
              </Box>
              </Link>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
