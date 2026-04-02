"use client";

import { Text, Flex } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceTag({ price, originalPrice, size = "md" }: PriceTagProps) {
  const fontSize = size === "sm" ? "sm" : size === "lg" ? "xl" : "md";

  return (
    <Flex align="center" gap={2}>
      <Text fontSize={fontSize} fontWeight="bold" color="brand.600">
        {formatCurrency(price)}
      </Text>
      {originalPrice && originalPrice > price && (
        <Text fontSize="sm" color="gray.400" textDecoration="line-through">
          {formatCurrency(originalPrice)}
        </Text>
      )}
    </Flex>
  );
}
