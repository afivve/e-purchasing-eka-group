"use client";

import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Belum ada menu",
  description = "Tambah menu harian untuk paket ini.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 px-4 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
        <PackageOpen size={22} className="text-slate-400" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <p className="text-xs text-slate-400 max-w-55">{description}</p>
      </div>
      {action}
    </div>
  );
}
