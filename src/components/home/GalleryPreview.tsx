"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import { usePopularMenu } from "@/hooks/api";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";
import { motion } from "framer-motion";

const fallbackGallery = [
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=600&fit=crop&q=80", alt: "Charcoal grilled kebabs" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop&q=80", alt: "Fresh mezzeh platter" },
  { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop&q=80", alt: "Aromatic biryani" },
  { src: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop&q=80", alt: "Lamb shawarma" },
  { src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop&q=80", alt: "Tandoori dishes" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop&q=80", alt: "Fresh salads" },
];

export function GalleryPreview() {
  const { data: items } = usePopularMenu();

  const apiGalleryItems = (items ?? [])
    .filter((item) => item.image)
    .slice(0, 6)
    .map((item) => ({ src: item.image!, alt: item.name }));

  const galleryItems = apiGalleryItems.length > 0 ? apiGalleryItems : fallbackGallery;

  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="bg.subtle">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <FadeInUp>
            <SectionHeader
              title="A Glimpse of Sultan"
              subtitle="Step inside our world of flavour"
            />
          </FadeInUp>
          <StaggerContainer>
            <SimpleGrid columns={{ base: 2, md: 3 }} gap={4} w="full">
              {galleryItems.map((item, i) => (
                <StaggerItem key={i}>
                  <Link href="/gallery">
                    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
                      <Box position="relative" css={{ aspectRatio: "1" }} overflow="hidden" borderRadius="xl" role="group">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          style={{ objectFit: "cover", transition: "transform 0.5s" }}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          unoptimized
                        />
                        <Box
                          position="absolute"
                          inset={0}
                          bg="blackAlpha.0"
                          _groupHover={{ bg: "blackAlpha.400" }}
                          transition="all 0.4s"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text
                            color="white"
                            fontWeight="bold"
                            fontSize="lg"
                            opacity={0}
                            _groupHover={{ opacity: 1 }}
                            transition="opacity 0.3s"
                          >
                            View
                          </Text>
                        </Box>
                      </Box>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </SimpleGrid>
          </StaggerContainer>
          <FadeInUp delay={0.4}>
            <Link href="/gallery">
              <Text fontSize="sm" fontWeight="semibold" color="gray.500" transition="colors 0.2s" _hover={{ color: "amber.600" }}>
                View Full Gallery &rarr;
              </Text>
            </Link>
          </FadeInUp>
        </VStack>
      </Container>
    </Box>
  );
}
