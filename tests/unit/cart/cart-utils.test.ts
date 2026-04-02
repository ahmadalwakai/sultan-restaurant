import { describe, it, expect } from "vitest";

type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const calculateDiscount = (
  subtotal: number,
  discount: number,
  type: "PERCENTAGE" | "FIXED",
  maxDiscount?: number
): number => {
  let amount = type === "PERCENTAGE"
    ? (subtotal * discount) / 100
    : discount;

  if (maxDiscount && amount > maxDiscount) {
    amount = maxDiscount;
  }

  return Math.max(0, Math.min(amount, subtotal));
};

describe("Cart Utils", () => {
  describe("calculateCartTotal", () => {
    it("should calculate correct total", () => {
      const items: CartItem[] = [
        { menuItemId: "1", name: "Tikka", price: 12.95, quantity: 2 },
        { menuItemId: "2", name: "Naan", price: 2.95, quantity: 1 },
      ];
      expect(calculateCartTotal(items)).toBeCloseTo(28.85, 2);
    });

    it("should return 0 for empty cart", () => {
      expect(calculateCartTotal([])).toBe(0);
    });

    it("should handle single item", () => {
      const items: CartItem[] = [
        { menuItemId: "1", name: "Biryani", price: 10, quantity: 1 },
      ];
      expect(calculateCartTotal(items)).toBe(10);
    });
  });

  describe("calculateDiscount", () => {
    it("should calculate percentage discount", () => {
      expect(calculateDiscount(100, 10, "PERCENTAGE")).toBeCloseTo(10);
    });

    it("should calculate fixed discount", () => {
      expect(calculateDiscount(100, 5, "FIXED")).toBe(5);
    });

    it("should not exceed subtotal", () => {
      expect(calculateDiscount(10, 20, "FIXED")).toBe(10);
    });

    it("should not be negative", () => {
      expect(calculateDiscount(0, 10, "FIXED")).toBe(0);
    });

    it("should cap at maxDiscount", () => {
      expect(calculateDiscount(200, 50, "PERCENTAGE", 50)).toBe(50);
    });
  });
});
