"use client";

import Link from "next/link";
import { usePopularMenu } from "@/hooks/api";
import { MenuItemCard } from "@/components/cards/MenuItemCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/animation";

export function PopularDishes() {
  const { data: items, isLoading, isError } = usePopularMenu();

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
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="full">
              {Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} h="72" borderRadius="xl" bg="gray.200" animation="pulse 2s infinite" />
              ))}
            </SimpleGrid>
          ) : isError || !items || items.length === 0 ? (
            <FadeInUp delay={0.2}>
              <Text textAlign="center" color="gray.500">
                Our full menu is available on the menu page.
              </Text>
            </FadeInUp>
          ) : (
            <StaggerContainer>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="full">
                {items.slice(0, 8).map((item) => (
                  <StaggerItem key={item.id}>
                    <AnimatedCard>
                      <MenuItemCard item={item} />
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
