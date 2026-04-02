import { useMutation } from "@tanstack/react-query";
import type { ContactFormValues } from "@/lib/validators";
import type { ApiResponse } from "@/types/common";

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApiResponse<{ id: string }> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
