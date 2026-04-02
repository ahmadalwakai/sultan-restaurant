"use client";

import { useState } from "react";

interface GalleryImageCardProps {
  image: { id: string; url: string; alt?: string };
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function GalleryImageCard({ image, onDelete, onMoveUp, onMoveDown }: GalleryImageCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative aspect-square rounded-lg overflow-hidden border bg-gray-50 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image.url} alt={image.alt ?? ""} className="w-full h-full object-cover" />
      {hovered && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
          {onMoveUp && <button onClick={onMoveUp} className="w-8 h-8 bg-white rounded-full text-sm font-bold">↑</button>}
          {onMoveDown && <button onClick={onMoveDown} className="w-8 h-8 bg-white rounded-full text-sm font-bold">↓</button>}
          <button onClick={onDelete} className="w-8 h-8 bg-red-500 text-white rounded-full text-sm font-bold">×</button>
        </div>
      )}
    </div>
  );
}
