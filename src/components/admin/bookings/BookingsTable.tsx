"use client";

import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Booking { id: string; name: string; date: string; time: string; guests: number; status: string }

export function BookingsTable({ bookings, isLoading }: { bookings: Booking[]; isLoading?: boolean }) {
  return (
    <AdminTable
      data={bookings}
      keyExtractor={(b) => b.id}
      isLoading={isLoading}
      columns={[
        { key: "name", header: "Name", render: (b) => <Text as="span" fontWeight="medium">{b.name}</Text> },
        { key: "date", header: "Date", render: (b) => new Date(b.date).toLocaleDateString() },
        { key: "time", header: "Time", render: (b) => b.time },
        { key: "guests", header: "Guests", render: (b) => b.guests },
        { key: "status", header: "Status", render: (b) => <Box as="span" fontSize="xs" px={2} py={1} rounded="md" bg={b.status === "CONFIRMED" ? "green.100" : b.status === "CANCELLED" ? "red.100" : "yellow.100"} color={b.status === "CONFIRMED" ? "green.700" : b.status === "CANCELLED" ? "red.700" : "yellow.700"}>{b.status}</Box> },
        { key: "actions", header: "", render: (b) => <Link href={`/admin/bookings/${b.id}`}><Text fontSize="sm" color="amber.600" _hover={{ textDecoration: "underline" }}>View</Text></Link> },
      ]}
    />
  );
}
