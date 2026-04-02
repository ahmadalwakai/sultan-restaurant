"use client";

export function SeoPreview({ title, description, url }: { title: string; description: string; url?: string }) {
  return (
    <div className="bg-white border rounded-lg p-4 max-w-xl">
      <p className="text-xs text-gray-400 mb-2">Google Search Preview</p>
      <div className="space-y-1">
        <p className="text-blue-700 text-lg leading-snug cursor-pointer hover:underline truncate">
          {title || "Page Title"}
        </p>
        <p className="text-green-700 text-sm truncate">{url || "https://sultanrestaurant.co.uk"}</p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {description || "No description set. Add a meta description to improve SEO."}
        </p>
      </div>
    </div>
  );
}
