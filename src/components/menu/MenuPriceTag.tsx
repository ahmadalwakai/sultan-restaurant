"use client";

import { Text } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface MenuPriceTagProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "sm", md: "lg", lg: "xl" } as const;

export default function MenuPriceTag({ price, originalPrice, size = "md" }: MenuPriceTagProps) {
  return (
    <Text as="span" fontWeight="bold" color="brand.600" fontSize={sizeMap[size]}>
      {formatCurrency(price)}
      {originalPrice && originalPrice > price && (
        <Text as="span" ml={2} fontSize="sm" color="gray.400" textDecoration="line-through">
          {formatCurrency(originalPrice)}
        </Text>
      )}
    </Text>
  );
}
