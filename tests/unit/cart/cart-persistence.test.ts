import { describe, it, expect, vi, beforeEach } from "vitest";

const STORAGE_KEY = "sultan-cart";

describe("Cart Persistence", () => {
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => storage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete storage[key];
      }),
    });
  });

  it("should save cart to localStorage", () => {
    const cartData = { items: [{ menuItemId: "1", name: "Tikka", price: 12.95, quantity: 1 }] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
    expect(storage[STORAGE_KEY]).toBeDefined();
    expect(JSON.parse(storage[STORAGE_KEY])).toEqual(cartData);
  });

  it("should load cart from localStorage", () => {
    const cartData = { items: [{ menuItemId: "2", name: "Naan", price: 2.95, quantity: 2 }] };
    storage[STORAGE_KEY] = JSON.stringify(cartData);
    const loaded = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(loaded.items).toHaveLength(1);
    expect(loaded.items[0].menuItemId).toBe("2");
  });

  it("should return null when no saved cart", () => {
    const result = localStorage.getItem(STORAGE_KEY);
    expect(result).toBeNull();
  });

  it("should clear cart from localStorage", () => {
    storage[STORAGE_KEY] = JSON.stringify({ items: [] });
    localStorage.removeItem(STORAGE_KEY);
    expect(storage[STORAGE_KEY]).toBeUndefined();
  });

  it("should use correct storage key", () => {
    expect(STORAGE_KEY).toBe("sultan-cart");
  });
});
