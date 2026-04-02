"use client";

import type { PaymentMethodType } from "@/types/order";

interface PaymentMethodCardProps {
  method: PaymentMethodType;
  selected: boolean;
  onSelect: (method: PaymentMethodType) => void;
}

const methodConfig: Record<PaymentMethodType, { label: string; description: string; icon: string }> = {
  CASH: { label: "Cash", description: "Pay when you collect", icon: "💵" },
  STRIPE: { label: "Card Payment", description: "Secure online payment", icon: "💳" },
};

export function PaymentMethodCard({ method, selected, onSelect }: PaymentMethodCardProps) {
  const config = methodConfig[method];

  return (
    <button
      onClick={() => onSelect(method)}
      className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
        selected
          ? "border-amber-500 bg-amber-50"
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      <span className="text-2xl">{config.icon}</span>
      <div className="flex-1">
        <p className={`font-semibold ${selected ? "text-amber-700" : "text-gray-900"}`}>{config.label}</p>
        <p className="text-sm text-gray-500">{config.description}</p>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 ${
        selected ? "border-amber-500 bg-amber-500" : "border-gray-300"
      }`}>
        {selected && (
          <svg className="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}
