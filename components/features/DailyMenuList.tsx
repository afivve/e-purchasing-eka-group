"use client";

import { MenuCard } from "@/components/features/MenuCard";
import { EmptyState } from "@/components/features/EmptyState";
import type { DailyMenu } from "@/types";

interface DailyMenuListProps {
  menus: DailyMenu[];
  isLoading: boolean;
  onEdit: (menu: DailyMenu) => void;
  onDelete: (menuId: string) => void;
  onAdd: () => void;
}

function MenuSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-20 rounded bg-slate-100" />
        <div className="h-5 w-16 rounded-full bg-slate-100" />
      </div>
      <div className="h-4 w-3/4 rounded bg-slate-100 mb-2" />
      <div className="h-3 w-1/3 rounded bg-slate-100 mb-3" />
      <div className="h-1 w-full rounded-full bg-slate-100" />
    </div>
  );
}

export function DailyMenuList({
  menus,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}: DailyMenuListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <MenuSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <EmptyState
        title="Belum ada menu harian"
        description="Tambah menu harian pertama untuk paket ini menggunakan tombol di bawah."
        action={
          <button
            onClick={onAdd}
            className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors active:scale-95"
          >
            Tambah Menu
          </button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {menus.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {/* Bottom padding for FAB clearance */}
      <div className="h-2" />
    </div>
  );
}
