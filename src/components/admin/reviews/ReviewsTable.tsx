"use client";

import { HStack, Button, Text, Badge } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Review { id: string; userName: string; rating: number; comment: string; status: string; createdAt: string }

export function ReviewsTable({ reviews, isLoading, onApprove, onReject, onDelete }: { reviews: Review[]; isLoading?: boolean; onApprove: (id: string) => void; onReject: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <AdminTable
      data={reviews}
      keyExtractor={(r) => r.id}
      isLoading={isLoading}
      columns={[
        {
          key: "user",
          header: "User",
          render: (r) => <Text>{r.userName}</Text>
        },
        {
          key: "rating",
          header: "Rating",
          render: (r) => (
            <Text color="amber.500">
              {"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}
            </Text>
          )
        },
        {
          key: "comment",
          header: "Comment",
          render: (r) => (
            <Text fontSize="sm" color="gray.600" maxW="xs" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {r.comment}
            </Text>
          )
        },
        {
          key: "status",
          header: "Status",
          render: (r) => {
            const colorScheme = r.status === "APPROVED" ? "green" : r.status === "PENDING" ? "yellow" : r.status === "REJECTED" ? "red" : "gray";
            return (
              <Badge colorScheme={colorScheme} fontSize="xs" px={2} py={1} borderRadius="md" fontWeight="medium">
                {r.status}
              </Badge>
            );
          }
        },
        {
          key: "actions",
          header: "",
          render: (r) => (
            <HStack gap={2} justify="end">
              {r.status !== "APPROVED" && (
                <Button
                  size="sm"
                  variant="ghost"
                  color="green.600"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => onApprove(r.id)}
                >
                  Approve
                </Button>
              )}
              {r.status !== "REJECTED" && (
                <Button
                  size="sm"
                  variant="ghost"
                  color="yellow.600"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => onReject(r.id)}
                >
                  Reject
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                color="red.600"
                _hover={{ textDecoration: "underline" }}
                onClick={() => onDelete(r.id)}
              >
                Delete
              </Button>
            </HStack>
          )
        },
      ]}
    />
  );
}
