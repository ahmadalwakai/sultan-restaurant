"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";
import { Box, Flex, Text, chakra } from "@chakra-ui/react";

interface MobileMenuItemCardSwipeProps {
  item: MenuItemPublic;
  onAddToCart?: () => void;
  onClick?: () => void;
}

export function MobileMenuItemCardSwipe({ item, onAddToCart, onClick }: MobileMenuItemCardSwipeProps) {
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef(0);
  const swiping = useRef(false);

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    swiping.current = true;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!swiping.current) return;
    const diff = e.touches[0].clientX - startX.current;
    setOffsetX(Math.max(-80, Math.min(0, diff)));
  }

  function handleTouchEnd() {
    swiping.current = false;
    if (offsetX < -40) {
      setOffsetX(-80);
    } else {
      setOffsetX(0);
    }
  }

  return (
    <Box position="relative" overflow="hidden" borderRadius="xl">
      {/* Swipe action behind */}
      <Flex position="absolute" right={0} top={0} h="full" w={20} align="center" justify="center" bg="orange.500">
        <chakra.button type="button" onClick={onAddToCart} fontSize="xl" color="white" aria-label="Add to cart">{String.fromCodePoint(0x1F6D2)}</chakra.button>
      </Flex>
      {/* Main card */}
      <Flex
        position="relative"
        gap={3}
        bg="white"
        p={3}
        transition="transform 0.2s"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}
      >
        <Box position="relative" h={20} w={20} flexShrink={0} overflow="hidden" borderRadius="lg">
          {item.image ? (
            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
          ) : (
            <Flex h="full" w="full" align="center" justify="center" bg="orange.50" fontSize="3xl">{String.fromCodePoint(0x1F35B)}</Flex>
          )}
        </Box>
        <Box minW={0} flex={1}>
          <Text truncate fontWeight="medium" color="gray.900">{item.name}</Text>
          {item.description && <Text mt={0.5} truncate fontSize="xs" color="gray.400">{item.description}</Text>}
          <Text mt={1} fontWeight="bold" color="orange.600">{formatCurrency(item.price)}</Text>
        </Box>
      </Flex>
    </Box>
  );
}