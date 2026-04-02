"use client";

import { Box, Text, Heading, Grid } from "@chakra-ui/react";
import Image from "next/image";

export default function AboutStory() {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12} alignItems="center">
      <Box>
        <Heading as="h2" fontSize="3xl" fontFamily="var(--font-heading)" mb={4}>
          Our Story
        </Heading>
        <Text color="gray.600" mb={4}>
          Founded with a passion for authentic Middle Eastern cuisine, Sultan Restaurant brings the rich flavours
          and traditions of the region to your table. Our journey began with a simple dream: to share the warmth
          of home-cooked meals with our community.
        </Text>
        <Text color="gray.600">
          Every dish is crafted with care, using traditional recipes passed down through generations and the
          finest ingredients sourced locally and from the Middle East.
        </Text>
      </Box>
      <Box position="relative" h="400px" borderRadius="xl" overflow="hidden">
        <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80" alt="Sultan Restaurant interior" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
      </Box>
    </Grid>
  );
}
