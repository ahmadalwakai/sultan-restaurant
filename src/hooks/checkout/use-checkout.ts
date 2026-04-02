"use client";
import { useState } from "react";

export type CheckoutStep = "cart" | "details" | "payment" | "confirmation";

export function useCheckout() {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");

  const nextStep = () => {
    const steps: CheckoutStep[] = ["cart", "details", "payment", "confirmation"];
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const prevStep = () => {
    const steps: CheckoutStep[] = ["cart", "details", "payment", "confirmation"];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const reset = () => setStep("cart");

  return { step, setStep, orderType, setOrderType, nextStep, prevStep, reset };
}
