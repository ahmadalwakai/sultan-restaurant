"use client";

import { Box } from "@chakra-ui/react";

export default function GrainOverlay() {
  return (
    <Box
      position="absolute"
      inset={0}
      opacity={0.03}
      pointerEvents="none"
      bgImage="url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')"
    />
  );
}
