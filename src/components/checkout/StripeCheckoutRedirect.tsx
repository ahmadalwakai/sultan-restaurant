"use client";

import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/feedback";

interface StripeCheckoutRedirectProps {
  sessionUrl: string;
}

export default function StripeCheckoutRedirect({ sessionUrl }: StripeCheckoutRedirectProps) {
  useEffect(() => {
    if (sessionUrl) {
      window.location.href = sessionUrl;
    }
  }, [sessionUrl]);

  return <LoadingSpinner message="Redirecting to payment..." />;
}
