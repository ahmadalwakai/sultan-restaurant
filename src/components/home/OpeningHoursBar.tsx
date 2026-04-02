"use client";

import { useOpeningHours } from "@/hooks/api";

export function OpeningHoursBar() {
  const { data: hours } = useOpeningHours();

  const today = new Date().getDay();
  const todayHours = hours?.find((h) => h.dayOfWeek === today);

  if (!todayHours) return null;

  return (
    <div className="bg-gray-900 py-2 text-center text-sm text-gray-300">
      {todayHours.isClosed ? (
        <span>We are closed today</span>
      ) : (
        <span>
          Open today: {todayHours.openTime} &ndash; {todayHours.closeTime}
        </span>
      )}
    </div>
  );
}
