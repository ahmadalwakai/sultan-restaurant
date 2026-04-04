"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { VStack, HStack, Text, Box, Button, Input, Textarea, Badge } from "@chakra-ui/react";
import { LuPlus, LuTrash2, LuPencil, LuStar, LuX, LuCheck, LuWind, LuImage } from "react-icons/lu";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type MenuItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discountedPrice: number | null;
  image: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  intensity: number | null;
  tags: string[];
  category: Category;
};

type FormData = {
  categoryId: string;
  name: string;
  description: string;
  price: string;
  discountedPrice: string;
  image: string;
  intensity: string;
  tags: string;
  isFeatured: boolean;
  isAvailable: boolean;
};

const emptyForm: FormData = {
  categoryId: "",
  name: "",
  description: "",
  price: "",
  discountedPrice: "",
  image: "",
  intensity: "",
  tags: "",
  isFeatured: false,
  isAvailable: true,
};

export default function AdminShishaMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState("ALL");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [itemsRes, catsRes] = await Promise.all([
        fetch("/api/admin/shisha/menu"),
        fetch("/api/admin/shisha/categories"),
      ]);
      const itemsData = await itemsRes.json();
      const catsData = await catsRes.json();
      if (itemsData.success) setItems(itemsData.data || []);
      if (catsData.success) setCategories(catsData.data || []);
    } catch (error) {
      toast.error("Failed to load menu data");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, categoryId: categories[0]?.id || "" });
    setShowForm(true);
  };

  const openEditForm = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData({
      categoryId: item.category.id,
      name: item.name,
      description: item.description || "",
      price: String(item.price),
      discountedPrice: item.discountedPrice ? String(item.discountedPrice) : "",
      image: item.image || "",
      intensity: item.intensity ? String(item.intensity) : "",
      tags: item.tags.join(", "),
      isFeatured: item.isFeatured,
      isAvailable: item.isAvailable,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.categoryId) {
      toast.error("Please fill in required fields");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : null,
        tags: formData.tags ? formData.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        intensity: formData.intensity ? Number(formData.intensity) : null,
      };

      const url = editingId 
        ? `/api/admin/shisha/menu/${editingId}` 
        : "/api/admin/shisha/menu";
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Item updated" : "Item added");
        closeForm();
        fetchData();
      } else {
        toast.error(data.error || "Failed to save item");
      }
    } catch {
      toast.error("Failed to save item");
    }
    setSaving(false);
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/shisha/menu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !current }),
      });
      if ((await res.json()).success) {
        fetchData();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const toggleAvailable = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/shisha/menu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !current }),
      });
      if ((await res.json()).success) {
        fetchData();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/admin/shisha/menu/${id}`, { method: "DELETE" });
      if ((await res.json()).success) {
        toast.success("Item deleted");
        fetchData();
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filteredItems = filterCategory === "ALL" 
    ? items 
    : items.filter(i => i.category.id === filterCategory);

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={6} align="stretch">
          <AdminSectionTitle
            title="Shisha Menu"
            description="Manage shisha flavors, drinks, and pricing"
          />
          <HStack gap={3}>
            <Link href="/admin/shisha/categories">
              <Button size="sm" variant="outline" colorPalette="purple">
                Manage Categories
              </Button>
            </Link>
            <Button size="sm" colorPalette="purple" onClick={openAddForm}>
              <LuPlus size={16} /> Add Item
            </Button>
          </HStack>
        {/* Add/Edit Form Modal */}
        {showForm && (
          <Box
            position="fixed"
            inset={0}
            bg="rgba(0,0,0,0.7)"
            zIndex={100}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <Box
              bg="#1A0F0A"
              borderRadius="xl"
              border="1px solid rgba(255,255,255,0.1)"
              p={6}
              w="full"
              maxW="lg"
              maxH="90vh"
              overflow="auto"
            >
              <HStack justify="space-between" mb={6}>
                <Text fontSize="xl" fontWeight="700" color="white">
                  {editingId ? "Edit Menu Item" : "Add Menu Item"}
                </Text>
                <Button size="sm" variant="ghost" onClick={closeForm}>
                  <LuX size={20} />
                </Button>
              </HStack>

              <VStack gap={4} align="stretch">
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Category *</Text>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      color: "white",
                    }}
                  >
                    <option value="" style={{ background: "#1A0F0A" }}>Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id} style={{ background: "#1A0F0A" }}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Name *</Text>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Classic Mint"
                    bg="rgba(0,0,0,0.3)"
                    border="1px solid rgba(255,255,255,0.1)"
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Description</Text>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description..."
                    rows={2}
                    bg="rgba(0,0,0,0.3)"
                    border="1px solid rgba(255,255,255,0.1)"
                  />
                </Box>

                <HStack gap={4}>
                  <Box flex={1}>
                    <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Price (£) *</Text>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="25.00"
                      bg="rgba(0,0,0,0.3)"
                      border="1px solid rgba(255,255,255,0.1)"
                    />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Sale Price (£)</Text>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.discountedPrice}
                      onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                      placeholder="Optional"
                      bg="rgba(0,0,0,0.3)"
                      border="1px solid rgba(255,255,255,0.1)"
                    />
                  </Box>
                </HStack>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Image URL</Text>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    bg="rgba(0,0,0,0.3)"
                    border="1px solid rgba(255,255,255,0.1)"
                  />
                </Box>

                <HStack gap={4}>
                  <Box flex={1}>
                    <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Intensity (Shisha only)</Text>
                    <select
                      value={formData.intensity}
                      onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "6px",
                        color: "white",
                      }}
                    >
                      <option value="" style={{ background: "#1A0F0A" }}>None</option>
                      <option value="1" style={{ background: "#1A0F0A" }}>Mild (1)</option>
                      <option value="2" style={{ background: "#1A0F0A" }}>Light (2)</option>
                      <option value="3" style={{ background: "#1A0F0A" }}>Medium (3)</option>
                      <option value="4" style={{ background: "#1A0F0A" }}>Strong (4)</option>
                      <option value="5" style={{ background: "#1A0F0A" }}>Extra Strong (5)</option>
                    </select>
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Tags</Text>
                    <Input
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="mint, fruity, popular"
                      bg="rgba(0,0,0,0.3)"
                      border="1px solid rgba(255,255,255,0.1)"
                    />
                  </Box>
                </HStack>

                <HStack gap={6}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    <Text fontSize="sm" color="whiteAlpha.700">Featured</Text>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    />
                    <Text fontSize="sm" color="whiteAlpha.700">Available</Text>
                  </label>
                </HStack>

                <HStack gap={3} pt={4}>
                  <Button flex={1} variant="outline" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button flex={1} colorPalette="purple" onClick={handleSubmit} disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update" : "Add Item"}
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        )}

        {/* Filter */}
        <HStack gap={4} mb={6}>
          <Box>
            <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Filter by Category</Text>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: "6px 12px",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                color: "white",
              }}
            >
              <option value="ALL" style={{ background: "#1A0F0A" }}>All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} style={{ background: "#1A0F0A" }}>
                  {cat.name}
                </option>
              ))}
            </select>
          </Box>
          <Text mt={6} color="whiteAlpha.600" fontSize="sm">
            {filteredItems.length} items
          </Text>
        </HStack>

        {/* Items Table */}
        {loading ? (
          <AdminLoadingState />
        ) : filteredItems.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text color="whiteAlpha.600">No menu items found. Add your first item!</Text>
          </Box>
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Featured</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image ? (
                    <Box w={12} h={12} borderRadius="lg" overflow="hidden" position="relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ) : (
                    <Box
                      w={12}
                      h={12}
                      borderRadius="lg"
                      bg="rgba(139,92,246,0.2)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <LuImage size={20} color="#8B5CF6" />
                    </Box>
                  )}
                </td>
                <td>
                  <VStack align="start" gap={0}>
                    <Text fontWeight="600">{item.name}</Text>
                    {item.intensity && (
                      <Badge size="sm" colorPalette="purple">Level {item.intensity}</Badge>
                    )}
                  </VStack>
                </td>
                <td>
                  <Text color="whiteAlpha.700">{item.category.name}</Text>
                </td>
                <td>
                  {item.discountedPrice ? (
                    <VStack align="start" gap={0}>
                      <Text fontWeight="600" color="#8B5CF6">£{item.discountedPrice.toFixed(2)}</Text>
                      <Text fontSize="xs" textDecoration="line-through" color="whiteAlpha.500">
                        £{item.price.toFixed(2)}
                      </Text>
                    </VStack>
                  ) : (
                    <Text fontWeight="600">£{item.price.toFixed(2)}</Text>
                  )}
                </td>
                <td>
                  <Button
                    size="xs"
                    variant={item.isFeatured ? "solid" : "outline"}
                    colorPalette="yellow"
                    onClick={() => toggleFeatured(item.id, item.isFeatured)}
                  >
                    <LuStar size={14} />
                  </Button>
                </td>
                <td>
                  <Button
                    size="xs"
                    variant={item.isAvailable ? "solid" : "outline"}
                    colorPalette={item.isAvailable ? "green" : "red"}
                    onClick={() => toggleAvailable(item.id, item.isAvailable)}
                  >
                    {item.isAvailable ? <LuCheck size={14} /> : <LuX size={14} />}
                  </Button>
                </td>
                <td>
                  <HStack gap={2}>
                    <Button size="xs" variant="ghost" onClick={() => openEditForm(item)}>
                      <LuPencil size={14} />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => deleteItem(item.id)}
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
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
