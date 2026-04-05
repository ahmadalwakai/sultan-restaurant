"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/shared/AdminTable";
import { CouponStatusBadge } from "./CouponStatusBadge";
import { Flex, Box, Button } from "@chakra-ui/react";

interface Coupon { id: string; code: string; discountType: string; discountValue: number; isActive: boolean; maxUses?: number | null; usedCount: number; expiresAt?: string | null }

export function CouponsTable({ coupons, isLoading, onToggle, onDelete }: { coupons: Coupon[]; isLoading?: boolean; onToggle: (id: string, active: boolean) => void; onDelete: (id: string) => void }) {
  return (
    <AdminTable
      data={coupons}
      keyExtractor={(c) => c.id}
      isLoading={isLoading}
      columns={[
        { key: "code", header: "Code", render: (c) => <Link href={`/admin/coupons/${c.id}/edit`}><Box fontFamily="mono" fontWeight="medium" color="amber.600" _hover={{ textDecoration: "underline" }}>{c.code}</Box></Link> },
        { key: "discount", header: "Discount", render: (c) => c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `£${Number(c.discountValue).toFixed(2)}` },
        { key: "usage", header: "Used", render: (c) => `${c.usedCount}${c.maxUses ? ` / ${c.maxUses}` : ""}` },
        { key: "status", header: "Status", render: (c) => <CouponStatusBadge isActive={c.isActive} expiresAt={c.expiresAt} /> },
        { key: "actions", header: "", render: (c) => (
          <Flex gap={2} justify="flex-end">
            <Button size="xs" variant="ghost" color="blue.600" onClick={() => onToggle(c.id, !c.isActive)}>{c.isActive ? "Disable" : "Enable"}</Button>
            <Button size="xs" variant="ghost" color="red.600" onClick={() => onDelete(c.id)}>Delete</Button>
          </Flex>
        )},
      ]}
    />
  );
}
