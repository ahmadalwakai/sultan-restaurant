"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell } from "@/components/admin/tables";
import { VStack, HStack, Text, Box, Button, Input, Textarea } from "@chakra-ui/react";
import { LuPlus, LuTrash2, LuPencil, LuX, LuCheck, LuWind, LuArrowUp, LuArrowDown } from "react-icons/lu";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  _count?: {
    items: number;
  };
};

type FormData = {
  name: string;
  description: string;
  image: string;
  sortOrder: string;
  isActive: boolean;
};

const emptyForm: FormData = {
  name: "",
  description: "",
  image: "",
  sortOrder: "0",
  isActive: true,
};

export default function AdminShishaCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shisha/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openAddForm = () => {
    const maxSort = categories.reduce((max, c) => Math.max(max, c.sortOrder), 0);
    setEditingId(null);
    setFormData({ ...emptyForm, sortOrder: String(maxSort + 1) });
    setShowForm(true);
  };

  const openEditForm = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      sortOrder: String(category.sortOrder),
      isActive: category.isActive,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        sortOrder: parseInt(formData.sortOrder) || 0,
      };

      const url = editingId 
        ? `/api/admin/shisha/categories/${editingId}` 
        : "/api/admin/shisha/categories";
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Category updated" : "Category added");
        closeForm();
        fetchCategories();
      } else {
        toast.error(data.error || "Failed to save category");
      }
    } catch {
      toast.error("Failed to save category");
    }
    setSaving(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/shisha/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      if ((await res.json()).success) {
        fetchCategories();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const updateSortOrder = async (id: string, direction: "up" | "down") => {
    const index = categories.findIndex(c => c.id === id);
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === categories.length - 1) return;

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const currentSort = categories[index].sortOrder;
    const swapSort = categories[swapIndex].sortOrder;

    try {
      await Promise.all([
        fetch(`/api/admin/shisha/categories/${categories[index].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sortOrder: swapSort }),
        }),
        fetch(`/api/admin/shisha/categories/${categories[swapIndex].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sortOrder: currentSort }),
        }),
      ]);
      fetchCategories();
    } catch {
      toast.error("Failed to reorder");
    }
  };

  const deleteCategory = async (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (cat?._count?.items && cat._count.items > 0) {
      toast.error(`Cannot delete: ${cat._count.items} items in this category`);
      return;
    }
    if (!confirm("Delete this category?")) return;
    
    try {
      const res = await fetch(`/api/admin/shisha/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Category deleted");
        fetchCategories();
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={6} align="stretch">
          <AdminSectionTitle
            title="Shisha Categories"
            description="Organize your shisha menu into categories"
          />
          <HStack gap={3}>
            <Link href="/admin/shisha/menu">
              <Button size="sm" variant="outline" colorPalette="purple">
                Manage Menu Items
              </Button>
            </Link>
            <Button size="sm" colorPalette="purple" onClick={openAddForm}>
              <LuPlus size={16} /> Add Category
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
              maxW="md"
            >
              <HStack justify="space-between" mb={6}>
                <Text fontSize="xl" fontWeight="700" color="white">
                  {editingId ? "Edit Category" : "Add Category"}
                </Text>
                <Button size="sm" variant="ghost" onClick={closeForm}>
                  <LuX size={20} />
                </Button>
              </HStack>

              <VStack gap={4} align="stretch">
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Name *</Text>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Classic Shisha"
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
                    <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Sort Order</Text>
                    <Input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                      bg="rgba(0,0,0,0.3)"
                      border="1px solid rgba(255,255,255,0.1)"
                    />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="sm" color="whiteAlpha.700" mb={1}>Status</Text>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginTop: "8px" }}>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <Text fontSize="sm" color="whiteAlpha.700">Active</Text>
                    </label>
                  </Box>
                </HStack>

                <HStack gap={3} pt={4}>
                  <Button flex={1} variant="outline" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button flex={1} colorPalette="purple" onClick={handleSubmit} disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update" : "Add Category"}
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        )}

        {/* Categories Table */}
        {loading ? (
          <AdminLoadingState />
        ) : categories.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text color="whiteAlpha.600">No categories yet. Add your first category!</Text>
          </Box>
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Items</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td>
                  <HStack gap={1}>
                    <Button
                      size="xs"
                      variant="ghost"
                      disabled={index === 0}
                      onClick={() => updateSortOrder(category.id, "up")}
                    >
                      <LuArrowUp size={14} />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      disabled={index === categories.length - 1}
                      onClick={() => updateSortOrder(category.id, "down")}
                    >
                      <LuArrowDown size={14} />
                    </Button>
                  </HStack>
                </td>
                <td>
                  {category.image ? (
                    <Box w={10} h={10} borderRadius="lg" overflow="hidden" position="relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ) : (
                    <Box
                      w={10}
                      h={10}
                      borderRadius="lg"
                      bg="rgba(139,92,246,0.2)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>🌬️</Text>
                    </Box>
                  )}
                </td>
                <td>
                  <VStack align="start" gap={0}>
                    <Text fontWeight="600">{category.name}</Text>
                    <Text fontSize="xs" color="whiteAlpha.500">{category.slug}</Text>
                  </VStack>
                </td>
                <td>
                  <Text fontSize="sm" color="whiteAlpha.600" maxW="200px" lineClamp={2}>
                    {category.description || "—"}
                  </Text>
                </td>
                <td>
                  <Link href={`/admin/shisha/menu?category=${category.id}`}>
                    <Text color="#8B5CF6" _hover={{ textDecoration: "underline" }}>
                      {category._count?.items ?? 0} items
                    </Text>
                  </Link>
                </td>
                <td>
                  <Button
                    size="xs"
                    variant={category.isActive ? "solid" : "outline"}
                    colorPalette={category.isActive ? "green" : "red"}
                    onClick={() => toggleActive(category.id, category.isActive)}
                  >
                    {category.isActive ? <LuCheck size={14} /> : <LuX size={14} />}
                  </Button>
                </td>
                <td>
                  <HStack gap={2}>
                    <Button size="xs" variant="ghost" onClick={() => openEditForm(category)}>
                      <LuPencil size={14} />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => deleteCategory(category.id)}
                      disabled={(category._count?.items ?? 0) > 0}
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

        {/* Suggested Categories */}
        <Box mt={8} p={5} bg="rgba(139,92,246,0.1)" borderRadius="xl" border="1px solid rgba(139,92,246,0.2)">
          <AdminSectionTitle title="Suggested Categories" />
          <Text fontSize="sm" color="whiteAlpha.600" mt={2} mb={4}>
            Click to quickly add these common shisha menu categories:
          </Text>
          <HStack gap={3} flexWrap="wrap">
            {["Classic Shisha", "Premium Shisha", "Frozen Shisha", "Fruit Head", "Hot Drinks", "Cold Drinks", "Fresh Juices", "Mocktails"].map((name) => {
              const exists = categories.some(c => c.name.toLowerCase() === name.toLowerCase());
              return (
                <Button
                  key={name}
                  size="sm"
                  variant="outline"
                  colorPalette="purple"
                  disabled={exists}
                  onClick={() => {
                    setFormData({
                      name,
                      description: "",
                      image: "",
                      sortOrder: String(categories.length + 1),
                      isActive: true,
                    });
                    setShowForm(true);
                  }}
                >
                  {exists ? <LuCheck size={14} /> : <LuPlus size={14} />} {name}
                </Button>
              );
            })}
          </HStack>
        </Box>
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
