"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminLoadingState } from "@/components/admin/shared";
import { VStack, HStack, Heading, Text, Card, Box, Button, SimpleGrid, NativeSelect, Flex } from "@chakra-ui/react";

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);

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

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack align="stretch" gap={6}>
          <HStack justify="space-between" align="center">
            <Box>
              <Link href="/admin/orders" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>&larr; Back to Orders</Link>
              <Heading size="xl" color="gray.900" mt={1}>Order #{order.orderNumber as string}</Heading>
            </Box>
            <Button size="sm" colorPalette="red" variant="outline" onClick={handleRefund}>Refund</Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
            <Card.Root shadow="sm" borderRadius="xl">
              <Card.Body p={6}>
                <Heading size="md" mb={4}>Items</Heading>
                <VStack gap={3} align="stretch">
                  {(order.items as Array<{ id: string; menuItem: { name: string }; quantity: number; price: number }>)?.map((item) => (
                    <Flex key={item.id} justify="space-between" fontSize="sm">
                      <Text>{item.menuItem.name} x{item.quantity}</Text>
                      <Text>£{(Number(item.price) * item.quantity / 100).toFixed(2)}</Text>
                    </Flex>
                  ))}
                  <Flex justify="space-between" fontWeight="semibold" pt={3} borderTopWidth="1px" borderColor="gray.200">
                    <Text>Total</Text>
                    <Text>£{(Number(order.total) / 100).toFixed(2)}</Text>
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
                      value={order.status as string}
                      onChange={(e) => updateStatus(e.target.value)}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Card.Body>
              </Card.Root>
              <Card.Root shadow="sm" borderRadius="xl">
                <Card.Body p={6}>
                  <Heading size="md" mb={3}>Customer</Heading>
                  <Text fontSize="sm">{order.customerName as string}</Text>
                  <Text fontSize="sm" color="gray.500">{order.customerPhone as string}</Text>
                </Card.Body>
              </Card.Root>
            </VStack>
          </SimpleGrid>
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
