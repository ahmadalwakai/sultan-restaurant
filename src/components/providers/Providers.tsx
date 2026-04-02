"use client";

import { ChakraAppProvider } from "./ChakraAppProvider";
import { QueryProvider } from "./QueryProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ChakraAppProvider>
        {children}
        <ToastProvider />
      </ChakraAppProvider>
    </QueryProvider>
  );
}
