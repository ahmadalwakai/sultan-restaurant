"use client";

import { useState } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";

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
    <Box>
      {currentImage && <chakra.img src={currentImage} alt="" w={32} h={32} objectFit="cover" rounded="lg" mb={2} />}
      <Text as="label" display="inline-flex" alignItems="center" px={3} py={2} bg="gray.100" rounded="lg" cursor="pointer" _hover={{ bg: "gray.200" }} fontSize="sm">
        {uploading ? "Uploading..." : currentImage ? "Change Image" : "Upload Image"}
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" disabled={uploading} />
      </Text>
    </Box>
  );
}
