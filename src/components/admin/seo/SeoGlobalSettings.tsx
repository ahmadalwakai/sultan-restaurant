"use client";

import { useState } from "react";

interface GlobalSeo { siteName: string; defaultTitle: string; titleTemplate: string; defaultDescription: string; defaultOgImage: string }

export function SeoGlobalSettings({ initial, onSave }: { initial: GlobalSeo; onSave: (data: GlobalSeo) => Promise<void> }) {
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
      <div><label className="block text-sm font-medium mb-1">Site Name</label><input value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <div><label className="block text-sm font-medium mb-1">Default Title</label><input value={form.defaultTitle} onChange={(e) => setForm({ ...form, defaultTitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <div><label className="block text-sm font-medium mb-1">Title Template</label><input value={form.titleTemplate} onChange={(e) => setForm({ ...form, titleTemplate: e.target.value })} placeholder="%s | Sultan" className="w-full border rounded-lg px-3 py-2" /></div>
      <div><label className="block text-sm font-medium mb-1">Default Description</label><textarea value={form.defaultDescription} onChange={(e) => setForm({ ...form, defaultDescription: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} /></div>
      <div><label className="block text-sm font-medium mb-1">Default OG Image</label><input value={form.defaultOgImage} onChange={(e) => setForm({ ...form, defaultOgImage: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save Global SEO"}</button>
    </form>
  );
}
