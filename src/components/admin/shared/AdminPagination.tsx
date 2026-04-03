"use client";

import { Button, Flex, HStack, Text } from "@chakra-ui/react";

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AdminPagination({ page, totalPages, onPageChange }: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Flex align="center" justify="space-between" mt={4}>
      <Text fontSize="sm" color="gray.500">
        Page {page} of {totalPages}
      </Text>
      <HStack gap={2}>
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          size="sm"
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </HStack>
    </Flex>
  );
}
