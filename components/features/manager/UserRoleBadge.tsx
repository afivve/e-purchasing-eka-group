"use client";

import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const ROLE_CONFIG: Record<UserRole, { label: string; className: string }> = {
  admin_client: {
    label: "Admin Client",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  admin_gudang_client: {
    label: "Admin Gudang Client",
    className: "bg-teal-50 text-teal-700 border border-teal-200",
  },
  manajer_koperasi: {
    label: "Manajer Koperasi",
    className: "bg-violet-50 text-violet-700 border border-violet-200",
  },
  admin_koperasi: {
    label: "Admin Koperasi",
    className: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  admin_gudang: {
    label: "Admin Gudang",
    className: "bg-slate-100 text-slate-600 border border-slate-200",
  },
};

interface UserRoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function UserRoleBadge({ role, className }: UserRoleBadgeProps) {
  const config = ROLE_CONFIG[role];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

export { ROLE_CONFIG };
