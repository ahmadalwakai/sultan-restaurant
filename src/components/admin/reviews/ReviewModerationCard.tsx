"use client";

interface ReviewModerationCardProps {
  review: { id: string; userName: string; rating: number; comment: string; status: string; createdAt: string };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ReviewModerationCard({ review, onApprove, onReject, onDelete }: ReviewModerationCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{review.userName}</p>
          <p className="text-amber-500 text-sm">{"\u2605".repeat(review.rating)}{"\u2606".repeat(5 - review.rating)}</p>
        </div>
        <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-sm text-gray-700">{review.comment}</p>
      <div className="flex gap-2 pt-2 border-t">
        {review.status !== "APPROVED" && <button onClick={() => onApprove(review.id)} className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100">Approve</button>}
        {review.status !== "REJECTED" && <button onClick={() => onReject(review.id)} className="text-xs px-3 py-1 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100">Reject</button>}
        <button onClick={() => onDelete(review.id)} className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 ml-auto">Delete</button>
      </div>
    </div>
  );
}
