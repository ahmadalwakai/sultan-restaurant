"use client";

import { chakra } from "@chakra-ui/react";

interface AdminExportButtonProps {
  href: string;
  label?: string;
}

export function AdminExportButton({ href, label = "Export CSV" }: AdminExportButtonProps) {
  return (
    <chakra.a
      href={href}
      download
      display="inline-flex"
      alignItems="center"
      px={3}
      py={2}
      fontSize="sm"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
      _hover={{ bg: "gray.50" }}
    >
      📥 {label}
    </chakra.a>
  );
}