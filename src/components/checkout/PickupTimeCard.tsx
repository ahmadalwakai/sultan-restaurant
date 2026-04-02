"use client";

interface PickupTimeCardProps {
  time: string;
  label: string;
  selected: boolean;
  onSelect: (time: string) => void;
  available?: boolean;
}

export function PickupTimeCard({ time, label, selected, onSelect, available = true }: PickupTimeCardProps) {
  return (
    <button
      onClick={() => available && onSelect(time)}
      disabled={!available}
      className={`rounded-lg border-2 px-4 py-3 text-center transition-all ${
        !available
          ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
          : selected
          ? "border-amber-500 bg-amber-50 text-amber-700"
          : "border-gray-100 bg-white text-gray-700 hover:border-gray-200"
      }`}
    >
      <p className={`text-sm font-semibold ${selected ? "text-amber-700" : ""}`}>{label}</p>
      {!available && <p className="text-xs text-gray-300">Unavailable</p>}
    </button>
  );
}
