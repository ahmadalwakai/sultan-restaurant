"use client";

import { Button } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface CheckoutSubmitButtonProps {
  total: number;
  isLoading?: boolean;
  disabled?: boolean;
  paymentMethod: "CARD" | "CASH";
}

export default function CheckoutSubmitButton({ total, isLoading, disabled, paymentMethod }: CheckoutSubmitButtonProps) {
  return (
    <Button
      w="full"
      size="lg"
      colorPalette="brand"
      loading={isLoading}
      disabled={disabled}
      type="submit"
    >
      {paymentMethod === "CARD" ? `Pay ${formatCurrency(total)}` : `Place Order · ${formatCurrency(total)}`}
    </Button>
  );
}
