"use client";

import { SimpleGrid } from "@chakra-ui/react";
import GalleryImage from "./GalleryImage";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryItem[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4}>
      {images.map((image, index) => (
        <GalleryImage
          key={image.id}
          src={image.src}
          alt={image.alt}
          onClick={() => onImageClick(index)}
        />
      ))}
    </SimpleGrid>
  );
}
