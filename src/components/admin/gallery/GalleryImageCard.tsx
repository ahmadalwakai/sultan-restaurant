"use client";

import { useState } from "react";
import { Box, Flex, IconButton, Image } from "@chakra-ui/react";

interface GalleryImageCardProps {
  image: { id: string; url: string; alt?: string };
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function GalleryImageCard({ image, onDelete, onMoveUp, onMoveDown }: GalleryImageCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      position="relative"
      aspectRatio="1/1"
      borderRadius="lg"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      bg="gray.50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={image.url} alt={image.alt ?? ""} w="full" h="full" objectFit="cover" />
      {hovered && (
        <Flex position="absolute" inset={0} bg="blackAlpha.600" align="center" justify="center" gap={2}>
          {onMoveUp && <IconButton aria-label="Move up" size="sm" borderRadius="full" bg="white" onClick={onMoveUp}>↑</IconButton>}
          {onMoveDown && <IconButton aria-label="Move down" size="sm" borderRadius="full" bg="white" onClick={onMoveDown}>↓</IconButton>}
          <IconButton aria-label="Delete" size="sm" borderRadius="full" bg="red.500" color="white" onClick={onDelete}>×</IconButton>
        </Flex>
      )}
    </Box>
  );
}
