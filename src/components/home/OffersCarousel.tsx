"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { useOffers } from "@/hooks/api";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, Button, HStack } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInUp } from "@/components/animation";

export function OffersCarousel() {
  const { data: offers, isLoading } = useOffers();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isLoading && (!offers || offers.length === 0)) return null;

  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.elevated" color="fg.on-dark" position="relative" overflow="hidden">
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <VStack gap={12}>
          <FadeInUp>
            <SectionHeader
              label="Limited Time"
              title="Today's Special Offers"
              subtitle="Exclusive deals you don't want to miss"
              light
            />
          </FadeInUp>

          <Box position="relative" w="full" maxW="4xl" mx="auto">
            <Box
              ref={emblaRef}
              overflow="hidden"
              borderRadius="2xl"
              className="hide-scrollbar"
            >
              <Box display="flex">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Box
                      key={i}
                      flex="0 0 80%"
                      mr={i < 2 ? 6 : 0}
                      h="64"
                      borderRadius="xl"
                      bg="whiteAlpha.200"
                      animation="pulse 2s infinite"
                    />
                  ))
                ) : (
                  offers!.map((offer, index) => (
                    <Box
                      key={offer.id}
                      flex="0 0 80%"
                      mr={index < offers!.length - 1 ? 6 : 0}
                      minW={0}
                    >
                      <OfferCard offer={offer} />
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            {/* Navigation buttons */}
            <Button
              position="absolute"
              left={-4}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollPrev}
              variant="outline"
              borderColor="whiteAlpha.300"
              color="whiteAlpha.900"
              borderRadius="full"
              p={3}
              bg="blackAlpha.500"
              _hover={{ bg: "blackAlpha.700" }}
              display={{ base: "none", md: "flex" }}
            >
              <ChevronLeft size={20} />
            </Button>

            <Button
              position="absolute"
              right={-4}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollNext}
              variant="outline"
              borderColor="whiteAlpha.300"
              color="whiteAlpha.900"
              borderRadius="full"
              p={3}
              bg="blackAlpha.500"
              _hover={{ bg: "blackAlpha.700" }}
              display={{ base: "none", md: "flex" }}
            >
              <ChevronRight size={20} />
            </Button>

            {/* Dots indicator - only render after mount to prevent hydration mismatch */}
            {mounted && scrollSnaps.length > 0 && (
              <HStack justify="center" mt={6} gap={2}>
                {scrollSnaps.map((_, index) => (
                  <Box
                    key={index}
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={index === selectedIndex ? "brand.primary" : "whiteAlpha.400"}
                    cursor="pointer"
                    onClick={() => scrollTo(index)}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
