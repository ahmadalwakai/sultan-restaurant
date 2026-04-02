"use client";

import { useCartStore } from "@/lib/cart";
import { useValidateCart } from "@/hooks/checkout";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";
import type { CheckoutFormValues } from "@/lib/validators";
import { useCashCheckout } from "@/hooks/checkout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PickupPage() {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const { isEmpty, isBelowMinimum, minOrderAmount } = useValidateCart();
  const { checkout, isLoading, isSuccess, order } = useCashCheckout();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && order) {
      router.push(`/checkout/success?orderId=${order.id}`);
    }
  }, [isSuccess, order, router]);

  if (isEmpty) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <span className="text-6xl">🛒</span>
        <h2 className="mt-4 font-heading text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Add some items from our menu first!</p>
        <Link
          href="/menu"
          className="mt-6 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const handleSubmit = (data: CheckoutFormValues) => {
    checkout({
      type: "PICKUP",
      paymentMethod: "CASH",
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      pickupTime: data.pickupTime,
      specialRequests: data.specialRequests,
      items: items.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title="Checkout" subtitle="Review your order and complete" />
        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 font-heading text-lg font-bold">Your Details</h3>
              <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 font-heading text-lg font-bold">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemRow key={item.menuItemId} item={item} />
                ))}
              </div>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">{formatCurrency(getTotal() / 100)}</span>
                </div>
                {isBelowMinimum && (
                  <p className="mt-2 text-sm text-red-500">
                    Minimum order: £{minOrderAmount}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
