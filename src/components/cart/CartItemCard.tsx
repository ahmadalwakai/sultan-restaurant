"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import CartItemQuantity from "./CartItemQuantity";

interface CartItemCardProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemCard({ id, name, price, quantity, image, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <Flex gap={3} py={3} borderBottom="1px solid" borderColor="gray.100">
      {image && (
        <Box position="relative" w="60px" h="60px" borderRadius="md" overflow="hidden" flexShrink={0}>
          <Image src={image} alt={name} fill style={{ objectFit: "cover" }} sizes="60px" />
        </Box>
      )}
      <Box flex={1}>
        <Text fontWeight="semibold" fontSize="sm">{name}</Text>
        <Text fontSize="sm" color="brand.600" fontWeight="bold">{formatCurrency(price)}</Text>
      </Box>
      <CartItemQuantity quantity={quantity} onChange={(q) => q === 0 ? onRemove(id) : onUpdateQuantity(id, q)} />
    </Flex>
  );
}
