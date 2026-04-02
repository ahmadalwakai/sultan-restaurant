"use client";

import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format-currency";

interface OrderHistoryCardProps {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  itemCount: number;
}

export default function OrderHistoryCard({ id, orderNumber, status, total, createdAt, itemCount }: OrderHistoryCardProps) {
  return (
    <Link href={`/account/orders/${id}`}>
      <Box bg="white" p={4} borderRadius="lg" shadow="sm" _hover={{ shadow: "md" }} transition="shadow 0.2s">
        <Flex justify="space-between" align="start">
          <Box>
            <Text fontWeight="semibold">{orderNumber}</Text>
            <Text fontSize="sm" color="gray.500">{new Date(createdAt).toLocaleDateString()}</Text>
            <Text fontSize="sm" color="gray.500">{itemCount} items</Text>
          </Box>
          <Box textAlign="right">
            <Badge colorPalette={status === "COMPLETED" ? "green" : status === "CANCELLED" ? "red" : "yellow"}>
              {status}
            </Badge>
            <Text fontWeight="bold" mt={1}>{formatCurrency(total)}</Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
}
