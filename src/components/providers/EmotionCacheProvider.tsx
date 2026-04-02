"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useState } from "react";

export function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: "chakra" });
    cache.compat = true;
    return cache;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
