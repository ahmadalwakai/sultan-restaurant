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
import { useEffect } from "react";
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
  const tableContext = useCartStore((s) => s.tableContext);
  const { isEmpty, isBelowMinimum, minOrderAmount } = useValidateCart();
  const { checkout, isLoading, isSuccess, order } = useCashCheckout();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && order) {
      router.push(`/checkout/success?orderId=${order.id}`);
    }
  }, [isSuccess, order, router]);

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
  const orderType = tableContext ? "TABLE" : "PICKUP";
  const isTableOrder = !!tableContext;

  const handleSubmit = (data: CheckoutFormValues) => {
    checkout({
      type: orderType,
      paymentMethod: "CASH",
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      pickupTime: isTableOrder ? undefined : data.pickupTime,
      specialRequests: data.specialRequests,
      items: items.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
      })),
      // Include table context if ordering from a table
      ...(tableContext && {
        tableNumber: tableContext.tableNumber,
        menuType: tableContext.menuType,
        orderSource: "TABLE_SCAN" as const,
      }),
    });
  };

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
                        {formatCurrency(getTotal() / 100)}
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
