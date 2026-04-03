"use client";

import { type ReactNode } from "react";
import { Container, Box } from "@chakra-ui/react";

interface AdminPageShellProps {
  children: ReactNode;
}

/** Standard page wrapper — provides padding + max-width inside the content area */
export function AdminPageShell({ children }: AdminPageShellProps) {
  return (
    <Box bg="gray.50" minH="100%">
      <Container maxW="7xl" py={{ base: 6, md: 10 }} px={{ base: 4, md: 6 }}>
        {children}
      </Container>
    </Box>
  );
}
