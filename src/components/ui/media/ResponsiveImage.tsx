"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  priority?: boolean;
  sizes?: string;
}

export default function ResponsiveImage({ src, alt, aspectRatio = 16 / 9, priority = false, sizes = "100vw" }: ResponsiveImageProps) {
  return (
    <Box position="relative" w="full" style={{ aspectRatio }} overflow="hidden">
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} priority={priority} sizes={sizes} />
    </Box>
  );
}
