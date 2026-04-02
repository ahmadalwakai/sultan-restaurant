"use client";

import { Box, Text } from "@chakra-ui/react";

interface MarqueeBannerProps {
  message: string;
  bg?: string;
  color?: string;
}

export default function MarqueeBanner({ message, bg = "brand.600", color = "white" }: MarqueeBannerProps) {
  return (
    <Box bg={bg} color={color} py={2} overflow="hidden" whiteSpace="nowrap">
      <Text
        display="inline-block"
        animation="marquee 20s linear infinite"
        fontSize="sm"
        fontWeight="medium"
      >
        {message} &nbsp;&nbsp;&nbsp; {message} &nbsp;&nbsp;&nbsp; {message}
      </Text>
    </Box>
  );
}
