"use client";

interface MenuCategoryHeaderProps {
  name: string;
  description?: string;
  itemCount: number;
}

export default function MenuCategoryHeader({ name, description, itemCount }: MenuCategoryHeaderProps) {
  return (
    <div className="mb-4 border-b border-gray-100 pb-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        <span className="text-sm text-gray-400">{itemCount} items</span>
      </div>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
}
