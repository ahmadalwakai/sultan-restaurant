// Cart persistence is handled by zustand/persist middleware
// This file provides additional utilities for server-side cart operations

export function getCartFromCookie(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("sultan-cart");
    return stored;
  } catch {
    return null;
  }
}
