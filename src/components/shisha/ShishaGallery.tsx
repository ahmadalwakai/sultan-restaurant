"use client";

import { useState } from "react";
import { Box, Grid, Text, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { LuX, LuChevronLeft, LuChevronRight, LuExpand } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

// Professional shisha/hookah lounge images from Unsplash
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
    alt: "Elegant shisha setup with ambient lighting",
    category: "Lounge",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&q=80",
    alt: "Traditional hookah with golden accents",
    category: "Shisha",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=80",
    alt: "Modern shisha lounge interior",
    category: "Lounge",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=800&q=80",
    alt: "Premium shisha with fruit bowl",
    category: "Shisha",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1542826438-bd32f43d6460?w=800&q=80",
    alt: "Cozy hookah lounge seating area",
    category: "Lounge",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    alt: "Arabic style shisha experience",
    category: "Experience",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    alt: "Fresh mocktail drinks",
    category: "Drinks",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    alt: "Premium tea service",
    category: "Drinks",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    alt: "Fresh fruit for shisha flavors",
    category: "Flavors",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    alt: "Relaxing outdoor terrace",
    category: "Lounge",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80",
    alt: "Classic hookah design",
    category: "Shisha",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
    alt: "Evening ambiance at lounge",
    category: "Lounge",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1571950524112-3d5c4a7c87f5?w=800&q=80",
    alt: "Fresh juice selection",
    category: "Drinks",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1595623238469-fc18d3f83b7c?w=800&q=80",
    alt: "Mint tea preparation",
    category: "Drinks",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=80",
    alt: "Modern shisha setup",
    category: "Shisha",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80",
    alt: "Group enjoying shisha",
    category: "Experience",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    alt: "Fresh tropical fruits",
    category: "Flavors",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=800&q=80",
    alt: "Premium coffee service",
    category: "Drinks",
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
    alt: "Night lounge atmosphere",
    category: "Lounge",
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80",
    alt: "Refreshing berry drinks",
    category: "Drinks",
  },
];

const categories = ["All", "Lounge", "Shisha", "Drinks", "Flavors", "Experience"];

export function ShishaGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };
  
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <Box>
      {/* Category Filter */}
      <HStack gap={3} flexWrap="wrap" justify="center" mb={8}>
        {categories.map((cat) => (
          <Box
            key={cat}
            as="button"
            onClick={() => setSelectedCategory(cat)}
            px={5}
            py={2}
            borderRadius="full"
            fontSize="sm"
            fontWeight="500"
            bg={selectedCategory === cat ? "#8B5CF6" : "rgba(255,255,255,0.05)"}
            color={selectedCategory === cat ? "white" : "whiteAlpha.700"}
            border="1px solid"
            borderColor={selectedCategory === cat ? "#8B5CF6" : "transparent"}
            transition="all 0.2s"
            _hover={{
              bg: selectedCategory === cat ? "#7C3AED" : "rgba(139,92,246,0.2)",
              borderColor: "#8B5CF6",
            }}
          >
            {cat}
          </Box>
        ))}
      </HStack>

      {/* Gallery Grid */}
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={3}
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Box
              position="relative"
              aspectRatio={1}
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
              _hover={{
                "& > div:last-child": { opacity: 1 },
                transform: "scale(1.02)",
              }}
              transition="transform 0.2s"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
              {/* Hover Overlay */}
              <Box
                position="absolute"
                inset={0}
                bg="rgba(0,0,0,0.5)"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                opacity={0}
                transition="opacity 0.2s"
              >
                <LuExpand size={24} color="white" />
                <Text fontSize="xs" color="white" mt={2} textAlign="center" px={2}>
                  {image.alt}
                </Text>
              </Box>
              {/* Category Badge */}
              <Box
                position="absolute"
                bottom={2}
                left={2}
                bg="rgba(0,0,0,0.7)"
                color="whiteAlpha.800"
                px={2}
                py={0.5}
                borderRadius="md"
                fontSize="xs"
              >
                {image.category}
              </Box>
            </Box>
          </motion.div>
        ))}
      </Grid>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.95)",
            }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <Box
              as="button"
              position="absolute"
              top={4}
              right={4}
              p={2}
              borderRadius="full"
              bg="rgba(255,255,255,0.1)"
              color="white"
              onClick={closeLightbox}
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
              zIndex={1}
            >
              <LuX size={24} />
            </Box>

            {/* Navigation Buttons */}
            <Box
              as="button"
              position="absolute"
              left={4}
              p={3}
              borderRadius="full"
              bg="rgba(255,255,255,0.1)"
              color="white"
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); prevImage(); }}
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
              display={{ base: "none", md: "block" }}
            >
              <LuChevronLeft size={28} />
            </Box>
            <Box
              as="button"
              position="absolute"
              right={4}
              p={3}
              borderRadius="full"
              bg="rgba(255,255,255,0.1)"
              color="white"
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); nextImage(); }}
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
              display={{ base: "none", md: "block" }}
            >
              <LuChevronRight size={28} />
            </Box>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "85vh",
                width: "auto",
                height: "auto",
              }}
            >
              <Image
                src={filteredImages[lightboxIndex].src.replace("w=800", "w=1600")}
                alt={filteredImages[lightboxIndex].alt}
                width={1200}
                height={800}
                style={{ 
                  maxWidth: "90vw", 
                  maxHeight: "80vh", 
                  width: "auto", 
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <Text
                position="absolute"
                bottom={-8}
                left="50%"
                transform="translateX(-50%)"
                color="whiteAlpha.700"
                fontSize="sm"
                textAlign="center"
                whiteSpace="nowrap"
              >
                {filteredImages[lightboxIndex].alt}
              </Text>
            </motion.div>

            {/* Mobile Navigation */}
            <HStack
              position="absolute"
              bottom={6}
              left="50%"
              transform="translateX(-50%)"
              gap={4}
              display={{ base: "flex", md: "none" }}
            >
              <Box
                as="button"
                p={3}
                borderRadius="full"
                bg="rgba(255,255,255,0.1)"
                color="white"
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); prevImage(); }}
              >
                <LuChevronLeft size={24} />
              </Box>
              <Text color="whiteAlpha.600" fontSize="sm">
                {lightboxIndex + 1} / {filteredImages.length}
              </Text>
              <Box
                as="button"
                p={3}
                borderRadius="full"
                bg="rgba(255,255,255,0.1)"
                color="white"
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); nextImage(); }}
              >
                <LuChevronRight size={24} />
              </Box>
            </HStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
