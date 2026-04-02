"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  overlay?: boolean;
}

export default function HeroImage({ src, alt, overlay = true }: HeroImageProps) {
  return (
    <Box position="absolute" inset={0} zIndex={0}>
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} priority sizes="100vw" />
      {overlay && (
        <Box position="absolute" inset={0} bg="blackAlpha.600" />
      )}
    </Box>
  );
}
