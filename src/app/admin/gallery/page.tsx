"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { adminLayout, adminSpacing } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<Array<{ id: string; url: string; alt: string; sortOrder: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setImages(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const uploadRes = await fetch("/api/admin/uploads", { method: "POST", body: fd });
    const uploadData = await uploadRes.json();
    if (uploadData.success) {
      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: uploadData.data.url, alt: file.name, sortOrder: images.length }),
      });
      fetchImages();
    }
    setUploading(false);
  }

  async function deleteImage(id: string) {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    fetchImages();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.gallery.title} description={adminHeadings.gallery.description} />

        <div style={{ marginBottom: adminSpacing.stack }}>
          <label style={{ ...adminLayout.primaryBtn, display: "inline-flex", alignItems: "center", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>
            {uploading ? "Uploading..." : "+ Upload Image"}
            <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} disabled={uploading} />
          </label>
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))", gap: adminSpacing.grid }}>
            {[...Array(8)].map((_, i) => <div key={i} style={{ aspectRatio: "1", background: "#F3F4F6", borderRadius: "0.5rem" }} />)}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))", gap: adminSpacing.grid }}>
            {images.map((img) => (
              <div key={img.id} style={{ position: "relative", borderRadius: "0.5rem", overflow: "hidden" }} className="admin-gallery-item">
                <img src={img.url} alt={img.alt} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
                <button
                  onClick={() => deleteImage(img.id)}
                  style={{ position: "absolute", top: "0.5rem", right: "0.5rem", width: "2rem", height: "2rem", background: "#EF4444", color: "#FFFFFF", border: "none", borderRadius: "50%", cursor: "pointer", fontSize: "0.875rem", opacity: 0, transition: "opacity 0.15s" }}
                  className="admin-gallery-delete"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <style>{`
          .admin-gallery-item:hover .admin-gallery-delete { opacity: 1 !important; }
        `}</style>
      </AdminPageShell>
    </AdminShell>
  );
}
