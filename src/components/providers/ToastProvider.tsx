"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "0.75rem",
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
}
