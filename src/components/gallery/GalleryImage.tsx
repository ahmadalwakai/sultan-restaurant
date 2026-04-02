"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

interface GalleryImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export default function GalleryImage({ src, alt, onClick }: GalleryImageProps) {
  return (
    <Box
      position="relative"
      aspectRatio={1}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
      _hover={{ transform: "scale(1.02)", shadow: "lg" }}
      transition="all 0.2s"
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" />
    </Box>
  );
}
