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
      cursor={onClick ? "pointer" : undefined}
      onClick={onClick}
      overflow="hidden"
      borderRadius="lg"
      style={{ aspectRatio: "1" }}
      _hover={{ "& img": { transform: "scale(1.05)" } }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover", transition: "transform 0.3s" }}
        sizes="(max-width: 768px) 50vw, 25vw"
      />
    </Box>
  );
}
