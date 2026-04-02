"use client";

import { Text } from "@chakra-ui/react";

interface MenuArabicNameProps {
  name: string;
}

export default function MenuArabicName({ name }: MenuArabicNameProps) {
  return (
    <Text
      fontSize="sm"
      color="brand.600"
      fontFamily="var(--font-heading)"
      dir="rtl"
      lang="ar"
    >
      {name}
    </Text>
  );
}
