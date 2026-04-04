"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { VStack, HStack, Text, Box, Button, Input } from "@chakra-ui/react";
import { LuPlus, LuTrash2, LuCheck, LuX, LuUsers, LuClock, LuCalendar } from "react-icons/lu";
import toast from "react-hot-toast";

type TableBooking = {
  id: string;
  name: string;
  time: string;
  endTime: string | null;
  guests: number;
  status: string;
};

type RestaurantTable = {
  id: string;
  tableNumber: number;
  capacity: number;
  isActive: boolean;
  isCurrentlyOccupied: boolean;
  currentBooking: TableBooking | null;
  todayBookings: TableBooking[];
};

export default function AdminTablesPage() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTableCapacity, setNewTableCapacity] = useState(4);
  const [adding, setAdding] = useState(false);

  const fetchTables = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tables");
      const data = await res.json();
      if (data.success) {
        setTables(data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load tables");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTables();
    // Refresh every 30 seconds to update availability
    const interval = setInterval(fetchTables, 30000);
    return () => clearInterval(interval);
  }, [fetchTables]);

  async function addTable() {
    setAdding(true);
    try {
      const res = await fetch("/api/admin/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capacity: newTableCapacity }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Table ${data.data.tableNumber} added`);
        fetchTables();
      } else {
        toast.error(data.error || "Failed to add table");
      }
    } catch {
      toast.error("Failed to add table");
    }
    setAdding(false);
  }

  async function toggleTableActive(id: string, currentStatus: boolean) {
    try {
      const res = await fetch(`/api/admin/tables/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Table ${!currentStatus ? "activated" : "deactivated"}`);
        fetchTables();
      }
    } catch {
      toast.error("Failed to update table");
    }
  }

  async function updateCapacity(id: string, capacity: number) {
    try {
      await fetch(`/api/admin/tables/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capacity }),
      });
      fetchTables();
    } catch {
      toast.error("Failed to update capacity");
    }
  }

  async function deleteTable(id: string, tableNumber: number) {
    if (!confirm(`Are you sure you want to delete Table ${tableNumber}?`)) return;
    try {
      const res = await fetch(`/api/admin/tables/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(`Table ${tableNumber} deleted`);
        fetchTables();
      } else {
        toast.error(data.error || "Failed to delete table");
      }
    } catch {
      toast.error("Failed to delete table");
    }
  }

  const activeTables = tables.filter(t => t.isActive);
  const availableTables = activeTables.filter(t => !t.isCurrentlyOccupied);
  const occupiedTables = activeTables.filter(t => t.isCurrentlyOccupied);

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={6} align="stretch">
          <AdminSectionTitle 
            title="🪑 Table Management" 
            description="Manage restaurant tables and view current availability" 
          />

          {/* Stats Overview */}
          <HStack gap={4} flexWrap="wrap">
            <Box 
              bg="white" 
              p={4} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="gray.200"
              minW="150px"
            >
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">{tables.length}</Text>
              <Text fontSize="sm" color="gray.500">Total Tables</Text>
            </Box>
            <Box 
              bg="green.50" 
              p={4} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="green.200"
              minW="150px"
            >
              <Text fontSize="2xl" fontWeight="bold" color="green.600">{availableTables.length}</Text>
              <Text fontSize="sm" color="green.700">Available Now</Text>
            </Box>
            <Box 
              bg="orange.50" 
              p={4} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="orange.200"
              minW="150px"
            >
              <Text fontSize="2xl" fontWeight="bold" color="orange.600">{occupiedTables.length}</Text>
              <Text fontSize="sm" color="orange.700">Occupied</Text>
            </Box>
            <Box 
              bg="gray.50" 
              p={4} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="gray.200"
              minW="150px"
            >
              <Text fontSize="2xl" fontWeight="bold" color="gray.600">{tables.length - activeTables.length}</Text>
              <Text fontSize="sm" color="gray.500">Inactive</Text>
            </Box>
          </HStack>

          {/* Add New Table */}
          <Box bg="white" p={4} borderRadius="lg" border="1px solid" borderColor="gray.200">
            <Text fontWeight="600" mb={3}>Add New Table</Text>
            <HStack gap={3}>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={1}>Capacity (seats)</Text>
                <Input
                  type="number"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(Number(e.target.value))}
                  min={1}
                  max={20}
                  w="100px"
                  size="sm"
                />
              </Box>
              <Button
                onClick={addTable}
                disabled={adding}
                size="sm"
                bg="#C8A951"
                color="#0D0906"
                _hover={{ bg: "#B89841" }}
                mt="auto"
              >
                <LuPlus size={16} style={{ marginRight: "4px" }} />
                {adding ? "Adding..." : "Add Table"}
              </Button>
            </HStack>
          </Box>

          {/* Tables List */}
          {loading ? (
            <AdminLoadingState rows={5} height="4rem" />
          ) : tables.length === 0 ? (
            <Box py={16} textAlign="center" bg="white" borderRadius="lg">
              <Text fontSize="lg" fontWeight="medium" color="gray.600">No tables configured</Text>
              <Text fontSize="sm" color="gray.400">Add your first table above</Text>
            </Box>
          ) : (
            <AdminTableShell>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>
                      Table #
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>
                      <HStack gap={2}><LuUsers size={14} /> Capacity</HStack>
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>
                      Status
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>
                      <HStack gap={2}><LuClock size={14} /> Current Booking</HStack>
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>
                      <HStack gap={2}><LuCalendar size={14} /> Today's Bookings</HStack>
                    </th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((table) => (
                    <tr 
                      key={table.id} 
                      style={{ 
                        borderTop: "1px solid #F3F4F6",
                        background: !table.isActive ? "#F9FAFB" : table.isCurrentlyOccupied ? "#FEF3C7" : "white",
                        opacity: table.isActive ? 1 : 0.6,
                      }}
                    >
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <Text fontWeight={700} fontSize="1.25rem">#{table.tableNumber}</Text>
                      </td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <select
                          value={table.capacity}
                          onChange={(e) => updateCapacity(table.id, Number(e.target.value))}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            border: "1px solid #E5E7EB",
                            fontSize: "14px",
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                            <option key={n} value={n}>{n} seats</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {!table.isActive ? (
                          <span style={{ 
                            display: "inline-flex", 
                            alignItems: "center", 
                            gap: "4px",
                            padding: "4px 8px", 
                            borderRadius: "4px", 
                            background: "#F3F4F6",
                            color: "#6B7280",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}>
                            <LuX size={12} /> Inactive
                          </span>
                        ) : table.isCurrentlyOccupied ? (
                          <span style={{ 
                            display: "inline-flex", 
                            alignItems: "center", 
                            gap: "4px",
                            padding: "4px 8px", 
                            borderRadius: "4px", 
                            background: "#FEF3C7",
                            color: "#92400E",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}>
                            <LuClock size={12} /> Occupied
                          </span>
                        ) : (
                          <span style={{ 
                            display: "inline-flex", 
                            alignItems: "center", 
                            gap: "4px",
                            padding: "4px 8px", 
                            borderRadius: "4px", 
                            background: "#D1FAE5",
                            color: "#065F46",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}>
                            <LuCheck size={12} /> Available
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>
                        {table.currentBooking ? (
                          <Box>
                            <Text fontWeight={500}>{table.currentBooking.name}</Text>
                            <Text fontSize="xs" color="gray.500">
                              {table.currentBooking.time} - {table.currentBooking.endTime || "~" + calculateEndTime(table.currentBooking.time)}
                            </Text>
                          </Box>
                        ) : (
                          <Text color="gray.400">—</Text>
                        )}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>
                        {table.todayBookings.length > 0 ? (
                          <Text>{table.todayBookings.length} booking{table.todayBookings.length > 1 ? "s" : ""}</Text>
                        ) : (
                          <Text color="gray.400">No bookings</Text>
                        )}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <HStack gap={2} justifyContent="flex-end">
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => toggleTableActive(table.id, table.isActive)}
                            colorScheme={table.isActive ? "orange" : "green"}
                          >
                            {table.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => deleteTable(table.id, table.tableNumber)}
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

          {/* Info Box */}
          <Box bg="blue.50" p={4} borderRadius="lg" border="1px solid" borderColor="blue.200">
            <Text fontWeight="600" color="blue.800" mb={2}>ℹ️ How Table Availability Works</Text>
            <VStack align="start" gap={1} fontSize="sm" color="blue.700">
              <Text>• Tables are automatically marked as "Occupied" during active bookings</Text>
              <Text>• Each booking lasts 2 hours 30 minutes from the start time</Text>
              <Text>• Tables become "Available" again automatically after the booking ends</Text>
              <Text>• Customers can see available tables before making a booking</Text>
              <Text>• Deactivate tables that are temporarily unavailable (maintenance, reserved, etc.)</Text>
            </VStack>
          </Box>
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}

// Helper function
function calculateEndTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  let endHours = hours + 2;
  let endMinutes = minutes + 30;
  if (endMinutes >= 60) {
    endHours += 1;
    endMinutes -= 60;
  }
  if (endHours >= 24) endHours = 23;
  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}
