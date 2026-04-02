"use client";

import { Heading, type HeadingProps } from "@chakra-ui/react";

export default function SectionHeading({ children, ...props }: HeadingProps) {
  return (
    <Heading
      as="h2"
      fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
      fontFamily="var(--font-heading)"
      fontWeight="bold"
      {...props}
    >
      {children}
    </Heading>
  );
}
