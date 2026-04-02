"use client";

import { Flex, Text, CloseButton, Badge } from "@chakra-ui/react";

interface CouponAppliedBadgeProps {
  code: string;
  discount: string;
  onRemove: () => void;
}

export default function CouponAppliedBadge({ code, discount, onRemove }: CouponAppliedBadgeProps) {
  return (
    <Flex align="center" bg="green.50" px={3} py={2} borderRadius="md" gap={2}>
      <Badge colorPalette="green">{code}</Badge>
      <Text fontSize="sm" color="green.700" flex={1}>{discount} off</Text>
      <CloseButton size="sm" onClick={onRemove} />
    </Flex>
  );
}
