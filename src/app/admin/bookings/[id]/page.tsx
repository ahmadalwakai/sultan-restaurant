"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminLoadingState } from "@/components/admin/shared";
import { VStack, Heading, Text, Card, SimpleGrid, Box } from "@chakra-ui/react";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const [booking, setBooking] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/bookings/${params.id}`).then((r) => r.json()).then((d) => setBooking(d.data));
  }, [params.id]);

  if (!booking) return <AdminShell><AdminPageShell><AdminLoadingState rows={4} height="2.5rem" /></AdminPageShell></AdminShell>;

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack align="stretch" gap={4}>
          <Link href="/admin/bookings" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>&larr; Back to Bookings</Link>
          <Heading size="xl" color="gray.900" mb={2}>Booking Details</Heading>
          <Card.Root shadow="sm" borderRadius="xl" maxW="42rem">
            <Card.Body p={6}>
              <SimpleGrid columns={2} gap={4} mb={4}>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={0.5}>Name</Text>
                  <Text fontWeight="medium" fontSize="sm">{booking.name as string}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={0.5}>Email</Text>
                  <Text fontWeight="medium" fontSize="sm">{booking.email as string}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={0.5}>Date</Text>
                  <Text fontWeight="medium" fontSize="sm">{new Date(booking.date as string).toLocaleDateString()}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={0.5}>Time</Text>
                  <Text fontWeight="medium" fontSize="sm">{booking.time as string}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={0.5}>Guests</Text>
                  <Text fontWeight="medium" fontSize="sm">{booking.guests as number}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={0.5}>Status</Text>
                  <Text fontWeight="medium" fontSize="sm">{booking.status as string}</Text>
                </Box>
              </SimpleGrid>
              {Boolean(booking.notes) && (
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={0.5}>Notes</Text>
                  <Text fontSize="sm">{String(booking.notes)}</Text>
                </Box>
              )}
            </Card.Body>
          </Card.Root>
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
