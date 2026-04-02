"use client";

interface MenuDragReorderProps {
  items: Array<{ id: string; name: string; sortOrder: number }>;
  onReorder: (items: Array<{ id: string; sortOrder: number }>) => void;
}

export function MenuDragReorder({ items, onReorder }: MenuDragReorderProps) {
  function moveUp(index: number) {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    onReorder(newItems.map((item, i) => ({ id: item.id, sortOrder: i })));
  }

  function moveDown(index: number) {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    onReorder(newItems.map((item, i) => ({ id: item.id, sortOrder: i })));
  }

  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <div key={item.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
          <div className="flex flex-col gap-1">
            <button onClick={() => moveUp(i)} disabled={i === 0} className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30">▲</button>
            <button onClick={() => moveDown(i)} disabled={i === items.length - 1} className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30">▼</button>
          </div>
          <span className="text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
