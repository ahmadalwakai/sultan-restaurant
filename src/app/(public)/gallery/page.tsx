"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import Image from "next/image";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";

const galleryUrls = [
  "https://images.unsplash.com/photo-1540914124281-342587941389?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=600&fit=crop&q=80",
];

const images = galleryUrls.map((src, i) => ({
  src,
  alt: `Gallery image ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <Box minH="screen" bg="gray.50" py={16}>
      <Container maxW="7xl" px={4}>
        <FadeInUp>
          <SectionHeader
            title="Gallery"
            subtitle="Take a visual tour of Sultan Restaurant"
          />
        </FadeInUp>
        <StaggerContainer staggerDelay={0.08}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} mt={10}>
            {images.map((img, i) => (
              <StaggerItem key={i}>
                <Box
                  position="relative"
                  css={{ aspectRatio: "1" }}
                  overflow="hidden"
                  rounded="xl"
                  role="group"
                  transition="transform 0.4s ease, box-shadow 0.4s ease"
                  _hover={{ transform: "scale(1.03)", shadow: "xl" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
                    style={{ transition: "transform 0.5s ease" }}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="blackAlpha.0"
                    transition="background 0.3s"
                    _groupHover={{ bg: "blackAlpha.300" }}
                  />
                </Box>
              </StaggerItem>
            ))}
          </SimpleGrid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}
