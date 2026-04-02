"use client";

interface CategoryDragReorderProps {
  categories: Array<{ id: string; name: string; sortOrder: number }>;
  onReorder: (items: Array<{ id: string; sortOrder: number }>) => void;
}

export function CategoryDragReorder({ categories, onReorder }: CategoryDragReorderProps) {
  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...categories];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onReorder(next.map((c, idx) => ({ id: c.id, sortOrder: idx })));
  }
  function moveDown(i: number) {
    if (i === categories.length - 1) return;
    const next = [...categories];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onReorder(next.map((c, idx) => ({ id: c.id, sortOrder: idx })));
  }

  return (
    <div className="space-y-1">
      {categories.map((c, i) => (
        <div key={c.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
          <div className="flex flex-col gap-1">
            <button onClick={() => moveUp(i)} disabled={i === 0} className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30">▲</button>
            <button onClick={() => moveDown(i)} disabled={i === categories.length - 1} className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30">▼</button>
          </div>
          <span className="text-sm font-medium">{c.name}</span>
        </div>
      ))}
    </div>
  );
}
