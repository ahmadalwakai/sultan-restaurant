"use client";

import { useCartStore } from "@/lib/cart";
import { useValidateCart } from "@/hooks/checkout";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";
import type { CheckoutFormValues } from "@/lib/validators";
import { useCashCheckout } from "@/hooks/checkout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Card,
  Heading,
  Text,
  Flex,
  Button,
  Badge,
} from "@chakra-ui/react";

export default function PickupPage() {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const tableContext = useCartStore((s) => s.tableContext);
  const { isEmpty, isBelowMinimum, minOrderAmount } = useValidateCart();
  const { checkout: cashCheckout, isLoading: cashLoading, isSuccess: cashSuccess, order: cashOrder } = useCashCheckout();
  const [stripeLoading, setStripeLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cashSuccess && cashOrder) {
      router.push(`/checkout/success?orderId=${cashOrder.id}`);
    }
  }, [cashSuccess, cashOrder, router]);

  if (isEmpty) {
    return (
      <Flex
        minH="100vh"
        direction="column"
        align="center"
        justify="center"
        bg="gray.50"
        p={4}
      >
        <Text fontSize="6xl">🛒</Text>
        <Heading size="lg" mt={4} fontFamily="heading">
          Your cart is empty
        </Heading>
        <Text mt={2} color="gray.500">
          Add some items from our menu first!
        </Text>
        <Link href="/menu">
          <Button
            mt={6}
            rounded="lg"
            bg="amber.500"
            px={6}
            py={3}
            fontWeight="semibold"
            color="white"
            _hover={{ bg: "amber.600" }}
          >
            Browse Menu
          </Button>
        </Link>
      </Flex>
    );
  }

  // Determine order type based on table context
  const orderType = tableContext ? "TABLE" as const : "PICKUP" as const;
  const isTableOrder = !!tableContext;

  const handleSubmit = async (data: CheckoutFormValues) => {
    const orderData = {
      type: orderType,
      paymentMethod: data.paymentMethod,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      pickupTime: isTableOrder ? undefined : data.pickupTime,
      specialRequests: data.specialRequests,
      items: items.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
        itemType: item.itemType,
      })),
      // Include table context if ordering from a table
      ...(tableContext && {
        tableNumber: tableContext.tableNumber,
        menuType: tableContext.menuType,
        orderSource: "TABLE_SCAN" as const,
      }),
    };

    if (data.paymentMethod === "CASH") {
      // Cash payment - place order directly
      cashCheckout(orderData);
    } else {
      // Stripe payment - create order then redirect to Stripe
      setStripeLoading(true);
      try {
        // First create the order
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const orderJson = await orderRes.json();
        if (!orderJson.success) throw new Error(orderJson.error);
        
        // Then create Stripe session
        const stripeRes = await fetch("/api/checkout/stripe/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderJson.data.id }),
        });
        const stripeJson = await stripeRes.json();
        if (!stripeJson.success) throw new Error(stripeJson.error);
        
        // Clear cart and redirect to Stripe
        clearCart();
        window.location.href = stripeJson.data.url;
      } catch (err) {
        console.error("Stripe checkout error:", err);
        setStripeLoading(false);
        alert(err instanceof Error ? err.message : "Payment failed. Please try again.");
      }
    }
  };

  const isLoading = cashLoading || stripeLoading;

  return (
    <Box minH="100vh" bg="gray.50" py={{ base: 8, md: 12 }}>
      <Container maxW="6xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8} align="stretch">
          <SectionHeader 
            title={isTableOrder ? `Table ${tableContext.tableNumber} Order` : "Checkout"} 
            subtitle={isTableOrder ? `${tableContext.menuType === "SHISHA" ? "Shisha Lounge" : "Restaurant"} - Order from your table` : "Review your order and complete"} 
          />
          
          {isTableOrder && (
            <Badge colorPalette="green" size="lg" p={2} textAlign="center">
              🪑 Ordering from Table {tableContext.tableNumber} ({tableContext.menuType === "SHISHA" ? "Shisha" : "Restaurant"})
            </Badge>
          )}
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
            <Card.Root shadow="lg">
              <Card.Body p={6}>
                <Heading size="md" mb={4} fontFamily="heading">
                  Your Details
                </Heading>
                <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
              </Card.Body>
            </Card.Root>

            <Box position={{ lg: "sticky" }} top={{ lg: 24 }} alignSelf="start">
              <Card.Root shadow="lg">
                <Card.Body p={6}>
                  <Heading size="md" mb={4} fontFamily="heading">
                    Order Summary
                  </Heading>
                  <VStack gap={3} align="stretch">
                    {items.map((item) => (
                      <CartItemRow key={item.menuItemId} item={item} />
                    ))}
                  </VStack>
                  <Box mt={4} borderTopWidth="1px" pt={4}>
                    <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                      <Text>Total</Text>
                      <Text color="amber.600">
                        {formatCurrency(getTotal())}
                      </Text>
                    </Flex>
                    {isBelowMinimum && (
                      <Text mt={2} fontSize="sm" color="red.500">
                        Minimum order: £{minOrderAmount}
                      </Text>
                    )}
                  </Box>
                </Card.Body>
              </Card.Root>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
