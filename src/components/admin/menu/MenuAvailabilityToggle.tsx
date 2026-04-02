"use client";

interface MenuAvailabilityToggleProps {
  isAvailable: boolean;
  onToggle: () => void;
}

export function MenuAvailabilityToggle({ isAvailable, onToggle }: MenuAvailabilityToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAvailable ? "bg-green-500" : "bg-gray-300"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
