"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { VStack, HStack, Text, Box, Button, Badge, Input } from "@chakra-ui/react";
import { LuCalendar, LuClock, LuUsers, LuPhone, LuMail, LuCheck, LuX, LuTrash2, LuWind } from "react-icons/lu";
import toast from "react-hot-toast";
import Link from "next/link";

type ShishaBooking = {
  id: string;
  tableNumber: number;
  tableName: string | null;
  customerName: string;
  email: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  endTime: string;
  guests: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  notes: string | null;
  createdAt: string;
};

export default function AdminShishaBookingsPage() {
  const [bookings, setBookings] = useState<ShishaBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split("T")[0]);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateFilter) params.set("date", dateFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      
      const res = await fetch(`/api/admin/shisha/bookings?${params}`);
      const data = await res.json();
      if (data.success) {
        setBookings(data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load bookings");
    }
    setLoading(false);
  }, [dateFilter, statusFilter]);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 60000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/shisha/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Booking ${status.toLowerCase()}`);
        fetchBookings();
      }
    } catch {
      toast.error("Failed to update booking");
    }
  }

  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/shisha/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booking deleted");
        fetchBookings();
      }
    } catch {
      toast.error("Failed to delete booking");
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "yellow";
      case "CONFIRMED": return "blue";
      case "COMPLETED": return "green";
      case "CANCELLED": return "red";
      case "NO_SHOW": return "gray";
      default: return "gray";
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "PENDING").length,
    confirmed: bookings.filter(b => b.status === "CONFIRMED").length,
    completed: bookings.filter(b => b.status === "COMPLETED").length,
  };

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={6} align="stretch">
          <AdminSectionTitle
            title="Shisha Bookings"
            description="Manage shisha lounge reservations"
          />
          <HStack gap={3}>
            <Link href="/admin/shisha/tables">
              <Button size="sm" variant="outline" colorPalette="purple">
                Manage Tables
              </Button>
            </Link>
            <Link href="/admin/shisha/menu">
              <Button size="sm" variant="outline" colorPalette="purple">
                Manage Menu
              </Button>
            </Link>
          </HStack>
        {/* Filters */}
        <Box
          p={5}
          bg="rgba(139,92,246,0.1)"
          borderRadius="xl"
          border="1px solid rgba(139,92,246,0.2)"
          mb={6}
        >
          <HStack gap={6} flexWrap="wrap">
            <Box>
              <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Date</Text>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                size="sm"
                bg="rgba(0,0,0,0.3)"
                border="1px solid rgba(255,255,255,0.1)"
              />
            </Box>
            <Box>
              <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Status</Text>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "6px 12px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <option value="ALL" style={{ background: "#1A0F0A" }}>All Statuses</option>
                <option value="PENDING" style={{ background: "#1A0F0A" }}>Pending</option>
                <option value="CONFIRMED" style={{ background: "#1A0F0A" }}>Confirmed</option>
                <option value="COMPLETED" style={{ background: "#1A0F0A" }}>Completed</option>
                <option value="CANCELLED" style={{ background: "#1A0F0A" }}>Cancelled</option>
                <option value="NO_SHOW" style={{ background: "#1A0F0A" }}>No Show</option>
              </select>
            </Box>
            <Button
              onClick={fetchBookings}
              size="sm"
              variant="outline"
              colorPalette="purple"
              mt={6}
            >
              Refresh
            </Button>
          </HStack>
        </Box>

        {/* Stats */}
        <HStack gap={4} mb={6} flexWrap="wrap">
          <Box px={4} py={2} bg="rgba(255,255,255,0.05)" borderRadius="lg">
            <Text fontSize="xs" color="whiteAlpha.600">Total</Text>
            <Text fontSize="xl" fontWeight="700" color="white">{stats.total}</Text>
          </Box>
          <Box px={4} py={2} bg="rgba(234,179,8,0.1)" borderRadius="lg">
            <Text fontSize="xs" color="yellow.300">Pending</Text>
            <Text fontSize="xl" fontWeight="700" color="yellow.400">{stats.pending}</Text>
          </Box>
          <Box px={4} py={2} bg="rgba(59,130,246,0.1)" borderRadius="lg">
            <Text fontSize="xs" color="blue.300">Confirmed</Text>
            <Text fontSize="xl" fontWeight="700" color="blue.400">{stats.confirmed}</Text>
          </Box>
          <Box px={4} py={2} bg="rgba(34,197,94,0.1)" borderRadius="lg">
            <Text fontSize="xs" color="green.300">Completed</Text>
            <Text fontSize="xl" fontWeight="700" color="green.400">{stats.completed}</Text>
          </Box>
        </HStack>

        {/* Bookings Table */}
        {loading ? (
          <AdminLoadingState />
        ) : bookings.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text color="whiteAlpha.600">No bookings found for the selected filters.</Text>
          </Box>
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Table</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Date & Time</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <VStack align="start" gap={0}>
                    <Text fontWeight="600">Table {booking.tableNumber}</Text>
                    {booking.tableName && (
                      <Text fontSize="xs" color="whiteAlpha.600">{booking.tableName}</Text>
                    )}
                  </VStack>
                </td>
                <td>
                  <Text fontWeight="500">{booking.customerName}</Text>
                </td>
                <td>
                  <VStack align="start" gap={0}>
                    <HStack gap={1} fontSize="xs" color="whiteAlpha.700">
                      <LuMail size={12} />
                      <Text>{booking.email}</Text>
                    </HStack>
                    <HStack gap={1} fontSize="xs" color="whiteAlpha.700">
                      <LuPhone size={12} />
                      <Text>{booking.phone}</Text>
                    </HStack>
                  </VStack>
                </td>
                <td>
                  <VStack align="start" gap={0}>
                    <HStack gap={1} fontSize="sm">
                      <LuCalendar size={14} />
                      <Text>{new Date(booking.bookingDate).toLocaleDateString()}</Text>
                    </HStack>
                    <HStack gap={1} fontSize="xs" color="whiteAlpha.700">
                      <LuClock size={12} />
                      <Text>{booking.bookingTime} - {booking.endTime}</Text>
                    </HStack>
                  </VStack>
                </td>
                <td>
                  <HStack gap={1}>
                    <LuUsers size={14} />
                    <Text>{booking.guests}</Text>
                  </HStack>
                </td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    style={{
                      padding: "4px 8px",
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "4px",
                      color: booking.status === "CONFIRMED" ? "#60A5FA" :
                             booking.status === "COMPLETED" ? "#22C55E" :
                             booking.status === "PENDING" ? "#FBBF24" :
                             booking.status === "CANCELLED" ? "#EF4444" : "#9CA3AF",
                      fontSize: "12px",
                    }}
                  >
                    <option value="PENDING" style={{ background: "#1A0F0A" }}>Pending</option>
                    <option value="CONFIRMED" style={{ background: "#1A0F0A" }}>Confirmed</option>
                    <option value="COMPLETED" style={{ background: "#1A0F0A" }}>Completed</option>
                    <option value="CANCELLED" style={{ background: "#1A0F0A" }}>Cancelled</option>
                    <option value="NO_SHOW" style={{ background: "#1A0F0A" }}>No Show</option>
                  </select>
                </td>
                <td>
                  <HStack gap={2}>
                    {booking.status === "PENDING" && (
                      <Button
                        size="xs"
                        colorPalette="green"
                        onClick={() => updateStatus(booking.id, "CONFIRMED")}
                      >
                        <LuCheck size={14} />
                      </Button>
                    )}
                    <Button
                      size="xs"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      <LuTrash2 size={14} />
                    </Button>
                  </HStack>
                </td>
              </tr>
            ))}
              </tbody>
            </table>
          </AdminTableShell>
        )}

        {/* Notes Section */}
        {bookings.some(b => b.notes) && (
          <Box mt={6}>
            <AdminSectionTitle title="Booking Notes" />
            <VStack gap={3} mt={4} align="stretch">
              {bookings.filter(b => b.notes).map((booking) => (
                <Box
                  key={booking.id}
                  p={4}
                  bg="rgba(255,255,255,0.03)"
                  borderRadius="lg"
                  border="1px solid rgba(255,255,255,0.08)"
                >
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="600" color="white">
                      Table {booking.tableNumber} - {booking.customerName}
                    </Text>
                    <Text fontSize="xs" color="whiteAlpha.500">
                      {booking.bookingTime}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="whiteAlpha.700">{booking.notes}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
