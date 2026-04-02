"use client";

import { Text, type TextProps } from "@chakra-ui/react";

export default function SectionSubheading({ children, ...props }: TextProps) {
  return (
    <Text
      fontSize={{ base: "md", md: "lg" }}
      color="gray.600"
      maxW="2xl"
      mx="auto"
      {...props}
    >
      {children}
    </Text>
  );
}
