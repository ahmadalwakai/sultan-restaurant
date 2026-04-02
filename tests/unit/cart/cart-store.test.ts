import { describe, it, expect, beforeEach } from "vitest";

type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
};

const createCart = (): CartState => {
  const state: { items: CartItem[] } = { items: [] };

  return {
    get items() {
      return state.items;
    },
    addItem: (item) => {
      const existing = state.items.find((i) => i.menuItemId === item.menuItemId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (menuItemId) => {
      state.items = state.items.filter((i) => i.menuItemId !== menuItemId);
    },
    updateQuantity: (menuItemId, quantity) => {
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.menuItemId !== menuItemId);
        return;
      }
      const item = state.items.find((i) => i.menuItemId === menuItemId);
      if (item) item.quantity = quantity;
    },
    clearCart: () => {
      state.items = [];
    },
    getTotal: () =>
      state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    getItemCount: () => state.items.reduce((sum, i) => sum + i.quantity, 0),
  };
};

describe("Cart Store", () => {
  let cart: CartState;

  beforeEach(() => {
    cart = createCart();
  });

  it("should start with empty cart", () => {
    expect(cart.items).toHaveLength(0);
    expect(cart.getTotal()).toBe(0);
    expect(cart.getItemCount()).toBe(0);
  });

  describe("addItem", () => {
    it("should add new item with quantity 1", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(1);
    });

    it("should increment quantity for existing item", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
    });

    it("should add multiple different items", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      cart.addItem({ menuItemId: "menu-2", name: "Naan", price: 2.95 });
      expect(cart.items).toHaveLength(2);
    });
  });

  describe("removeItem", () => {
    it("should remove item by menuItemId", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      cart.removeItem("menu-1");
      expect(cart.items).toHaveLength(0);
    });

    it("should not affect other items", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      cart.addItem({ menuItemId: "menu-2", name: "Naan", price: 2.95 });
      cart.removeItem("menu-1");
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].menuItemId).toBe("menu-2");
    });
  });

  describe("updateQuantity", () => {
    it("should update quantity", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      cart.updateQuantity("menu-1", 5);
      expect(cart.items[0].quantity).toBe(5);
    });

    it("should remove item when quantity is 0 or less", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      cart.updateQuantity("menu-1", 0);
      expect(cart.items).toHaveLength(0);
    });
  });

  describe("clearCart", () => {
    it("should remove all items", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 12.95 });
      cart.addItem({ menuItemId: "menu-2", name: "Naan", price: 2.95 });
      cart.clearCart();
      expect(cart.items).toHaveLength(0);
    });
  });

  describe("getTotal", () => {
    it("should calculate total correctly", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 10 });
      cart.addItem({ menuItemId: "menu-2", name: "Naan", price: 3 });
      cart.updateQuantity("menu-1", 2);
      expect(cart.getTotal()).toBe(23); // 10*2 + 3*1
    });
  });

  describe("getItemCount", () => {
    it("should count total quantities", () => {
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 10 });
      cart.addItem({ menuItemId: "menu-1", name: "Tikka", price: 10 });
      cart.addItem({ menuItemId: "menu-2", name: "Naan", price: 3 });
      expect(cart.getItemCount()).toBe(3); // 2 + 1
    });
  });
});
