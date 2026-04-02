"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image?: string | null;
}

interface DishOfDaySelectorProps {
  selectedId: string;
  onChange: (menuItemId: string) => void;
}

export function DishOfDaySelector({ selectedId, onChange }: DishOfDaySelectorProps) {
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
  const selected = menuItems.find((m) => m.id === selectedId);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Select Menu Item</label>

      {selected && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
            {selected.image ? (
              <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="40px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-amber-100 text-lg">🍛</div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{selected.name}</p>
            <p className="text-xs text-amber-600">£{selected.price.toFixed(2)}</p>
          </div>
          <button type="button" onClick={() => onChange("")} className="text-sm text-gray-400 hover:text-gray-600">Change</button>
        </div>
      )}

      {!selected && (
        <>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
          />
          <div className="max-h-64 overflow-y-auto rounded-lg border bg-white">
            {filtered.slice(0, 20).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { onChange(item.id); setSearch(""); }}
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
        </>
      )}
    </div>
  );
}
