"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Spinner } from "@chakra-ui/react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <Box display="flex" minH="screen" alignItems="center" justifyContent="center">
      <Spinner size="lg" color="orange.500" />
    </Box>
  );
}
