"use client";

interface OrderItem { id: string; menuItem: { name: string }; quantity: number; price: number }

export function OrderItemsList({ items }: { items: OrderItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between text-sm">
          <span>{item.menuItem.name} <span className="text-gray-400">x{item.quantity}</span></span>
          <span>£{(Number(item.price) * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
