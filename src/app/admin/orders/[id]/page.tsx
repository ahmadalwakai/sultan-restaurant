"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminLoadingState } from "@/components/admin/shared";
import { VStack, HStack, Heading, Text, Card, Box, Button, SimpleGrid, NativeSelect, Flex, Badge } from "@chakra-ui/react";

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

interface OrderItem {
  id: string;
  menuItem?: { name: string } | null;
  shishaMenuItem?: { name: string } | null;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string;
  customerPhone: string;
  tableNumber?: number | null;
  menuType?: string | null;
  orderSource?: string | null;
  items: OrderItem[];
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`/api/admin/orders/${params.id}`).then((r) => r.json()).then((d) => setOrder(d.data));
  }, [params.id]);

  async function updateStatus(status: string) {
    await fetch(`/api/admin/orders/${params.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrder((prev) => prev ? { ...prev, status } : prev);
  }

  async function handleRefund() {
    if (!confirm("Are you sure you want to refund this order?")) return;
    await fetch(`/api/admin/orders/${params.id}/refund`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
    router.refresh();
  }

  if (!order) return <AdminShell><AdminPageShell><AdminLoadingState rows={5} height="3rem" /></AdminPageShell></AdminShell>;

  const isTableOrder = order.tableNumber && order.orderSource === "TABLE_SCAN";

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack align="stretch" gap={6}>
          <HStack justify="space-between" align="center">
            <Box>
              <Link href="/admin/orders" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>&larr; Back to Orders</Link>
              <HStack gap={3} mt={1}>
                <Heading size="xl" color="gray.900">Order #{order.orderNumber}</Heading>
                {isTableOrder && (
                  <Badge colorPalette={order.menuType === "SHISHA" ? "purple" : "orange"} size="lg">
                    Table {order.tableNumber} • {order.menuType === "SHISHA" ? "Shisha" : "Restaurant"}
                  </Badge>
                )}
              </HStack>
            </Box>
            <Button size="sm" colorPalette="red" variant="outline" onClick={handleRefund}>Refund</Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
            <Card.Root shadow="sm" borderRadius="xl">
              <Card.Body p={6}>
                <Heading size="md" mb={4}>Items</Heading>
                <VStack gap={3} align="stretch">
                  {order.items?.map((item) => {
                    const itemName = item.menuItem?.name || item.shishaMenuItem?.name || "Unknown Item";
                    const isShishaItem = !!item.shishaMenuItem;
                    return (
                      <Flex key={item.id} justify="space-between" fontSize="sm" align="center">
                        <HStack gap={2}>
                          <Text>{itemName} x{item.quantity}</Text>
                          {isShishaItem && (
                            <Badge colorPalette="purple" size="sm">Shisha</Badge>
                          )}
                        </HStack>
                        <Text>£{(Number(item.price) * item.quantity).toFixed(2)}</Text>
                      </Flex>
                    );
                  })}
                  <Flex justify="space-between" fontWeight="semibold" pt={3} borderTopWidth="1px" borderColor="gray.200">
                    <Text>Total</Text>
                    <Text>£{Number(order.total).toFixed(2)}</Text>
                  </Flex>
                </VStack>
              </Card.Body>
            </Card.Root>

            <VStack gap={4} align="stretch">
              <Card.Root shadow="sm" borderRadius="xl">
                <Card.Body p={6}>
                  <Heading size="md" mb={3}>Status</Heading>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={order.status}
                      onChange={(e) => updateStatus(e.target.value)}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Card.Body>
              </Card.Root>

              {isTableOrder && (
                <Card.Root shadow="sm" borderRadius="xl" bg="orange.50">
                  <Card.Body p={6}>
                    <Heading size="md" mb={3} color="orange.700">Table Order Info</Heading>
                    <VStack gap={2} align="stretch" fontSize="sm">
                      <Flex justify="space-between">
                        <Text color="gray.600">Table Number</Text>
                        <Text fontWeight="semibold">{order.tableNumber}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="gray.600">Menu Type</Text>
                        <Text fontWeight="semibold">{order.menuType === "SHISHA" ? "Shisha Menu" : "Restaurant Menu"}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="gray.600">Order Source</Text>
                        <Text fontWeight="semibold">QR Scan</Text>
                      </Flex>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              )}

              <Card.Root shadow="sm" borderRadius="xl">
                <Card.Body p={6}>
                  <Heading size="md" mb={3}>Customer</Heading>
                  <Text fontSize="sm">{order.customerName}</Text>
                  <Text fontSize="sm" color="gray.500">{order.customerPhone}</Text>
                </Card.Body>
              </Card.Root>
            </VStack>
          </SimpleGrid>
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
