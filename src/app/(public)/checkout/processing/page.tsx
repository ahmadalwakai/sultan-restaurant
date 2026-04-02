"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CheckoutProcessingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/checkout/cancel");
      return;
    }
    // Poll or redirect to success once verified
    const timer = setTimeout(() => {
      router.replace(`/checkout/success?session=${sessionId}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [sessionId, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin h-12 w-12 rounded-full border-4 border-amber-500 border-t-transparent" />
      <p className="mt-4 text-lg font-medium text-gray-600">Processing your payment...</p>
      <p className="mt-1 text-sm text-gray-400">Please don&apos;t close this page.</p>
    </div>
  );
}
