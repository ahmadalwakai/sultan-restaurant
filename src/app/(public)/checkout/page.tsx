"use client";

import { useState, useCallback, useRef } from "react";
import { useCartStore } from "@/lib/cart";
import { useValidateCart } from "@/hooks/checkout";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { formatCurrency } from "@/lib/utils/format-currency";
import { DeliveryPartnersSection } from "@/components/home/DeliveryPartnersSection";
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
  HStack,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineShoppingBag, HiOutlineTruck, HiArrowLeft, HiClock, HiMapPin } from "react-icons/hi2";

type OrderMode = "select" | "pickup" | "delivery";

export default function CheckoutPage() {
  const [mode, setMode] = useState<OrderMode>("select");
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const tableContext = useCartStore((s) => s.tableContext);
  const { isEmpty, isBelowMinimum, minOrderAmount } = useValidateCart();
  const { checkout: cashCheckout, isLoading: cashLoading, isSuccess: cashSuccess, order: cashOrder } = useCashCheckout();
  const [stripeLoading, setStripeLoading] = useState(false);
  const router = useRouter();
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (cashSuccess && cashOrder) {
      router.push(`/checkout/success?orderId=${cashOrder.id}`);
    }
  }, [cashSuccess, cashOrder, router]);

  // Auto-select pickup if ordering from table
  useEffect(() => {
    if (tableContext) {
      setMode("pickup");
    }
  }, [tableContext]);

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

  const orderType = tableContext ? "TABLE" as const : "PICKUP" as const;
  const isTableOrder = !!tableContext;

  const handleSubmit = useCallback(async (data: CheckoutFormValues) => {
    // Prevent double submission
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

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
      ...(tableContext && {
        tableNumber: tableContext.tableNumber,
        menuType: tableContext.menuType,
        orderSource: "TABLE_SCAN" as const,
      }),
    };

    try {
      if (data.paymentMethod === "CASH") {
        cashCheckout(orderData);
      } else {
        setStripeLoading(true);
        
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const orderJson = await orderRes.json();
        if (!orderJson.success) throw new Error(orderJson.error);
        
        const stripeRes = await fetch("/api/checkout/stripe/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderJson.data.id }),
        });
        const stripeJson = await stripeRes.json();
        if (!stripeJson.success) throw new Error(stripeJson.error);
        
        clearCart();
        window.location.href = stripeJson.data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setStripeLoading(false);
      isSubmittingRef.current = false;
      alert(err instanceof Error ? err.message : "Payment failed. Please try again.");
    }
  }, [orderType, isTableOrder, items, tableContext, cashCheckout, clearCart]);

  const isLoading = cashLoading || stripeLoading;

  // Order Type Selection Screen
  if (mode === "select") {
    return (
      <Box minH="100vh" bg="gray.50" py={{ base: 8, md: 12 }}>
        <Container maxW="4xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack gap={8} align="stretch">
            <SectionHeader 
              title="How would you like to order?" 
              subtitle="Pick your preferred option" 
            />
            
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              {/* Pickup Option */}
              <Card.Root
                as="button"
                onClick={() => setMode("pickup")}
                cursor="pointer"
                transition="all 0.2s"
                border="2px solid"
                borderColor="transparent"
                _hover={{ 
                  borderColor: "amber.500",
                  transform: "translateY(-4px)",
                  shadow: "xl"
                }}
                overflow="hidden"
              >
                <Card.Body p={8}>
                  <VStack gap={4} align="center">
                    <Flex
                      w={16}
                      h={16}
                      bg="amber.100"
                      borderRadius="full"
                      align="center"
                      justify="center"
                    >
                      <Icon as={HiOutlineShoppingBag} boxSize={8} color="amber.600" />
                    </Flex>
                    <Heading size="lg" fontFamily="heading">Pickup</Heading>
                    <Text color="gray.600" textAlign="center">
                      Order online & collect from our restaurant
                    </Text>
                    <HStack gap={2} color="amber.600" fontSize="sm" fontWeight="medium">
                      <Icon as={HiClock} />
                      <Text>Ready in ~30 min</Text>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Delivery Option */}
              <Card.Root
                as="button"
                onClick={() => setMode("delivery")}
                cursor="pointer"
                transition="all 0.2s"
                border="2px solid"
                borderColor="transparent"
                _hover={{ 
                  borderColor: "amber.500",
                  transform: "translateY(-4px)",
                  shadow: "xl"
                }}
                overflow="hidden"
              >
                <Card.Body p={8}>
                  <VStack gap={4} align="center">
                    <Flex
                      w={16}
                      h={16}
                      bg="green.100"
                      borderRadius="full"
                      align="center"
                      justify="center"
                    >
                      <Icon as={HiOutlineTruck} boxSize={8} color="green.600" />
                    </Flex>
                    <Heading size="lg" fontFamily="heading">Delivery</Heading>
                    <Text color="gray.600" textAlign="center">
                      Get it delivered to your door via our partners
                    </Text>
                    <HStack gap={2} color="green.600" fontSize="sm" fontWeight="medium">
                      <Icon as={HiMapPin} />
                      <Text>Uber Eats, Deliveroo, Just Eat</Text>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </SimpleGrid>

            {/* Cart Summary */}
            <Card.Root shadow="md">
              <Card.Body p={6}>
                <Heading size="md" mb={4} fontFamily="heading">Your Cart</Heading>
                <VStack gap={3} align="stretch" maxH="300px" overflowY="auto">
                  {items.map((item) => (
                    <CartItemRow key={item.menuItemId} item={item} />
                  ))}
                </VStack>
                <Box mt={4} borderTopWidth="1px" pt={4}>
                  <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                    <Text>Total</Text>
                    <Text color="amber.600">{formatCurrency(getTotal())}</Text>
                  </Flex>
                </Box>
              </Card.Body>
            </Card.Root>
          </VStack>
        </Container>
      </Box>
    );
  }

  // Delivery Screen
  if (mode === "delivery") {
    return (
      <Box minH="100vh" bg="gray.50">
        <Box py={{ base: 8, md: 12 }}>
          <Container maxW="4xl" px={{ base: 4, md: 6, lg: 8 }}>
            <VStack gap={8} align="stretch">
              <Button
                variant="ghost"
                alignSelf="flex-start"
                onClick={() => setMode("select")}
                color="gray.600"
                _hover={{ color: "amber.600" }}
              >
                <HStack gap={2}>
                  <Icon as={HiArrowLeft} />
                  <Text>Back to options</Text>
                </HStack>
              </Button>
              
              <SectionHeader 
                title="Order for Delivery" 
                subtitle="Choose your preferred delivery partner" 
              />

              <Card.Root bg="amber.50" borderColor="amber.200" borderWidth={1}>
                <Card.Body p={6}>
                  <HStack gap={3}>
                    <Icon as={HiOutlineTruck} boxSize={6} color="amber.600" />
                    <Text color="amber.800">
                      Your cart items will be available on our delivery partners&apos; apps. 
                      Simply search for &quot;Sultan Restaurant&quot; to place your order.
                    </Text>
                  </HStack>
                </Card.Body>
              </Card.Root>
            </VStack>
          </Container>
        </Box>
        <DeliveryPartnersSection />
      </Box>
    );
  }

  // Pickup Form Screen
  return (
    <Box minH="100vh" bg="gray.50" py={{ base: 8, md: 12 }}>
      <Container maxW="6xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8} align="stretch">
          {!isTableOrder && (
            <Button
              variant="ghost"
              alignSelf="flex-start"
              onClick={() => setMode("select")}
              color="gray.600"
              _hover={{ color: "amber.600" }}
            >
              <HStack gap={2}>
                <Icon as={HiArrowLeft} />
                <Text>Back to options</Text>
              </HStack>
            </Button>
          )}

          <SectionHeader 
            title={isTableOrder ? `Table ${tableContext.tableNumber} Order` : "Pickup Order"} 
            subtitle={isTableOrder ? `${tableContext.menuType === "SHISHA" ? "Shisha Lounge" : "Restaurant"} - Order from your table` : "Complete your details below"} 
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
