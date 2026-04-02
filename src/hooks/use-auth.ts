"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "./use-session";

export function useAuth() {
  const { session, user, isAuthenticated, isLoading } = useSession();

  const loginWithGoogle = () => signIn("google", { callbackUrl: "/" });

  const logout = () => signOut({ callbackUrl: "/" });

  return { session, user, isAuthenticated, isLoading, loginWithGoogle, logout };
}
