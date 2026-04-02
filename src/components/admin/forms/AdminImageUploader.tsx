"use client";

import { useRef, useState } from "react";
import { brandColors, brandRadii } from "@/theme/branding";

interface AdminImageUploaderProps {
  currentImage?: string | null;
  onUpload: (file: File) => void;
}

export function AdminImageUploader({ currentImage, onUpload }: AdminImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onUpload(file);
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          width: "8rem",
          height: "8rem",
          borderRadius: brandRadii.lg,
          border: `2px dashed ${brandColors.gold[200]}`,
          background: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",
          transition: "border-color 0.15s",
        }}
        className="admin-img-upload"
      >
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: "0.8125rem", color: "#9CA3AF", textAlign: "center", padding: "0.5rem" }}>
            Click to upload
          </span>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }} />

      <style>{`
        .admin-img-upload:hover { border-color: ${brandColors.gold[400]} !important; }
      `}</style>
    </div>
  );
}
