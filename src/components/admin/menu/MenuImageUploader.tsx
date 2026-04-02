"use client";

import { useState } from "react";

interface MenuImageUploaderProps {
  currentImage?: string | null;
  onUpload: (url: string) => void;
}

export function MenuImageUploader({ currentImage, onUpload }: MenuImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/uploads", { method: "POST", body: fd });
    const data = await res.json();
    if (data.success) onUpload(data.data.url);
    setUploading(false);
  }

  return (
    <div className="space-y-2">
      {currentImage && <img src={currentImage} alt="" className="w-32 h-32 object-cover rounded-lg" />}
      <label className="inline-flex items-center px-3 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-sm">
        {uploading ? "Uploading..." : currentImage ? "Change Image" : "Upload Image"}
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" disabled={uploading} />
      </label>
    </div>
  );
}
