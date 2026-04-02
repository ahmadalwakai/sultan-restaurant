"use client";

interface GalleryDragReorderProps {
  images: Array<{ id: string; url: string; order: number }>;
  onReorder: (orderedIds: string[]) => void;
}

export function GalleryDragReorder({ images, onReorder }: GalleryDragReorderProps) {
  const moveItem = (index: number, direction: "up" | "down") => {
    const sorted = [...images].sort((a, b) => a.order - b.order);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sorted.length) return;
    [sorted[index], sorted[newIndex]] = [sorted[newIndex], sorted[index]];
    onReorder(sorted.map((img) => img.id));
  };

  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-2">
      {sorted.map((img, i) => (
        <div key={img.id} className="flex items-center gap-3 p-2 bg-white border rounded-lg">
          <img src={img.url} alt="" className="w-12 h-12 object-cover rounded" />
          <span className="text-sm text-gray-500 flex-1">Position {i + 1}</span>
          <button onClick={() => moveItem(i, "up")} disabled={i === 0} className="px-2 py-1 text-xs border rounded disabled:opacity-30">↑</button>
          <button onClick={() => moveItem(i, "down")} disabled={i === sorted.length - 1} className="px-2 py-1 text-xs border rounded disabled:opacity-30">↓</button>
        </div>
      ))}
    </div>
  );
}
