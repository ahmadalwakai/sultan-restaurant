"use client";

interface CustomerDetailProps {
  customer: {
    name: string;
    email: string;
    phone?: string | null;
    createdAt: string;
    _count?: { orders: number; bookings: number };
  };
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-xl font-bold text-amber-700">
          {customer.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-lg">{customer.name}</h2>
          <p className="text-sm text-gray-500">{customer.email}</p>
          {customer.phone && <p className="text-sm text-gray-400">{customer.phone}</p>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div><p className="text-xs text-gray-400">Joined</p><p className="font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p></div>
        <div><p className="text-xs text-gray-400">Total Orders</p><p className="font-medium">{customer._count?.orders ?? 0}</p></div>
        <div><p className="text-xs text-gray-400">Total Bookings</p><p className="font-medium">{customer._count?.bookings ?? 0}</p></div>
      </div>
    </div>
  );
}
