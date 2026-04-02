"use client";

import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DayHours { day: string; open: string; close: string; isClosed: boolean }

export function OpeningHoursForm({ initial, onSave }: { initial: DayHours[]; onSave: (data: DayHours[]) => Promise<void> }) {
  const [hours, setHours] = useState<DayHours[]>(
    initial.length ? initial : DAYS.map((day) => ({ day, open: "11:00", close: "22:00", isClosed: false }))
  );
  const [saving, setSaving] = useState(false);

  const update = (index: number, field: keyof DayHours, value: string | boolean) => {
    const updated = [...hours];
    updated[index] = { ...updated[index], [field]: value };
    setHours(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(hours);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      {hours.map((h, i) => (
        <div key={h.day} className="flex items-center gap-3">
          <span className="w-24 text-sm font-medium">{h.day}</span>
          <label className="flex items-center gap-1 text-sm">
            <input type="checkbox" checked={h.isClosed} onChange={(e) => update(i, "isClosed", e.target.checked)} />
            Closed
          </label>
          {!h.isClosed && (
            <>
              <input type="time" value={h.open} onChange={(e) => update(i, "open", e.target.value)} className="border rounded px-2 py-1 text-sm" />
              <span className="text-gray-400">to</span>
              <input type="time" value={h.close} onChange={(e) => update(i, "close", e.target.value)} className="border rounded px-2 py-1 text-sm" />
            </>
          )}
        </div>
      ))}
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save Hours"}</button>
    </form>
  );
}
