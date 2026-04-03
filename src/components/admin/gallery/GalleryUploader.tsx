"use client";

import { useState, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";

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
    <Box>
      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => handleUpload(e.target.files)} />
      <Button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        borderRadius="lg"
        bg="amber.600"
        color="white"
        _hover={{ bg: "amber.700" }}
        _disabled={{ opacity: 0.5 }}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </Button>
    </Box>
  );
}
