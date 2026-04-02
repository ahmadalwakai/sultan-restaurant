"use client";

interface MessageDetailProps {
  message: { id: string; name: string; email: string; phone?: string | null; subject: string; message: string; createdAt: string };
  onDelete: (id: string) => void;
}

export function MessageDetail({ message, onDelete }: MessageDetailProps) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{message.subject}</h3>
          <p className="text-sm text-gray-500">From {message.name} &lt;{message.email}&gt;</p>
          {message.phone && <p className="text-sm text-gray-400">{message.phone}</p>}
          <p className="text-xs text-gray-400 mt-1">{new Date(message.createdAt).toLocaleString()}</p>
        </div>
        <button onClick={() => onDelete(message.id)} className="text-sm text-red-600 hover:underline">Delete</button>
      </div>
      <div className="border-t pt-4 text-sm text-gray-700 whitespace-pre-wrap">{message.message}</div>
    </div>
  );
}
