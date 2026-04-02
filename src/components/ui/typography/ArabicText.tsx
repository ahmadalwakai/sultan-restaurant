"use client";

import { Text, type TextProps } from "@chakra-ui/react";

export default function ArabicText({ children, ...props }: TextProps) {
  return (
    <Text
      dir="rtl"
      fontFamily="'Noto Sans Arabic', sans-serif"
      color="brand.500"
      fontSize="sm"
      {...props}
    >
      {children}
    </Text>
  );
}
