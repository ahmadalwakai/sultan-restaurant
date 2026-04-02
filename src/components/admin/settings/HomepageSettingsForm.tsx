"use client";

import { useState } from "react";

interface HomepageSettings { heroTitle: string; heroSubtitle: string; heroImageUrl: string; showOffers: boolean; showReviews: boolean; showMenu: boolean; showBooking: boolean }

export function HomepageSettingsForm({ initial, onSave }: { initial: HomepageSettings; onSave: (data: HomepageSettings) => Promise<void> }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const toggles: Array<{ key: keyof HomepageSettings; label: string }> = [
    { key: "showOffers", label: "Show Offers Section" },
    { key: "showReviews", label: "Show Reviews Section" },
    { key: "showMenu", label: "Show Menu Preview" },
    { key: "showBooking", label: "Show Booking Section" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div><label className="block text-sm font-medium mb-1">Hero Title</label><input value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <div><label className="block text-sm font-medium mb-1">Hero Subtitle</label><input value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <div><label className="block text-sm font-medium mb-1">Hero Image URL</label><input value={form.heroImageUrl} onChange={(e) => setForm({ ...form, heroImageUrl: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <div className="space-y-2 pt-2">
        <p className="text-sm font-medium">Sections</p>
        {toggles.map((t) => (
          <label key={t.key} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form[t.key] as boolean} onChange={(e) => setForm({ ...form, [t.key]: e.target.checked })} />
            {t.label}
          </label>
        ))}
      </div>
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
