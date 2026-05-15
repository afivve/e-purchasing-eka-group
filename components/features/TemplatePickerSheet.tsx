"use client";

import { X, Trash2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MenuTemplate } from "@/types";

interface Props {
  isOpen: boolean;
  templates: MenuTemplate[];
  onUse: (template: MenuTemplate) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function TemplatePickerSheet({
  isOpen,
  templates,
  onUse,
  onDelete,
  onClose,
}: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-60 flex flex-col bg-white rounded-t-2xl",
          "max-h-[75dvh] transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Pilih Template Menu
            </h2>
            <p className="text-[11px] text-slate-400">
              {templates.length} template tersedia
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Template list */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-2">
          {templates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText size={32} className="mb-3 text-slate-200" />
              <p className="text-sm font-medium text-slate-400">
                Belum ada template
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Buat menu lalu centang "Simpan sebagai template"
              </p>
            </div>
          ) : (
            templates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-xl border border-slate-200 bg-white p-3 flex items-start justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {tpl.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {tpl.ingredients.length} bahan baku ·{" "}
                    {tpl.ingredients
                      .map((i) => i.ingredientName)
                      .slice(0, 3)
                      .join(", ")}
                    {tpl.ingredients.length > 3
                      ? `, +${tpl.ingredients.length - 3} lainnya`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onDelete(tpl.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                    aria-label="Hapus template"
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    onClick={() => onUse(tpl)}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    Gunakan
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="h-safe-bottom" />
      </div>
    </>
  );
}
