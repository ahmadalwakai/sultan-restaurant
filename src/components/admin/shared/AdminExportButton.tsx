"use client";

interface AdminExportButtonProps {
  href: string;
  label?: string;
}

export function AdminExportButton({ href, label = "Export CSV" }: AdminExportButtonProps) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      📥 {label}
    </a>
  );
}
