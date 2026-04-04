"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Container, Heading, Text, Spinner, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { useCartStore } from "@/lib/cart/cart-store";
import Link from "next/link";

type TableType = "restaurant" | "shisha";

export default function TableScanPage() {
  const params = useParams();
  const router = useRouter();
  const { setTableContext, clearCart } = useCartStore();
  const [status, setStatus] = useState<"validating" | "success" | "error">("validating");
  const [error, setError] = useState<string | null>(null);

  const tableType = params.type as TableType;
  const tableNumber = parseInt(params.number as string, 10);

  useEffect(() => {
    async function validateAndRedirect() {
      // Validate parameters
      if (!["restaurant", "shisha"].includes(tableType)) {
        setError("Invalid table type");
        setStatus("error");
        return;
      }

      if (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 100) {
        setError("Invalid table number");
        setStatus("error");
        return;
      }

      // Validate table exists via API
      try {
        const response = await fetch(`/api/tables/validate?type=${tableType}&number=${tableNumber}`);
        const data = await response.json();

        if (!response.ok || !data.valid) {
          setError(data.error || "Table not found");
          setStatus("error");
          return;
        }

        // Clear existing cart and set table context
        clearCart();
        setTableContext({
          tableNumber,
          menuType: tableType.toUpperCase() as "RESTAURANT" | "SHISHA",
        });

        setStatus("success");

        // Redirect to appropriate menu after brief delay
        setTimeout(() => {
          if (tableType === "shisha") {
            router.push("/shisha/menu");
          } else {
            router.push("/menu");
          }
        }, 1500);
      } catch {
        setError("Failed to validate table");
        setStatus("error");
      }
    }

    validateAndRedirect();
  }, [tableType, tableNumber, router, setTableContext, clearCart]);

  return (
    <Container maxW="container.sm" py={20}>
      <VStack gap={6} textAlign="center">
        {status === "validating" && (
          <>
            <Spinner size="xl" color="orange.500" />
            <Heading size="lg">Setting up your table...</Heading>
            <Text color="fg.muted">
              Table {tableNumber} ({tableType === "shisha" ? "Shisha Lounge" : "Restaurant"})
            </Text>
          </>
        )}

        {status === "success" && (
          <>
            <Box color="green.500" fontSize="6xl">
              <LuCheck />
            </Box>
            <Heading size="lg" color="green.500">
              Welcome to Table {tableNumber}!
            </Heading>
            <Text color="fg.muted">
              {tableType === "shisha" ? "Shisha Lounge" : "Restaurant"} Menu
            </Text>
            <Text color="fg.muted">Redirecting to menu...</Text>
          </>
        )}

        {status === "error" && (
          <>
            <Box color="red.500" fontSize="6xl">
              <LuX />
            </Box>
            <Heading size="lg" color="red.500">
              Invalid Table
            </Heading>
            <Text color="fg.muted">{error}</Text>
            <Box mt={4}>
              <Link href="/menu">
                <ChakraLink
                  color="orange.500"
                  textDecoration="underline"
                  cursor="pointer"
                >
                  Go to main menu instead
                </ChakraLink>
              </Link>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
}
