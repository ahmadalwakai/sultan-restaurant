"use client";

interface SeoPage { pageSlug: string; title: string; description?: string }

export function SeoPagesList({ pages, activeSlug, onSelect }: { pages: SeoPage[]; activeSlug: string; onSelect: (slug: string) => void }) {
  return (
    <nav className="space-y-1">
      {pages.map((page) => (
        <button
          key={page.pageSlug}
          onClick={() => onSelect(page.pageSlug)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            activeSlug === page.pageSlug ? "bg-amber-50 text-amber-700 font-medium" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span className="block">{page.title || page.pageSlug}</span>
          {page.description && <span className="block text-xs text-gray-400 truncate">{page.description}</span>}
        </button>
      ))}
    </nav>
  );
}
