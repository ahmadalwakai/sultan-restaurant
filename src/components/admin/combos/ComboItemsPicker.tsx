"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image?: string | null;
}

interface ComboItemsPickerProps {
  selectedItems: { menuItemId: string; quantity: number }[];
  onChange: (items: { menuItemId: string; quantity: number }[]) => void;
}

export function ComboItemsPicker({ selectedItems, onChange }: ComboItemsPickerProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.data || []));
  }, []);

  const filtered = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function addItem(item: MenuItem) {
    const existing = selectedItems.find((s) => s.menuItemId === item.id);
    if (existing) {
      onChange(selectedItems.map((s) => s.menuItemId === item.id ? { ...s, quantity: s.quantity + 1 } : s));
    } else {
      onChange([...selectedItems, { menuItemId: item.id, quantity: 1 }]);
    }
  }

  function removeItem(menuItemId: string) {
    onChange(selectedItems.filter((s) => s.menuItemId !== menuItemId));
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Search Menu Items</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>

      {search && (
        <div className="max-h-48 overflow-y-auto rounded-lg border bg-white">
          {filtered.slice(0, 10).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { addItem(item); setSearch(""); }}
              className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="32px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-amber-50 text-sm">🍛</div>
                )}
              </div>
              <span className="flex-1 text-sm">{item.name}</span>
              <span className="text-sm text-amber-600">£{item.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {selectedItems.map((selected) => {
          const item = menuItems.find((m) => m.id === selected.menuItemId);
          return (
            <div key={selected.menuItemId} className="flex items-center gap-2 rounded-lg border bg-gray-50 p-2">
              <span className="flex-1 text-sm">{item?.name || selected.menuItemId}</span>
              <span className="text-xs text-gray-400">×{selected.quantity}</span>
              <button
                type="button"
                onClick={() => removeItem(selected.menuItemId)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
