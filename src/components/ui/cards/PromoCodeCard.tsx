"use client";

import { useState } from "react";

interface PromoCodeCardProps {
  code: string;
  description: string;
  discount: string;
  expiresAt?: string;
}

export function PromoCodeCard({ code, description, discount, expiresAt }: PromoCodeCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-dashed border-amber-300 bg-amber-50">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">{discount}</span>
          {expiresAt && (
            <span className="text-xs text-gray-400">
              Expires {new Date(expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex items-center justify-between border-t border-dashed border-amber-300 bg-white px-4 py-3">
        <span className="font-mono text-sm font-bold tracking-wider text-gray-800">{code}</span>
        <button
          onClick={handleCopy}
          className="rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
