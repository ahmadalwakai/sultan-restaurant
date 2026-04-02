"use client";

import { useState } from "react";

interface SocialLinks { facebook: string; instagram: string; twitter: string; tiktok: string; youtube: string }

export function SocialLinksForm({ initial, onSave }: { initial: SocialLinks; onSave: (data: SocialLinks) => Promise<void> }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const fields: Array<{ key: keyof SocialLinks; label: string; placeholder: string }> = [
    { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
    { key: "twitter", label: "Twitter / X", placeholder: "https://x.com/..." },
    { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@..." },
    { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-sm font-medium mb-1">{f.label}</label>
          <input value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className="w-full border rounded-lg px-3 py-2" />
        </div>
      ))}
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
