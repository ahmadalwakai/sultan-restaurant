"use client";

import { useState } from "react";

interface Partner { name: string; url: string; logoUrl: string }

export function DeliveryPartnersForm({ initial, onSave }: { initial: Partner[]; onSave: (data: Partner[]) => Promise<void> }) {
  const [partners, setPartners] = useState<Partner[]>(initial.length ? initial : []);
  const [saving, setSaving] = useState(false);

  const update = (index: number, field: keyof Partner, value: string) => {
    const updated = [...partners];
    updated[index] = { ...updated[index], [field]: value };
    setPartners(updated);
  };

  const addPartner = () => setPartners([...partners, { name: "", url: "", logoUrl: "" }]);
  const removePartner = (index: number) => setPartners(partners.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(partners);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {partners.map((p, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Partner {i + 1}</span>
            <button type="button" onClick={() => removePartner(i)} className="text-xs text-red-600 hover:underline">Remove</button>
          </div>
          <input value={p.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Name" className="w-full border rounded px-3 py-2 text-sm" />
          <input value={p.url} onChange={(e) => update(i, "url", e.target.value)} placeholder="Website URL" className="w-full border rounded px-3 py-2 text-sm" />
          <input value={p.logoUrl} onChange={(e) => update(i, "logoUrl", e.target.value)} placeholder="Logo URL" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
      ))}
      <button type="button" onClick={addPartner} className="text-sm text-amber-600 hover:underline">+ Add Partner</button>
      <div><button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : "Save Partners"}</button></div>
    </form>
  );
}
