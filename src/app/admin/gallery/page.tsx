"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Gallery" />
            <div className="mb-6">
              <label className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer text-sm">
                {uploading ? "Uploading..." : "+ Upload Image"}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />)}</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img src={img.url} alt={img.alt} className="w-full aspect-square object-cover rounded-lg" />
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
