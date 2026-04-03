"use client";

import { SimpleGrid } from "@chakra-ui/react";
import { GalleryImageCard } from "./GalleryImageCard";

interface GalleryImage { id: string; url: string; alt?: string; order: number }

export function GalleryGrid({ images, onDelete, onReorder }: { images: GalleryImage[]; onDelete: (id: string) => void; onReorder?: (id: string, direction: "up" | "down") => void }) {
  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={4}>
      {images.map((img, i) => (
        <GalleryImageCard
          key={img.id}
          image={img}
          onDelete={() => onDelete(img.id)}
          onMoveUp={onReorder && i > 0 ? () => onReorder(img.id, "up") : undefined}
          onMoveDown={onReorder && i < images.length - 1 ? () => onReorder(img.id, "down") : undefined}
        />
      ))}
    </SimpleGrid>
  );
}
