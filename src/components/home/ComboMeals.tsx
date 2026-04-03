"use client";

import Link from "next/link";
import Image from "next/image";
import { useCombos } from "@/hooks/api";
import { formatCurrency } from "@/lib/utils/format-currency";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { Box, Container, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export function ComboMeals() {
  const { data: combos, isLoading } = useCombos();

  if (isLoading) return <LoadingState message="Loading combos..." />;
  if (!combos || combos.length === 0) return null;

  return (
    <Box as="section" bg="gray.50" py={20}>
      <Container maxW="7xl" px={4}>
        <SectionHeader
          title="Family & Combo Meals"
          subtitle="Great value meals for sharing — perfect for families"
        />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} mt={10}>
          {combos.slice(0, 6).map((combo) => (
            <Box
              key={combo.id}
              overflow="hidden"
              borderRadius="2xl"
              bg="white"
              shadow="md"
              transition="all 0.2s"
              _hover={{ shadow: "xl", transform: "translateY(-4px) scale(1.02)" }}
            >
              <Box position="relative" css={{ aspectRatio: "16/10" }}>
                {combo.image ? (
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Flex h="full" w="full" align="center" justify="center" bg="linear-gradient(to bottom right, var(--chakra-colors-orange-100), var(--chakra-colors-orange-100))" fontSize="5xl">
                    🍱
                  </Flex>
                )}
                {combo.savings > 0 && (
                  <Box position="absolute" left={3} top={3} borderRadius="full" bg="red.500" px={3} py={1} fontSize="xs" fontWeight="bold" color="white">
                    Save {formatCurrency(combo.savings)}
                  </Box>
                )}
                <Box position="absolute" right={3} top={3} borderRadius="full" bg="whiteAlpha.900" px={3} py={1} fontSize="xs" fontWeight="medium" color="gray.700">
                  Serves {combo.servesCount}
                </Box>
              </Box>
              <Box p={5}>
                <Heading size="md" fontWeight="bold" color="gray.900">{combo.name}</Heading>
                {combo.description && (
                  <Text mt={1} fontSize="sm" color="gray.500" lineClamp={2}>{combo.description}</Text>
                )}
                <Text mt={2} fontSize="xs" color="gray.400">
                  {combo.items.map((item) => `${item.quantity}× ${item.menuItemName}`).join(" • ")}
                </Text>
                <Flex mt={4} align="center" justify="space-between">
                  <Flex align="baseline" gap={2}>
                    <Text fontSize="xl" fontWeight="bold" color="orange.500">{formatCurrency(combo.price)}</Text>
                    {combo.originalPrice > combo.price && (
                      <Text fontSize="sm" color="gray.400" textDecoration="line-through">{formatCurrency(combo.originalPrice)}</Text>
                    )}
                  </Flex>
                  <Link href="/menu">
                  <Box
                    borderRadius="lg"
                    bg="orange.400"
                    px={4}
                    py={2}
                    fontSize="sm"
                    fontWeight={600}
                    color="white"
                    transition="background 0.2s"
                    _hover={{ bg: "orange.500" }}
                  >
                    Order
                  </Box>
                  </Link>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
