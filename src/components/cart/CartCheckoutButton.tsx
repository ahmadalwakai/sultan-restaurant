"use client";

import { Button } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useOrderModal } from "@/hooks/useOrderModal";

interface CartCheckoutButtonProps {
  total: number;
  itemCount: number;
  disabled?: boolean;
}

export default function CartCheckoutButton({ total, itemCount, disabled }: CartCheckoutButtonProps) {
  const { open: openOrderModal } = useOrderModal();

  return (
    <Button
      w="full"
      colorPalette="brand"
      size="lg"
      disabled={disabled || itemCount === 0}
      onClick={openOrderModal}
    >
      Checkout ({itemCount} items) · {formatCurrency(total)}
    </Button>
  );
}
