"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Button, Flex, Text, Table } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface ComboRow {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  savings: number;
  image?: string | null;
  isActive: boolean;
  servesCount: number;
}

interface CombosTableProps {
  combos: ComboRow[];
  onDelete: (id: string) => void;
}

export function CombosTable({ combos, onDelete }: CombosTableProps) {
  return (
    <Box overflow="hidden" borderRadius="lg" borderWidth="1px" bg="white">
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg="gray.50">
            <Table.ColumnHeader px={4} py={3} textAlign="left" fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">Combo</Table.ColumnHeader>
            <Table.ColumnHeader px={4} py={3} textAlign="left" fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">Price</Table.ColumnHeader>
            <Table.ColumnHeader px={4} py={3} textAlign="left" fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">Savings</Table.ColumnHeader>
            <Table.ColumnHeader px={4} py={3} textAlign="left" fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">Serves</Table.ColumnHeader>
            <Table.ColumnHeader px={4} py={3} textAlign="left" fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">Status</Table.ColumnHeader>
            <Table.ColumnHeader px={4} py={3} textAlign="right" fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {combos.map((c) => (
            <Table.Row key={c.id} _hover={{ bg: "gray.50" }}>
              <Table.Cell px={4} py={3}>
                <Flex align="center" gap={3}>
                  <Box position="relative" h="10" w="10" flexShrink={0} overflow="hidden" borderRadius="lg">
                    {c.image ? (
                      <Image src={c.image} alt={c.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="lg">{String.fromCodePoint(0x1F371)}</Flex>
                    )}
                  </Box>
                  <Text fontSize="sm" fontWeight="medium">{c.name}</Text>
                </Flex>
              </Table.Cell>
              <Table.Cell px={4} py={3}><Text fontSize="sm">{formatCurrency(c.price)}</Text></Table.Cell>
              <Table.Cell px={4} py={3}><Text fontSize="sm" color="green.600">Save {formatCurrency(c.savings)}</Text></Table.Cell>
              <Table.Cell px={4} py={3}><Text fontSize="sm">{c.servesCount}</Text></Table.Cell>
              <Table.Cell px={4} py={3}>
                <Box
                  as="span"
                  borderRadius="md"
                  px={2}
                  py={1}
                  fontSize="xs"
                  bg={c.isActive ? "green.100" : "red.100"}
                  color={c.isActive ? "green.700" : "red.700"}
                >
                  {c.isActive ? "Active" : "Inactive"}
                </Box>
              </Table.Cell>
              <Table.Cell px={4} py={3}>
                <Flex justify="flex-end" gap={2}>
                  <Link href={`/admin/combos/${c.id}/edit`}><Button variant="ghost" size="sm" color="amber.600">Edit</Button></Link>
                  <Button variant="ghost" size="sm" color="red.600" onClick={() => onDelete(c.id)}>Delete</Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
