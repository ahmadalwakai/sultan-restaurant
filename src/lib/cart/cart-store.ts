import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState, TableContext } from "./cart-types";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      tableContext: null,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.menuItemId === item.menuItemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === item.menuItemId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (menuItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.menuItemId !== menuItemId),
        })),

      updateQuantity: (menuItemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.menuItemId !== menuItemId) };
          }
          return {
            items: state.items.map((i) =>
              i.menuItemId === menuItemId ? { ...i, quantity } : i
            ),
          };
        }),

      clearCart: () => set({ items: [], tableContext: null }),

      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      setTableContext: (context: TableContext) => set({ tableContext: context }),

      clearTableContext: () => set({ tableContext: null }),
    }),
    { name: "sultan-cart" }
  )
);
