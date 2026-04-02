"use client";

import { useState } from "react";

interface ContactSettings { phone: string; email: string; address: string; mapUrl: string }

export function ContactSettingsForm({ initial, onSave }: { initial: ContactSettings; onSave: (data: ContactSettings) => Promise<void> }) {
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
      <div><label className="block text-sm font-medium mb-1">Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2" required /></div>
      <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-3 py-2" required /></div>
      <div><label className="block text-sm font-medium mb-1">Address</label><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={2} /></div>
      <div><label className="block text-sm font-medium mb-1">Google Maps URL</label><input type="url" value={form.mapUrl} onChange={(e) => setForm({ ...form, mapUrl: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
