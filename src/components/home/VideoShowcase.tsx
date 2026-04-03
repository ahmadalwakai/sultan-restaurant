"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, Flex, Text, chakra } from "@chakra-ui/react";

export function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Box as="section" bg="gray.900" py={20}>
      <Container maxW="7xl" px={4}>
        <SectionHeader
          label="Our Kitchen"
          title="Behind the Scenes"
          subtitle="Watch our chefs craft your favourite dishes"
          light={true}
        />
        <Flex mt={10} justify="center">
          <Box position="relative" w="full" maxW="4xl" overflow="hidden" borderRadius="2xl" shadow="2xl">
            <Box position="relative" css={{ aspectRatio: "16/9" }} bg="gray.800">
              {isPlaying ? (
                <Box as="video" h="full" w="full" objectFit="cover" />
              ) : (
                <>
                  <Flex h="full" w="full" align="center" justify="center" bg="linear-gradient(to bottom right, var(--chakra-colors-gray-700), var(--chakra-colors-gray-800))">
                    <Box textAlign="center" color="white">
                      <Text fontSize="6xl">🎥</Text>
                      <Text mt={4} fontSize="lg" fontWeight="medium">Our Kitchen in Action</Text>
                    </Box>
                  </Flex>
                  <chakra.button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    position="absolute"
                    inset={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="blackAlpha.300"
                    transition="background 0.2s"
                    _hover={{ bg: "blackAlpha.400" }}
                    aria-label="Play video"
                  >
                    <Flex h={20} w={20} align="center" justify="center" borderRadius="full" bg="orange.400" color="white" shadow="lg" transition="transform 0.2s" _hover={{ transform: "scale(1.1)" }}>
                      <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Flex>
                  </chakra.button>
                </>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
