"use client";

interface OrderDetailProps {
  order: {
    orderNumber: string;
    customerName: string;
    customerPhone?: string;
    total: number;
    status: string;
    paymentStatus: string;
    orderType: string;
    items: Array<{ id: string; menuItem: { name: string }; quantity: number; price: number }>;
  };
}

export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Order Items</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.menuItem.name} x{item.quantity}</span>
              <span>£{(Number(item.price) * item.quantity / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-3 border-t flex justify-between font-semibold">
            <span>Total</span>
            <span>£{(Number(order.total) / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-3">Customer</h2>
        <p className="text-sm">{order.customerName}</p>
        {order.customerPhone && <p className="text-sm text-gray-500">{order.customerPhone}</p>}
        <p className="text-sm text-gray-500 mt-1">Type: {order.orderType}</p>
      </div>
    </div>
  );
}
