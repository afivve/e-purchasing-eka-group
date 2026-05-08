"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Lock,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { cn, formatShortDate, isMenuLocked } from "@/lib/utils";
import { ProgressStatus } from "@/components/features/ProgressStatus";
import type { DailyMenu } from "@/types";

interface MenuCardProps {
  menu: DailyMenu;
  onEdit: (menu: DailyMenu) => void;
  onDelete: (menuId: string) => void;
}

export function MenuCard({ menu, onEdit, onDelete }: MenuCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const locked = isMenuLocked(menu.deliveryDate);

  return (
    <div
      className={cn(
        "rounded-xl border bg-white transition-shadow",
        locked ? "border-slate-200" : "border-slate-200 hover:border-slate-300",
        isExpanded && "shadow-sm",
      )}
    >
      {/* Card header – always visible */}
      <div
        className="flex flex-col gap-2 p-3 cursor-pointer select-none"
        onClick={() => setIsExpanded((v) => !v)}
      >
        {/* Top row: date, status badge, actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {formatShortDate(menu.deliveryDate)}
            </span>
            {locked && (
              <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-white">
                <Lock size={9} />
                Terkunci
              </span>
            )}
          </div>

          <div
            className="flex items-center gap-1 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Actions menu */}
            <div className="relative">
              <button
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                onClick={() => setShowActions((v) => !v)}
                aria-label="Aksi menu"
              >
                <MoreVertical size={15} />
              </button>

              {showActions && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowActions(false)}
                  />
                  <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                    {/* Edit */}
                    {locked ? (
                      <div className="group relative flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 cursor-not-allowed">
                        <Pencil size={14} />
                        <span>Edit</span>
                        <div className="absolute bottom-full right-0 mb-1 w-48 rounded-lg bg-slate-800 px-2.5 py-1.5 text-[11px] text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                          Perubahan hanya diperbolehkan maksimal H-1
                        </div>
                      </div>
                    ) : (
                      <button
                        className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        onClick={() => {
                          setShowActions(false);
                          onEdit(menu);
                        }}
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                    )}

                    <button
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100"
                      onClick={() => {
                        setShowActions(false);
                        onDelete(menu.id);
                      }}
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Expand toggle */}
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 transition-colors"
              aria-label={isExpanded ? "Tutup" : "Buka"}
            >
              {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
        </div>

        {/* Menu name */}
        <p className="text-sm font-semibold text-slate-900 leading-snug">
          {menu.name}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="font-medium">{menu.portionCount} porsi</span>
          <span className="text-slate-300">·</span>
          <span>{menu.ingredients.length} bahan baku</span>
        </div>

        {/* Progress */}
        <ProgressStatus
          status={menu.status}
          progress={menu.deliveryProgress}
          showBar
        />
      </div>

      {/* Expanded: ingredient list */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-150 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="border-t border-slate-100 px-3 pb-3 pt-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Daftar Bahan Baku
          </p>
          <div className="flex flex-col gap-1.5">
            {menu.ingredients.map((ing) => (
              <div
                key={ing.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-2"
              >
                <span className="text-[12px] font-medium text-slate-700 min-w-0 truncate">
                  {ing.ingredientName}
                </span>
                <span className="shrink-0 text-[12px] text-slate-500 tabular-nums">
                  {ing.quantity} {ing.unit}
                </span>
              </div>
            ))}
          </div>
          {!locked && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(menu);
              }}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Pencil size={12} />
              Edit Menu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
