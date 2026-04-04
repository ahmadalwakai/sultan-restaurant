"use client";

import { create } from "zustand";

interface OrderModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useOrderModal = create<OrderModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
