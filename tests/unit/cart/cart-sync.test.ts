import { describe, it, expect } from "vitest";

type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

const mergeCartItems = (local: CartItem[], remote: CartItem[]): CartItem[] => {
  const merged = new Map<string, CartItem>();

  for (const item of local) {
    merged.set(item.menuItemId, { ...item });
  }

  for (const item of remote) {
    const existing = merged.get(item.menuItemId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      merged.set(item.menuItemId, { ...item });
    }
  }

  return Array.from(merged.values());
};

describe("Cart Sync (mergeCartItems)", () => {
  it("should merge non-overlapping items", () => {
    const local: CartItem[] = [
      { menuItemId: "1", name: "Tikka", price: 12.95, quantity: 1 },
    ];
    const remote: CartItem[] = [
      { menuItemId: "2", name: "Naan", price: 2.95, quantity: 2 },
    ];
    const result = mergeCartItems(local, remote);
    expect(result).toHaveLength(2);
  });

  it("should add quantities for overlapping items", () => {
    const local: CartItem[] = [
      { menuItemId: "1", name: "Tikka", price: 12.95, quantity: 1 },
    ];
    const remote: CartItem[] = [
      { menuItemId: "1", name: "Tikka", price: 12.95, quantity: 2 },
    ];
    const result = mergeCartItems(local, remote);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(3);
  });

  it("should handle empty local cart", () => {
    const remote: CartItem[] = [
      { menuItemId: "1", name: "Tikka", price: 12.95, quantity: 1 },
    ];
    const result = mergeCartItems([], remote);
    expect(result).toHaveLength(1);
  });

  it("should handle empty remote cart", () => {
    const local: CartItem[] = [
      { menuItemId: "1", name: "Tikka", price: 12.95, quantity: 1 },
    ];
    const result = mergeCartItems(local, []);
    expect(result).toHaveLength(1);
  });

  it("should handle both empty", () => {
    const result = mergeCartItems([], []);
    expect(result).toHaveLength(0);
  });

  it("should preserve local item prices", () => {
    const local: CartItem[] = [
      { menuItemId: "1", name: "Tikka", price: 12.95, quantity: 1 },
    ];
    const remote: CartItem[] = [
      { menuItemId: "1", name: "Tikka", price: 13.95, quantity: 1 },
    ];
    const result = mergeCartItems(local, remote);
    expect(result[0].price).toBe(12.95); // local price preserved
  });
});
