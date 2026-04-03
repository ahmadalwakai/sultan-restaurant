"use client";

import type { ReactNode } from "react";
import { Box, VStack, Table } from "@chakra-ui/react";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  width?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
}

export function AdminTable<T>({ columns, data, keyExtractor, isLoading }: AdminTableProps<T>) {
  if (isLoading) {
    return (
      <VStack gap={3} align="stretch">
        {[...Array(5)].map((_, i) => (
          <Box key={i} h={12} bg="gray.100" borderRadius="md" />
        ))}
      </VStack>
    );
  }

  return (
    <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="lg">
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg="gray.50">
            {columns.map((col) => (
              <Table.ColumnHeader
                key={col.key}
                px={4}
                py={3}
                textAlign="left"
                fontSize="xs"
                fontWeight="medium"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wider"
                width={col.width}
              >
                {col.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={keyExtractor(item)} _hover={{ bg: "gray.50" }} bg="bg.surface">
              {columns.map((col) => (
                <Table.Cell key={col.key} px={4} py={3} fontSize="sm">
                  {col.render(item)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
