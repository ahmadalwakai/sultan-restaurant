"use client";

import { useState } from "react";

interface ComboFormData {
  name: string;
  description: string;
  price: string;
  image: string;
  servesCount: string;
  isActive: boolean;
  items: { menuItemId: string; quantity: number }[];
}

interface ComboFormProps {
  initialData?: Partial<ComboFormData>;
  onSubmit: (data: ComboFormData) => Promise<void>;
  submitLabel?: string;
}

export function ComboForm({ initialData, onSubmit, submitLabel = "Save" }: ComboFormProps) {
  const [form, setForm] = useState<ComboFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    image: initialData?.image || "",
    servesCount: initialData?.servesCount || "2",
    isActive: initialData?.isActive ?? true,
    items: initialData?.items || [],
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSubmit(form);
    setSaving(false);
  }

  function addItem() {
    setForm({ ...form, items: [...form.items, { menuItemId: "", quantity: 1 }] });
  }

  function updateItem(index: number, field: string, value: string | number) {
    const newItems = form.items.map((item, i) => i === index ? { ...item, [field]: value } : item);
    setForm({ ...form, items: newItems });
  }

  function removeItem(index: number) {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Price (£)</label>
          <input
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Serves</label>
          <input
            type="number"
            min="1"
            value={form.servesCount}
            onChange={(e) => setForm({ ...form, servesCount: e.target.value })}
            className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full rounded-lg border px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Combo Items</label>
          <button type="button" onClick={addItem} className="text-sm text-amber-600 hover:underline">+ Add Item</button>
        </div>
        <div className="space-y-2">
          {form.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Menu Item ID"
                value={item.menuItemId}
                onChange={(e) => updateItem(i, "menuItemId", e.target.value)}
                className="flex-1 rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
              />
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value, 10))}
                className="w-20 rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
              />
              <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-600">✕</button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="comboActive"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="rounded border-gray-300"
        />
        <label htmlFor="comboActive" className="text-sm text-gray-700">Active</label>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-amber-500 px-6 py-2 font-medium text-white hover:bg-amber-600 disabled:opacity-50"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
