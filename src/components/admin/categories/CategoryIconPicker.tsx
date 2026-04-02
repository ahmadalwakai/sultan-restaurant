"use client";

const ICONS = ["🍛", "🍔", "🍕", "🌮", "🍣", "🥗", "🍰", "☕", "🍷", "🍺", "🥤", "🍜"];

interface CategoryIconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
}

export function CategoryIconPicker({ value, onChange }: CategoryIconPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ICONS.map((icon) => (
        <button
          key={icon}
          type="button"
          onClick={() => onChange(icon)}
          className={`w-10 h-10 text-xl rounded-lg border-2 flex items-center justify-center ${value === icon ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
