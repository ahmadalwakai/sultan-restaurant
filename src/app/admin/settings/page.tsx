"use client";

import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminFormStyles, adminLayout, adminSpacing } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";
import { brandColors } from "@/theme/branding";

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
    if (tab === "Delivery Partners") return <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>Delivery partners management coming soon.</p>;

    const fields: Record<string, string[]> = {
      General: ["siteName", "tagline", "description"],
      Contact: ["phone", "email", "address", "city", "postcode"],
      "Social Links": ["facebook", "instagram", "twitter", "youtube", "tiktok"],
      Homepage: ["heroTitle", "heroSubtitle", "heroCtaText"],
    };

    return (
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "36rem" }}>
        {(fields[tab] ?? []).map((key) => (
          <div key={key}>
            <label style={adminFormStyles.label}>{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              value={settings[key] ?? ""}
              onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
              style={adminFormStyles.input}
              onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        ))}
        <div>
          <button type="submit" disabled={saving} style={{ ...adminLayout.primaryBtn, padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, opacity: saving ? 0.5 : 1 }}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    );
  }

  const tabBarStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.25rem",
    borderBottom: "1px solid #E5E7EB",
    marginBottom: adminSpacing.stack,
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    background: "none",
    border: "none",
    borderBottom: active ? `2px solid ${brandColors.gold[500]}` : "2px solid transparent",
    color: active ? brandColors.gold[600] : "#6B7280",
    cursor: "pointer",
    marginBottom: "-1px",
  });

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.settings.title} description={adminHeadings.settings.description} />

        <div style={tabBarStyle}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={tabStyle(tab === t)}>{t}</button>
          ))}
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
          {renderForm()}
        </div>
      </AdminPageShell>
    </AdminShell>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "36rem" }}>
      {hours.map((h, i) => (
        <div key={h.dayOfWeek} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ width: "6rem", fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>{days[h.dayOfWeek]}</span>
          <label style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", color: "#374151" }}>
            <input type="checkbox" checked={!h.isClosed} onChange={(e) => { const next = [...hours]; next[i] = { ...h, isClosed: !e.target.checked }; setHours(next); }} />
            Open
          </label>
          {!h.isClosed && (
            <>
              <input type="time" value={h.openTime} onChange={(e) => { const next = [...hours]; next[i] = { ...h, openTime: e.target.value }; setHours(next); }} style={{ ...adminFormStyles.input, width: "auto", padding: "0.25rem 0.5rem" }} />
              <span style={{ color: "#6B7280" }}>-</span>
              <input type="time" value={h.closeTime} onChange={(e) => { const next = [...hours]; next[i] = { ...h, closeTime: e.target.value }; setHours(next); }} style={{ ...adminFormStyles.input, width: "auto", padding: "0.25rem 0.5rem" }} />
            </>
          )}
        </div>
      ))}
      <div>
        <button onClick={handleSave} disabled={saving} style={{ ...adminLayout.primaryBtn, padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, opacity: saving ? 0.5 : 1 }}>
          {saving ? "Saving..." : "Save Hours"}
        </button>
      </div>
    </div>
  );
}
