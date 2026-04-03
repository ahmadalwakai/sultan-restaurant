"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";

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
      <Flex align="center" justify="center" minH="100vh">
        <Box className="animate-spin" h={8} w={8} borderWidth="4px" borderColor="amber.500" borderTopColor="transparent" rounded="full" />
      </Flex>
    );
  }

  return isAuthed ? <>{children}</> : null;
}
