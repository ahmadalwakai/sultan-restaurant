"use client";

import { useState, useEffect } from "react";

interface MenuItemFormProps {
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
}

export function AdminMenuItemForm({ initialData, onSubmit }: MenuItemFormProps) {
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    fetch("/api/admin/categories").then((r) => r.json()).then((d) => setCategories(d.data ?? []));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: fd.get("name"),
      description: fd.get("description"),
      price: Number(fd.get("price")),
      categoryId: fd.get("categoryId"),
      isVegetarian: fd.get("isVegetarian") === "on",
      isVegan: fd.get("isVegan") === "on",
      isGlutenFree: fd.get("isGlutenFree") === "on",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label className="block text-sm font-medium mb-1">Name</label><input name="name" defaultValue={(initialData?.name as string) ?? ""} required className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium mb-1">Description</label><textarea name="description" defaultValue={(initialData?.description as string) ?? ""} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium mb-1">Price (pence)</label><input name="price" type="number" defaultValue={(initialData?.price as number) ?? ""} required className="w-full px-3 py-2 border rounded-lg" /></div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select name="categoryId" defaultValue={(initialData?.categoryId as string) ?? ""} className="w-full px-3 py-2 border rounded-lg">
          <option value="">Select category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVegetarian" defaultChecked={!!initialData?.isVegetarian} /> Vegetarian</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVegan" defaultChecked={!!initialData?.isVegan} /> Vegan</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isGlutenFree" defaultChecked={!!initialData?.isGlutenFree} /> Gluten Free</label>
      </div>
      <button type="submit" className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">Save</button>
    </form>
  );
}
