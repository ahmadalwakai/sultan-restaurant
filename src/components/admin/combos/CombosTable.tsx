"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format-currency";

interface ComboRow {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  savings: number;
  image?: string | null;
  isActive: boolean;
  servesCount: number;
}

interface CombosTableProps {
  combos: ComboRow[];
  onDelete: (id: string) => void;
}

export function CombosTable({ combos, onDelete }: CombosTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Combo</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Savings</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Serves</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {combos.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="flex items-center gap-3 px-4 py-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  {c.image ? (
                    <Image src={c.image} alt={c.name} fill className="object-cover" sizes="40px" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-amber-50 text-lg">🍱</div>
                  )}
                </div>
                <span className="text-sm font-medium">{c.name}</span>
              </td>
              <td className="px-4 py-3 text-sm">{formatCurrency(c.price)}</td>
              <td className="px-4 py-3 text-sm text-green-600">Save {formatCurrency(c.savings)}</td>
              <td className="px-4 py-3 text-sm">{c.servesCount}</td>
              <td className="px-4 py-3">
                <span className={`rounded px-2 py-1 text-xs ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {c.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <Link href={`/admin/combos/${c.id}/edit`} className="text-sm text-amber-600 hover:underline">Edit</Link>
                <button onClick={() => onDelete(c.id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
