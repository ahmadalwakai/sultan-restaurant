"use client";
import { useSession as useNextAuthSession } from "next-auth/react";

export function useSession() {
  const sessionResult = useNextAuthSession();
  const { data: session, status } = sessionResult || { data: null, status: "loading" };
  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
