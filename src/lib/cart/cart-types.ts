export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
};

export type TableContext = {
  tableNumber: number;
  menuType: "RESTAURANT" | "SHISHA";
} | null;

export type CartState = {
  items: CartItem[];
  tableContext: TableContext;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  setTableContext: (context: TableContext) => void;
  clearTableContext: () => void;
};
