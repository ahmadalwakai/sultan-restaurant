"use client";

import { VStack, HStack, Box, Text, Button, Image } from "@chakra-ui/react";

interface GalleryDragReorderProps {
  images: Array<{ id: string; url: string; order: number }>;
  onReorder: (orderedIds: string[]) => void;
}

export function GalleryDragReorder({ images, onReorder }: GalleryDragReorderProps) {
  const moveItem = (index: number, direction: "up" | "down") => {
    const sorted = [...images].sort((a, b) => a.order - b.order);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sorted.length) return;
    [sorted[index], sorted[newIndex]] = [sorted[newIndex], sorted[index]];
    onReorder(sorted.map((img) => img.id));
  };

  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <VStack gap={2} align="stretch">
      {sorted.map((img, i) => (
        <HStack key={img.id} gap={3} p={2} bg="bg.surface" border="1px solid" borderColor="gray.200" borderRadius="lg">
          <Image src={img.url} alt="" w={12} h={12} objectFit="cover" borderRadius="md" />
          <Text fontSize="sm" color="gray.500" flex={1}>Position {i + 1}</Text>
          <Button size="xs" variant="outline" onClick={() => moveItem(i, "up")} disabled={i === 0}>↑</Button>
          <Button size="xs" variant="outline" onClick={() => moveItem(i, "down")} disabled={i === sorted.length - 1}>↓</Button>
        </HStack>
      ))}
    </VStack>
  );
}
