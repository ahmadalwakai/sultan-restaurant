// Cart sync utilities for server/client reconciliation
export function mergeCartItems<T extends { menuItemId: string; quantity: number }>(
  local: T[],
  remote: T[]
): T[] {
  const merged = new Map<string, T>();
  for (const item of remote) merged.set(item.menuItemId, item);
  for (const item of local) {
    const existing = merged.get(item.menuItemId);
    if (existing) {
      merged.set(item.menuItemId, { ...existing, quantity: existing.quantity + item.quantity });
    } else {
      merged.set(item.menuItemId, item);
    }
  }
  return Array.from(merged.values());
}
