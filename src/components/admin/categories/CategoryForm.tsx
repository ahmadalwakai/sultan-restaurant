"use client";

interface CategoryFormProps {
  initialData?: { name?: string; description?: string; image?: string };
  onSubmit: (data: Record<string, unknown>) => void;
}

export function AdminCategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({ name: fd.get("name"), description: fd.get("description"), image: fd.get("image") || undefined });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label className="block text-sm font-medium mb-1">Name</label><input name="name" defaultValue={initialData?.name ?? ""} required className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium mb-1">Description</label><textarea name="description" defaultValue={initialData?.description ?? ""} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium mb-1">Image URL (optional)</label><input name="image" defaultValue={initialData?.image ?? ""} className="w-full px-3 py-2 border rounded-lg" /></div>
      <button type="submit" className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">Save</button>
    </form>
  );
}
