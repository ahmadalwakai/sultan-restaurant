"use client";

import { useState, useRef } from "react";

export function GalleryUploader({ onUploaded }: { onUploaded: () => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/uploads", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, alt: file.name }) });
      }
    }
    setUploading(false);
    onUploaded();
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}
