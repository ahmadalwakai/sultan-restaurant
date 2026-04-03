"use client";

import Link from "next/link";
import { HStack, Button, Text } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";
import { OfferStatusBadge } from "./OfferStatusBadge";

interface Offer { id: string; title: string; discountType: string; discountValue: number; isActive: boolean; expiresAt?: string | null }

interface OffersTableProps {
  offers: Offer[];
  isLoading?: boolean;
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export function OffersTable({ offers, isLoading, onToggle, onDelete }: OffersTableProps) {
  return (
    <AdminTable
      data={offers}
      keyExtractor={(o) => o.id}
      isLoading={isLoading}
      columns={[
        {
          key: "title",
          header: "Title",
          render: (o) => (
            <Link href={`/admin/offers/${o.id}/edit`}>
              <Text color="amber.600" _hover={{ textDecoration: "underline" }} fontWeight="medium">
                {o.title}
              </Text>
            </Link>
          )
        },
        {
          key: "discount",
          header: "Discount",
          render: (o) => (
            <Text>
              {o.discountType === "PERCENTAGE" ? `${o.discountValue}%` : `£${(o.discountValue / 100).toFixed(2)}`}
            </Text>
          )
        },
        {
          key: "status",
          header: "Status",
          render: (o) => <OfferStatusBadge isActive={o.isActive} expiresAt={o.expiresAt} />
        },
        {
          key: "actions",
          header: "",
          render: (o) => (
            <HStack gap={2} justify="end">
              <Button
                size="sm"
                variant="ghost"
                color="blue.600"
                _hover={{ textDecoration: "underline" }}
                onClick={() => onToggle(o.id, !o.isActive)}
              >
                {o.isActive ? "Disable" : "Enable"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="red.600"
                _hover={{ textDecoration: "underline" }}
                onClick={() => onDelete(o.id)}
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
