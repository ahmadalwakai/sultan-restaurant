"use client";

import { Skeleton, VStack } from "@chakra-ui/react";

interface LoadingSkeletonProps {
  lines?: number;
  height?: string;
}

export default function LoadingSkeleton({ lines = 3, height = "20px" }: LoadingSkeletonProps) {
  return (
    <VStack gap={3} w="full">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={height} w={i === lines - 1 ? "60%" : "100%"} borderRadius="md" />
      ))}
    </VStack>
  );
}
