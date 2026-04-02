"use client";

import { GalleryImageCard } from "./GalleryImageCard";

interface GalleryImage { id: string; url: string; alt?: string; order: number }

export function GalleryGrid({ images, onDelete, onReorder }: { images: GalleryImage[]; onDelete: (id: string) => void; onReorder?: (id: string, direction: "up" | "down") => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((img, i) => (
        <GalleryImageCard
          key={img.id}
          image={img}
          onDelete={() => onDelete(img.id)}
          onMoveUp={onReorder && i > 0 ? () => onReorder(img.id, "up") : undefined}
          onMoveDown={onReorder && i < images.length - 1 ? () => onReorder(img.id, "down") : undefined}
        />
      ))}
    </div>
  );
}
