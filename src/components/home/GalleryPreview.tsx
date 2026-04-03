"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import { usePopularMenu } from "@/hooks/api";

export function GalleryPreview() {
  const { data: items } = usePopularMenu();

  const galleryItems = (items ?? [])
    .filter((item) => item.image)
    .slice(0, 4);

  if (galleryItems.length === 0) return null;

  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="bg.subtle">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <SectionHeader
            title="A Glimpse of Sultan"
            subtitle="Step inside our world of flavour"
          />
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} w="full">
            {galleryItems.map((item) => (
              <Link key={item.id} href={`/menu?highlight=${item.slug}`}>
                <Box position="relative" css={{ aspectRatio: "1" }} overflow="hidden" borderRadius="xl" role="group">
                  <Image
                    src={item.image!}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.5s" }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="to-t"
                    gradientFrom="blackAlpha.600"
                    gradientVia="transparent"
                    gradientTo="transparent"
                    opacity={0}
                    transition="opacity 0.3s"
                    _groupHover={{ opacity: 1 }}
                  />
                  <Text
                    position="absolute"
                    bottom={3}
                    left={3}
                    fontSize="sm"
                    fontWeight="semibold"
                    color="white"
                    opacity={0}
                    transition="opacity 0.3s"
                    _groupHover={{ opacity: 1 }}
                  >
                    {item.name}
                  </Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
          <Link href="/menu">
            <Text fontSize="sm" fontWeight="semibold" color="gray.500" transition="colors 0.2s" _hover={{ color: "amber.600" }}>
              Explore Full Menu &rarr;
            </Text>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
