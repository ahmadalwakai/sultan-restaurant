"use client";

import { HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

interface CouponInputProps {
  onApply: (code: string) => Promise<void>;
  isLoading?: boolean;
}

export default function CouponInput({ onApply, isLoading }: CouponInputProps) {
  const [code, setCode] = useState("");

  return (
    <HStack>
      <Input size="sm" placeholder="Enter coupon code" value={code} onChange={(e) => setCode(e.target.value)} />
      <Button size="sm" variant="outline" onClick={() => onApply(code)} loading={isLoading} disabled={!code.trim()}>Apply</Button>
    </HStack>
  );
}
