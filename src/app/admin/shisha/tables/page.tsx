"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { VStack, HStack, Text, Box, Button, Input, Badge } from "@chakra-ui/react";
import { LuPlus, LuTrash2, LuCheck, LuX, LuUsers, LuClock, LuCalendar, LuWind } from "react-icons/lu";
import toast from "react-hot-toast";
import Link from "next/link";

type ShishaTable = {
  id: string;
  tableNumber: number;
  name: string | null;
  capacity: number;
  status: "AVAILABLE" | "BOOKED" | "TEMPORARILY_UNAVAILABLE";
  isActive: boolean;
  notes: string | null;
  _count?: {
    bookings: number;
  };
};

export default function AdminShishaTablesPage() {
  const [tables, setTables] = useState<ShishaTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTableCapacity, setNewTableCapacity] = useState(4);
  const [newTableName, setNewTableName] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchTables = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shisha/tables");
      const data = await res.json();
      if (data.success) {
        setTables(data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load shisha tables");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTables();
    const interval = setInterval(fetchTables, 30000);
    return () => clearInterval(interval);
  }, [fetchTables]);

  async function addTable() {
    setAdding(true);
    try {
      const res = await fetch("/api/admin/shisha/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          capacity: newTableCapacity,
          name: newTableName || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Shisha Table ${data.data.tableNumber} added`);
        setNewTableName("");
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
      const res = await fetch(`/api/admin/shisha/tables/${id}`, {
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

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/shisha/tables/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Table status updated`);
        fetchTables();
      }
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function deleteTable(id: string) {
    if (!confirm("Delete this shisha table? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/shisha/tables/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Table deleted");
        fetchTables();
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch {
      toast.error("Failed to delete table");
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "green";
      case "BOOKED": return "red";
      case "TEMPORARILY_UNAVAILABLE": return "yellow";
      default: return "gray";
    }
  };

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={6} align="stretch">
          <AdminSectionTitle
            title="Shisha Tables"
            description="Manage shisha lounge tables and availability"
          />
          <HStack gap={3}>
            <Link href="/admin/shisha/bookings">
              <Button size="sm" variant="outline" colorPalette="purple">
                View Bookings
              </Button>
            </Link>
            <Link href="/admin/shisha/menu">
              <Button size="sm" variant="outline" colorPalette="purple">
                Manage Menu
              </Button>
            </Link>
          </HStack>
        {/* Add New Table */}
        <Box
          p={5}
          bg="rgba(139,92,246,0.1)"
          borderRadius="xl"
          border="1px solid rgba(139,92,246,0.2)"
          mb={6}
        >
          <AdminSectionTitle title="Add New Shisha Table" />
          <HStack gap={4} mt={4} flexWrap="wrap">
            <Box>
              <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Table Name (Optional)</Text>
              <Input
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                placeholder="e.g., VIP Corner"
                size="sm"
                w="180px"
                bg="rgba(0,0,0,0.3)"
                border="1px solid rgba(255,255,255,0.1)"
              />
            </Box>
            <Box>
              <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Capacity</Text>
              <select
                value={newTableCapacity}
                onChange={(e) => setNewTableCapacity(Number(e.target.value))}
                style={{
                  padding: "6px 12px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n} style={{ background: "#1A0F0A" }}>
                    {n} guests
                  </option>
                ))}
              </select>
            </Box>
            <Button
              onClick={addTable}
              disabled={adding}
              colorPalette="purple"
              size="sm"
              mt={6}
            >
              <LuPlus size={16} />
              {adding ? "Adding..." : "Add Table"}
            </Button>
          </HStack>
        </Box>

        {/* Tables Grid */}
        {loading ? (
          <AdminLoadingState />
        ) : tables.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text color="whiteAlpha.600">No shisha tables configured. Add your first table above.</Text>
          </Box>
        ) : (
          <VStack gap={4} align="stretch">
            <HStack gap={4} flexWrap="wrap">
              <Badge colorPalette="green">Available: {tables.filter(t => t.status === "AVAILABLE" && t.isActive).length}</Badge>
              <Badge colorPalette="red">Booked: {tables.filter(t => t.status === "BOOKED" && t.isActive).length}</Badge>
              <Badge colorPalette="yellow">Unavailable: {tables.filter(t => t.status === "TEMPORARILY_UNAVAILABLE" || !t.isActive).length}</Badge>
            </HStack>
            
            <AdminTableShell>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Total Bookings</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
              {tables.map((table) => (
                <tr key={table.id}>
                  <td>
                    <Text fontWeight="600">Table {table.tableNumber}</Text>
                  </td>
                  <td>
                    <Text color="whiteAlpha.700">{table.name || "—"}</Text>
                  </td>
                  <td>
                    <HStack gap={1}>
                      <LuUsers size={14} />
                      <Text>{table.capacity}</Text>
                    </HStack>
                  </td>
                  <td>
                    <select
                      value={table.status}
                      onChange={(e) => updateStatus(table.id, e.target.value)}
                      style={{
                        padding: "4px 8px",
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        color: table.status === "AVAILABLE" ? "#22C55E" : table.status === "BOOKED" ? "#EF4444" : "#FBBF24",
                        fontSize: "12px",
                      }}
                    >
                      <option value="AVAILABLE" style={{ background: "#1A0F0A" }}>Available</option>
                      <option value="BOOKED" style={{ background: "#1A0F0A" }}>Booked</option>
                      <option value="TEMPORARILY_UNAVAILABLE" style={{ background: "#1A0F0A" }}>Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <Text color="whiteAlpha.700">{table._count?.bookings ?? 0}</Text>
                  </td>
                  <td>
                    <Button
                      size="xs"
                      variant={table.isActive ? "solid" : "outline"}
                      colorPalette={table.isActive ? "green" : "red"}
                      onClick={() => toggleTableActive(table.id, table.isActive)}
                    >
                      {table.isActive ? <LuCheck size={14} /> : <LuX size={14} />}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="xs"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => deleteTable(table.id)}
                    >
                      <LuTrash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
                </tbody>
              </table>
            </AdminTableShell>
          </VStack>
        )}
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
