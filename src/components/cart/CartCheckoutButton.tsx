"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format-currency";

interface CartCheckoutButtonProps {
  total: number;
  itemCount: number;
  disabled?: boolean;
}

export default function CartCheckoutButton({ total, itemCount, disabled }: CartCheckoutButtonProps) {
  return (
    <Link href="/checkout">
      <Button
        w="full"
        colorPalette="brand"
        size="lg"
        disabled={disabled || itemCount === 0}
      >
        Checkout ({itemCount} items) · {formatCurrency(total)}
      </Button>
    </Link>
  );
}
