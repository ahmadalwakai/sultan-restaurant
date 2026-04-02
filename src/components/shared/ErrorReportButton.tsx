"use client";

// ─── Error Report Button ────────────────────────────────

import { Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";

type Props = {
  error: Error;
};

export function ErrorReportButton({ error }: Props) {
  const [reported, setReported] = useState(false);

  const handleReport = useCallback(async () => {
    try {
      await fetch("/api/errors/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
      setReported(true);
    } catch {
      // Silently fail — reporting errors shouldn't cause more errors
    }
  }, [error]);

  if (reported) {
    return (
      <Button size="sm" disabled variant="outline">
        Report Sent
      </Button>
    );
  }

  return (
    <Button onClick={handleReport} size="sm" variant="outline" colorScheme="orange">
      Report Issue
    </Button>
  );
}
