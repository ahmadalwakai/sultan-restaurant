"use client";

import { AdminSignInForm } from "@/components/admin/auth/AdminSignInForm";

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sultan Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your restaurant</p>
        </div>
        <AdminSignInForm />
      </div>
    </div>
  );
}
