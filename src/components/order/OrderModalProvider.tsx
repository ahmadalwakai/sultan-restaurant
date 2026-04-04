"use client";

import { OrderMethodModal } from "./OrderMethodModal";
import { useOrderModal } from "@/hooks/useOrderModal";

export function OrderModalProvider() {
  const { isOpen, close } = useOrderModal();
  return <OrderMethodModal isOpen={isOpen} onClose={close} />;
}
