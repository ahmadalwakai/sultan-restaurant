"use client";

import { useState, useEffect } from "react";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

const TABS = ["General", "Contact", "Social Links", "Opening Hours", "Homepage", "Delivery Partners"] as const;

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("General");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const endpoints: Record<string, string> = {
    General: "general",
    Contact: "contact",
    "Social Links": "social-links",
    Homepage: "homepage",
  };

  useEffect(() => {
    if (tab === "Opening Hours" || tab === "Delivery Partners") return;
    const endpoint = endpoints[tab];
    if (!endpoint) return;
    fetch(`/api/admin/settings/${endpoint}`).then((r) => r.json()).then((d) => setSettings(d.data ?? {}));
  }, [tab]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const endpoint = endpoints[tab];
    await fetch(`/api/admin/settings/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
  }

  function renderForm() {
    if (tab === "Opening Hours") return <OpeningHoursTab />;
    if (tab === "Delivery Partners") return <p className="text-sm text-gray-500">Delivery partners management coming soon.</p>;

    const fields: Record<string, string[]> = {
      General: ["siteName", "tagline", "description"],
      Contact: ["phone", "email", "address", "city", "postcode"],
      "Social Links": ["facebook", "instagram", "twitter", "youtube", "tiktok"],
      Homepage: ["heroTitle", "heroSubtitle", "heroCtaText"],
    };

    return (
      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        {(fields[tab] ?? []).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              value={settings[key] ?? ""}
              onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        ))}
        <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    );
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            <div className="flex gap-2 mb-6 border-b">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === t ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="bg-white border rounded-lg p-6">
              {renderForm()}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}

function OpeningHoursTab() {
  const [hours, setHours] = useState<Array<{ dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }>>([]);
  const [saving, setSaving] = useState(false);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    fetch("/api/admin/settings/opening-hours").then((r) => r.json()).then((d) => {
      if (d.data?.length) setHours(d.data);
      else setHours(days.map((_, i) => ({ dayOfWeek: i, openTime: "11:00", closeTime: "22:00", isClosed: false })));
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/settings/opening-hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hours),
    });
    setSaving(false);
  }

  return (
    <div className="space-y-3 max-w-xl">
      {hours.map((h, i) => (
        <div key={h.dayOfWeek} className="flex items-center gap-3">
          <span className="w-24 text-sm font-medium">{days[h.dayOfWeek]}</span>
          <label className="flex items-center gap-1 text-sm">
            <input type="checkbox" checked={!h.isClosed} onChange={(e) => { const next = [...hours]; next[i] = { ...h, isClosed: !e.target.checked }; setHours(next); }} />
            Open
          </label>
          {!h.isClosed && (
            <>
              <input type="time" value={h.openTime} onChange={(e) => { const next = [...hours]; next[i] = { ...h, openTime: e.target.value }; setHours(next); }} className="px-2 py-1 border rounded text-sm" />
              <span>-</span>
              <input type="time" value={h.closeTime} onChange={(e) => { const next = [...hours]; next[i] = { ...h, closeTime: e.target.value }; setHours(next); }} className="px-2 py-1 border rounded text-sm" />
            </>
          )}
        </div>
      ))}
      <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">
        {saving ? "Saving..." : "Save Hours"}
      </button>
    </div>
  );
}
