"use client";

import { useState } from "react";
import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";

export function EmailTestSender() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Test Email from Sultan");
  const [body, setBody] = useState("This is a test email sent from the Sultan admin panel.");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/email/test", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, subject, body }) });
      const data = await res.json();
      setResult({ success: res.ok, message: res.ok ? "Test email sent successfully!" : data.error ?? "Failed to send" });
    } catch {
      setResult({ success: false, message: "Network error" });
    }
    setSending(false);
  };

  return (
    <form onSubmit={handleSend}>
    <VStack gap={4} maxW="xl" align="stretch">
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>To</Text><Input type="email" value={to} onChange={(e) => setTo(e.target.value)} required /></Box>
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Subject</Text><Input value={subject} onChange={(e) => setSubject(e.target.value)} required /></Box>
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Body</Text><Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} /></Box>
      {result && <Box p={3} rounded="md" fontSize="sm" bg={result.success ? "green.50" : "red.50"} color={result.success ? "green.700" : "red.700"}>{result.message}</Box>}
      <Button type="submit" disabled={sending} bg="amber.600" color="white" _hover={{ bg: "amber.700" }} alignSelf="flex-start">{sending ? "Sending..." : "Send Test Email"}</Button>
    </VStack>
    </form>
  );
}
