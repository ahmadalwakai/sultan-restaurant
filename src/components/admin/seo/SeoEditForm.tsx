"use client";

import { useState } from "react";

interface SeoData { pageSlug: string; title: string; description: string; keywords: string; ogImageUrl: string }

export function SeoEditForm({ initial, onSave }: { initial: SeoData; onSave: (data: SeoData) => Promise<void> }) {
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
      <div>
        <label className="block text-sm font-medium mb-1">Page</label>
        <input value={form.pageSlug} disabled className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-500" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-3 py-2" maxLength={60} />
        <p className="text-xs text-gray-400 mt-1">{form.title.length}/60 characters</p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} maxLength={160} />
        <p className="text-xs text-gray-400 mt-1">{form.description.length}/160 characters</p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Keywords (comma-separated)</label>
        <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">OG Image URL</label>
        <input value={form.ogImageUrl} onChange={(e) => setForm({ ...form, ogImageUrl: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
      </div>
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save SEO"}</button>
    </form>
  );
}
