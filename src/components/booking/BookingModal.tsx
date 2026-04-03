"use client";

import { useEffect, useRef } from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Flex
      ref={overlayRef}
      position="fixed"
      inset={0}
      zIndex={50}
      align="center"
      justify="center"
      bg="blackAlpha.600"
      p={4}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <Box position="relative" w="full" maxW="lg" borderRadius="2xl" bg="bg.surface" p={6} shadow="xl">
        <IconButton
          aria-label="Close"
          variant="ghost"
          position="absolute"
          right={4}
          top={4}
          fontSize="2xl"
          color="gray.400"
          _hover={{ color: "gray.600" }}
          onClick={onClose}
        >
          &times;
        </IconButton>
        <Heading mb={6} size="lg" fontWeight="bold" color="gray.900">
          Book a Table
        </Heading>
        <BookingForm onSuccess={onClose} />
      </Box>
    </Flex>
  );
}
