"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { LoadingSpinner } from "@/components/ui/feedback";

export default function AuthGuardClient({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
