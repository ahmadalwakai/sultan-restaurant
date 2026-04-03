"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import { usePopularMenu } from "@/hooks/api";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";
import { motion } from "framer-motion";

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
          <FadeInUp>
            <SectionHeader
              title="A Glimpse of Sultan"
              subtitle="Step inside our world of flavour"
            />
          </FadeInUp>
          <StaggerContainer>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} w="full">
              {galleryItems.map((item) => (
                <StaggerItem key={item.id}>
                  <Link href={`/menu?highlight=${item.slug}`}>
                    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
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
            <Link href="/menu">
              <Text fontSize="sm" fontWeight="semibold" color="gray.500" transition="colors 0.2s" _hover={{ color: "amber.600" }}>
                Explore Full Menu &rarr;
              </Text>
            </Link>
          </FadeInUp>
        </VStack>
      </Container>
    </Box>
  );
}
