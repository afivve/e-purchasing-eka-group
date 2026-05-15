"use client";

import { Truck, ToggleLeft, ToggleRight, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Armada } from "@/types";

interface ArmadaCardProps {
  armada: Armada;
  onToggleActive: (id: string) => void;
  onEdit: (id: string) => void;
}

export function ArmadaCard({
  armada,
  onToggleActive,
  onEdit,
}: ArmadaCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border p-4 flex items-center gap-3 transition-opacity",
        !armada.isActive && "opacity-50",
      )}
    >
      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center">
        <Truck size={18} className="text-sky-600" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 tracking-wide">
          {armada.platNo}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {armada.merk ? `${armada.merk} · ` : ""}
          {armada.jenis}
        </p>
        <span
          className={cn(
            "inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium",
            armada.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500",
          )}
        >
          {armada.isActive ? "Aktif" : "Tidak Aktif"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(armada.id)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          aria-label="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onToggleActive(armada.id)}
          className={cn(
            "p-2 rounded-full transition-colors",
            armada.isActive
              ? "text-sky-600 hover:bg-sky-50"
              : "text-gray-400 hover:bg-gray-100",
          )}
          aria-label={armada.isActive ? "Nonaktifkan" : "Aktifkan"}
        >
          {armada.isActive ? (
            <ToggleRight size={22} />
          ) : (
            <ToggleLeft size={22} />
          )}
        </button>
      </div>
    </div>
  );
}
