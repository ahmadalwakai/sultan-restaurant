"use client";

import { useState, useEffect } from "react";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">SEO Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-3">Pages</h3>
                <div className="space-y-1">
                  {PAGES.map((p) => (
                    <button key={p} onClick={() => setSelectedPage(p)} className={`w-full text-left px-3 py-2 rounded text-sm capitalize ${selectedPage === p ? "bg-amber-50 text-amber-700 font-medium" : "hover:bg-gray-50"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3 bg-white border rounded-lg p-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input value={seo.title ?? ""} onChange={(e) => setSeo((p) => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea value={seo.description ?? ""} onChange={(e) => setSeo((p) => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Keywords</label>
                    <input value={seo.keywords ?? ""} onChange={(e) => setSeo((p) => ({ ...p, keywords: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Comma separated" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Preview</p>
                    <p className="text-blue-700 text-sm font-medium">{seo.title || "Page Title"}</p>
                    <p className="text-green-700 text-xs">sultanrestaurant.com/{selectedPage === "global" ? "" : selectedPage}</p>
                    <p className="text-gray-600 text-xs mt-1">{seo.description || "Page description will appear here"}</p>
                  </div>
                  <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">
                    {saving ? "Saving..." : "Save SEO"}
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
