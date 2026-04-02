"use client";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/common";

export function useAdminUpload() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json: ApiResponse<{ url: string }> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
