"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import Image from "next/image";

interface ImageCardProps extends BoxProps {
  src: string;
  alt: string;
  aspectRatio?: number;
}

export default function ImageCard({ src, alt, aspectRatio = 4 / 3, children, ...props }: ImageCardProps) {
  return (
    <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden" {...props}>
      <Box position="relative" style={{ aspectRatio }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
      </Box>
      {children}
    </Box>
  );
}
