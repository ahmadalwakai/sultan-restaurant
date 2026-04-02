"use client";

import { Box, IconButton, Text, HStack } from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";
import Image from "next/image";

interface GalleryLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }: GalleryLightboxProps) {
  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()}>
      <Dialog.Backdrop bg="blackAlpha.900" />
      <Dialog.Positioner>
        <Dialog.Content bg="transparent" shadow="none" maxW="90vw" maxH="90vh">
          <Box position="relative" w="full" h="80vh">
            <Image src={current.src} alt={current.alt} fill style={{ objectFit: "contain" }} sizes="90vw" />
          </Box>
          <HStack justify="center" gap={4} mt={4}>
            <IconButton aria-label="Previous" onClick={onPrev} variant="ghost" color="white" disabled={currentIndex === 0}>
              ◀
            </IconButton>
            <Text color="white">{currentIndex + 1} / {images.length}</Text>
            <IconButton aria-label="Next" onClick={onNext} variant="ghost" color="white" disabled={currentIndex === images.length - 1}>
              ▶
            </IconButton>
          </HStack>
          <Dialog.CloseTrigger position="absolute" top={2} right={2} color="white" />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
