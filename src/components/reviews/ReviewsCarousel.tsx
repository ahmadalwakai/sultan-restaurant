"use client";

import { Box, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  source?: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, reviews.length - visibleCount);

  return (
    <Box position="relative">
      <HStack gap={6} overflow="hidden">
        {reviews.slice(currentIndex, currentIndex + visibleCount).map((review, i) => (
          <Box key={i} flex={1} minW="0">
            <ReviewCard {...review} />
          </Box>
        ))}
      </HStack>
      {reviews.length > visibleCount && (
        <HStack justify="center" gap={2} mt={4}>
          <IconButton
            aria-label="Previous reviews"
            size="sm"
            variant="ghost"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            ◀
          </IconButton>
          <IconButton
            aria-label="Next reviews"
            size="sm"
            variant="ghost"
            onClick={() => setCurrentIndex((i) => Math.min(maxIndex, i + 1))}
            disabled={currentIndex >= maxIndex}
          >
            ▶
          </IconButton>
        </HStack>
      )}
    </Box>
  );
}
