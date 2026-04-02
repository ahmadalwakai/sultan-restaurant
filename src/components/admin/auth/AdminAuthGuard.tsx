"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/auth/admin/verify");
        if (!res.ok) {
          router.push("/admin/signin");
          return;
        }
        setIsAuthed(true);
      } catch {
        router.push("/admin/signin");
      } finally {
        setLoading(false);
      }
    }
    check();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return isAuthed ? <>{children}</> : null;
}
