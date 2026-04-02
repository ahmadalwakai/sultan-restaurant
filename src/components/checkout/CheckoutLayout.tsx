"use client";

import { Box, Grid } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface CheckoutLayoutProps {
  main: ReactNode;
  sidebar: ReactNode;
}

export default function CheckoutLayout({ main, sidebar }: CheckoutLayoutProps) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "1fr 400px" }} gap={8} maxW="6xl" mx="auto" px={4} py={8}>
      <Box>{main}</Box>
      <Box position={{ lg: "sticky" }} top={{ lg: "100px" }} alignSelf="start">
        {sidebar}
      </Box>
    </Grid>
  );
}
