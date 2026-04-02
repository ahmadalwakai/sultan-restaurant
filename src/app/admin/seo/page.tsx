"use client";

import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminFormStyles, adminLayout, adminSpacing } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";
import { brandColors } from "@/theme/branding";

const PAGES = ["global", "home", "menu", "about", "contact", "booking", "offers", "gallery"];

export default function AdminSeoPage() {
  const [selectedPage, setSelectedPage] = useState("global");
  const [seo, setSeo] = useState<{ title?: string; description?: string; keywords?: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const endpoint = selectedPage === "global" ? "global" : selectedPage;
    fetch(`/api/admin/seo/${endpoint}`).then((r) => r.json()).then((d) => setSeo(d.data ?? {}));
  }, [selectedPage]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const endpoint = selectedPage === "global" ? "global" : selectedPage;
    await fetch(`/api/admin/seo/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seo),
    });
    setSaving(false);
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.seo.title} description={adminHeadings.seo.description} />

        <div style={{ display: "grid", gridTemplateColumns: "12rem 1fr", gap: adminSpacing.grid }} className="admin-seo-grid">
          {/* Page selector */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>Pages</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {PAGES.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPage(p)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    border: "none",
                    cursor: "pointer",
                    background: selectedPage === p ? brandColors.gold[50] : "transparent",
                    color: selectedPage === p ? brandColors.gold[700] : "#374151",
                    fontWeight: selectedPage === p ? 500 : 400,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={adminFormStyles.label}>Title</label>
                <input value={seo.title ?? ""} onChange={(e) => setSeo((p) => ({ ...p, title: e.target.value }))} style={adminFormStyles.input} onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label style={adminFormStyles.label}>Description</label>
                <textarea value={seo.description ?? ""} onChange={(e) => setSeo((p) => ({ ...p, description: e.target.value }))} rows={3} style={adminFormStyles.textarea} onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label style={adminFormStyles.label}>Keywords</label>
                <input value={seo.keywords ?? ""} onChange={(e) => setSeo((p) => ({ ...p, keywords: e.target.value }))} style={adminFormStyles.input} placeholder="Comma separated" onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              {/* Preview */}
              <div style={{ background: "#F9FAFB", borderRadius: "0.5rem", padding: "1rem" }}>
                <p style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "0.25rem" }}>Preview</p>
                <p style={{ color: "#1D4ED8", fontSize: "0.875rem", fontWeight: 500 }}>{seo.title || "Page Title"}</p>
                <p style={{ color: "#15803D", fontSize: "0.75rem" }}>sultanrestaurant.com/{selectedPage === "global" ? "" : selectedPage}</p>
                <p style={{ color: "#4B5563", fontSize: "0.75rem", marginTop: "0.25rem" }}>{seo.description || "Page description will appear here"}</p>
              </div>
              <div>
                <button type="submit" disabled={saving} style={{ ...adminLayout.primaryBtn, padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, opacity: saving ? 0.5 : 1 }}>
                  {saving ? "Saving..." : "Save SEO"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .admin-seo-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </AdminPageShell>
    </AdminShell>
  );
}
