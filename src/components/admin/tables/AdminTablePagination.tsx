"use client";

import { HStack, Text, Button } from "@chakra-ui/react";

interface AdminTablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AdminTablePagination({ page, totalPages, onPageChange }: AdminTablePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <HStack justify="space-between" mt={4} py={2}>
      <Text fontSize="sm" color="gray.500">
        Page {page} of {totalPages}
      </Text>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </HStack>
    </HStack>
  );
}
