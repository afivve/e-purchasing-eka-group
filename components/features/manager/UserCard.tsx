"use client";

import { Phone, Pencil, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRoleBadge } from "./UserRoleBadge";
import type { AppUser } from "@/types";

interface UserCardProps {
  user: AppUser;
  clientName: string;
  onEdit: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export function UserCard({
  user,
  clientName,
  onEdit,
  onToggleActive,
}: UserCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-3",
        user.isActive ? "border-slate-200" : "border-slate-100 opacity-70",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-slate-800 leading-tight">
              {user.name}
            </p>
            {!user.isActive && (
              <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
                Nonaktif
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-slate-500 truncate">{user.email}</p>
        </div>
        <UserRoleBadge role={user.role} />
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
        {user.phone && (
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {user.phone}
          </span>
        )}
        {user.clientId && (
          <span className="truncate text-slate-400">{clientName}</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(user.id)}
          className="flex h-8 min-w-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition-transform"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
        <button
          onClick={() => onToggleActive(user.id)}
          className={cn(
            "flex h-8 min-w-11 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium active:scale-95 transition-transform",
            user.isActive
              ? "border border-red-100 text-red-500 hover:bg-red-50"
              : "border border-emerald-200 text-emerald-600 hover:bg-emerald-50",
          )}
        >
          <Power className="h-3 w-3" />
          {user.isActive ? "Nonaktifkan" : "Aktifkan"}
        </button>
      </div>
    </div>
  );
}
