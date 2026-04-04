"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableFilters, AdminTablePagination } from "@/components/admin/tables";
import { VStack, NativeSelect, HStack, Text, Badge, Box, Button } from "@chakra-ui/react";
import { LuHeart, LuCalendar, LuUsers, LuMail, LuPhone, LuTrash2, LuCheck, LuX } from "react-icons/lu";

const WEDDING_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Completed", value: "COMPLETED" },
];

type WeddingBooking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  specialRequests: string | null;
  createdAt: string;
};

export default function AdminWeddingsPage() {
  const [weddings, setWeddings] = useState<WeddingBooking[]>([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<WeddingBooking | null>(null);

  const fetchWeddings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20", type: "WEDDING" });
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/bookings?${params}`);
    const data = await res.json();
    setWeddings(data.data || []);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, status]);

  useEffect(() => { fetchWeddings(); }, [fetchWeddings]);

  async function updateStatus(id: string, newStatus: string) {
    await fetch(`/api/admin/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchWeddings();
  }

  async function deleteBooking(id: string) {
    if (!confirm("Are you sure you want to delete this wedding booking?")) return;
    await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    setSelectedBooking(null);
    fetchWeddings();
  }

  const statusColors: Record<string, string> = {
    PENDING: "#F59E0B",
    CONFIRMED: "#10B981",
    CANCELLED: "#EF4444",
    COMPLETED: "#6B7280",
  };

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={0} align="stretch">
          <AdminSectionTitle 
            title="💒 Wedding Bookings" 
            description="Manage wedding reception bookings and special events" 
          />

          <AdminTableToolbar>
            <AdminTableFilters 
              value={status} 
              onChange={(v) => { setStatus(v); setPage(1); }} 
              options={WEDDING_STATUSES} 
              label="Status" 
            />
          </AdminTableToolbar>

          {loading ? (
            <AdminLoadingState rows={5} height="3.5rem" />
          ) : weddings.length === 0 ? (
            <Box py={16} textAlign="center">
              <LuHeart size={48} color="#D97706" style={{ margin: "0 auto 16px", opacity: 0.5 }} />
              <Text fontSize="lg" fontWeight="medium" color="gray.600">No wedding bookings yet</Text>
              <Text fontSize="sm" color="gray.400">Wedding booking requests will appear here</Text>
            </Box>
          ) : (
            <AdminTableShell>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FEF3C7" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#92400E", textTransform: "uppercase" }}>
                      <HStack gap={2}><LuHeart size={14} /> Couple</HStack>
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#92400E", textTransform: "uppercase" }}>
                      <HStack gap={2}><LuCalendar size={14} /> Date</HStack>
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#92400E", textTransform: "uppercase" }}>Time</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#92400E", textTransform: "uppercase" }}>
                      <HStack gap={2}><LuUsers size={14} /> Guests</HStack>
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#92400E", textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: 600, color: "#92400E", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {weddings.map((w) => (
                    <tr 
                      key={w.id} 
                      style={{ 
                        borderTop: "1px solid #F3F4F6",
                        background: selectedBooking?.id === w.id ? "#FFFBEB" : "white",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedBooking(w)}
                    >
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <Text fontWeight={600} fontSize="0.875rem">{w.name}</Text>
                        <Text fontSize="0.75rem" color="gray.500">{w.email}</Text>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>
                        {new Date(w.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{w.time}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 600 }}>{w.guests}</td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <NativeSelect.Root size="xs" maxW="8rem">
                          <NativeSelect.Field
                            value={w.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStatus(w.id, e.target.value);
                            }}
                            style={{ 
                              background: statusColors[w.status] + "20",
                              borderColor: statusColors[w.status],
                              color: statusColors[w.status],
                              fontWeight: 600,
                            }}
                          >
                            {WEDDING_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </NativeSelect.Field>
                        </NativeSelect.Root>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <HStack gap={2} justify="flex-end">
                          <Button
                            size="xs"
                            colorPalette="green"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); updateStatus(w.id, "CONFIRMED"); }}
                            disabled={w.status === "CONFIRMED"}
                          >
                            <LuCheck size={14} />
                          </Button>
                          <Button
                            size="xs"
                            colorPalette="red"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); deleteBooking(w.id); }}
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

          <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />

          {/* Detail Panel */}
          {selectedBooking && (
            <Box
              mt={6}
              p={6}
              bg="white"
              borderRadius="xl"
              border="2px solid #F59E0B"
              shadow="lg"
            >
              <HStack justify="space-between" mb={4}>
                <HStack gap={2}>
                  <LuHeart size={24} color="#D97706" />
                  <Text fontSize="lg" fontWeight="bold">Wedding Details</Text>
                </HStack>
                <Button size="sm" variant="ghost" onClick={() => setSelectedBooking(null)}>
                  <LuX size={18} />
                </Button>
              </HStack>

              <VStack align="stretch" gap={3}>
                <HStack>
                  <Text fontWeight="medium" w="120px" color="gray.600">Couple:</Text>
                  <Text fontWeight="bold">{selectedBooking.name}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="medium" w="120px" color="gray.600">
                    <LuMail size={14} style={{ display: "inline", marginRight: "4px" }} />
                    Email:
                  </Text>
                  <Link href={`mailto:${selectedBooking.email}`} style={{ color: "#D97706" }}>{selectedBooking.email}</Link>
                </HStack>
                <HStack>
                  <Text fontWeight="medium" w="120px" color="gray.600">
                    <LuPhone size={14} style={{ display: "inline", marginRight: "4px" }} />
                    Phone:
                  </Text>
                  <Link href={`tel:${selectedBooking.phone}`} style={{ color: "#D97706" }}>{selectedBooking.phone}</Link>
                </HStack>
                <HStack>
                  <Text fontWeight="medium" w="120px" color="gray.600">
                    <LuCalendar size={14} style={{ display: "inline", marginRight: "4px" }} />
                    Date:
                  </Text>
                  <Text>{new Date(selectedBooking.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="medium" w="120px" color="gray.600">Time:</Text>
                  <Text>{selectedBooking.time}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="medium" w="120px" color="gray.600">
                    <LuUsers size={14} style={{ display: "inline", marginRight: "4px" }} />
                    Guests:
                  </Text>
                  <Text fontWeight="bold" fontSize="lg">{selectedBooking.guests} people</Text>
                </HStack>
                {selectedBooking.specialRequests && (
                  <Box>
                    <Text fontWeight="medium" color="gray.600" mb={2}>Special Requests:</Text>
                    <Box bg="gray.50" p={4} borderRadius="md" borderLeft="4px solid #D97706">
                      <Text whiteSpace="pre-wrap">{selectedBooking.specialRequests}</Text>
                    </Box>
                  </Box>
                )}
                <HStack>
                  <Text fontWeight="medium" w="120px" color="gray.600">Submitted:</Text>
                  <Text fontSize="sm" color="gray.500">{new Date(selectedBooking.createdAt).toLocaleString()}</Text>
                </HStack>

                <HStack mt={4} gap={3}>
                  <Button
                    colorPalette="green"
                    onClick={() => updateStatus(selectedBooking.id, "CONFIRMED")}
                    disabled={selectedBooking.status === "CONFIRMED"}
                  >
                    <LuCheck size={16} style={{ marginRight: "8px" }} />
                    Confirm Booking
                  </Button>
                  <Button
                    colorPalette="red"
                    variant="outline"
                    onClick={() => updateStatus(selectedBooking.id, "CANCELLED")}
                    disabled={selectedBooking.status === "CANCELLED"}
                  >
                    <LuX size={16} style={{ marginRight: "8px" }} />
                    Cancel Booking
                  </Button>
                  <Button
                    colorPalette="red"
                    variant="ghost"
                    onClick={() => deleteBooking(selectedBooking.id)}
                  >
                    <LuTrash2 size={16} style={{ marginRight: "8px" }} />
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </Box>
          )}
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
