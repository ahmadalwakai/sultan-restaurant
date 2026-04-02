"use client";

import { useRouter } from "next/navigation";

interface AdminUserBadgeProps {
  name: string;
  email: string;
}

export function AdminUserBadge({ name, email }: AdminUserBadgeProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/admin/logout", { method: "POST" });
    router.push("/admin/signin");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold text-sm">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="hidden md:block">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="text-xs text-gray-400 hover:text-red-500 ml-2"
      >
        Logout
      </button>
    </div>
  );
}
