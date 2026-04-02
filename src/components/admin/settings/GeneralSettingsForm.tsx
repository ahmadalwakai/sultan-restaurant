"use client";

import { useState } from "react";

interface GeneralSettings { restaurantName: string; tagline: string; description: string; currency: string; timezone: string }

export function GeneralSettingsForm({ initial, onSave }: { initial: GeneralSettings; onSave: (data: GeneralSettings) => Promise<void> }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div><label className="block text-sm font-medium mb-1">Restaurant Name</label><input value={form.restaurantName} onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} className="w-full border rounded-lg px-3 py-2" required /></div>
      <div><label className="block text-sm font-medium mb-1">Tagline</label><input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium mb-1">Currency</label><select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full border rounded-lg px-3 py-2"><option value="GBP">GBP (£)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Timezone</label><input value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      </div>
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
