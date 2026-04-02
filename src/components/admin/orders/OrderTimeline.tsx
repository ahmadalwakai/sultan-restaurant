"use client";

const STEPS = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"];

export function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIndex = STEPS.indexOf(currentStatus);
  const isCancelled = currentStatus === "CANCELLED";

  if (isCancelled) {
    return <div className="text-center py-4"><span className="text-red-600 font-medium">Order Cancelled</span></div>;
  }

  return (
    <div className="flex items-center gap-1">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${i <= currentIndex ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-400"}`}>
            {i + 1}
          </div>
          <div className="flex-1 text-center">
            <p className={`text-xs ${i <= currentIndex ? "text-amber-600 font-medium" : "text-gray-400"}`}>{step}</p>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 ${i < currentIndex ? "bg-amber-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
