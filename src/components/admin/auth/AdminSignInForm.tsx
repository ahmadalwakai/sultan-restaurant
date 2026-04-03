"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

export function AdminSignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid credentials");
        return;
      }
      // Full page load ensures middleware reads the fresh session cookie
      window.location.href = "/admin/dashboard";
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <VStack gap={4} w="full" maxW="sm">
      {error && (
        <Box p={3} fontSize="sm" color="red.700" bg="red.50" rounded="lg" w="full">{error}</Box>
      )}
      <Box w="full">
        <Text as="label" display="block" fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Email</Text>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Box>
      <Box w="full">
        <Text as="label" display="block" fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Password</Text>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Box>
      <Button
        type="submit"
        disabled={loading}
        w="full"
        bg="amber.600"
        color="white"
        _hover={{ bg: "amber.700" }}
        fontWeight="medium"
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </VStack>
    </form>
  );
}
