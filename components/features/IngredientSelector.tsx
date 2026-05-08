"use client";

import { useRef, useEffect } from "react";
import { Search, Plus, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/types";

interface IngredientSelectorProps {
  search: string;
  onSearchChange: (v: string) => void;
  isDropdownOpen: boolean;
  onToggleDropdown: (v: boolean) => void;
  filteredIngredients: Ingredient[];
  onSelect: (ing: Ingredient) => void;
  isAddingNew: boolean;
  onToggleAddNew: (v: boolean) => void;
  newIngName: string;
  onNewIngNameChange: (v: string) => void;
  newIngUnit: string;
  onNewIngUnitChange: (v: string) => void;
  onConfirmAddNew: () => void;
}

export function IngredientSelector({
  search,
  onSearchChange,
  isDropdownOpen,
  onToggleDropdown,
  filteredIngredients,
  onSelect,
  isAddingNew,
  onToggleAddNew,
  newIngName,
  onNewIngNameChange,
  newIngUnit,
  onNewIngUnitChange,
  onConfirmAddNew,
}: IngredientSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onToggleDropdown(false);
        onToggleAddNew(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onToggleDropdown, onToggleAddNew]);

  const showNoMatch = search.trim() !== "" && filteredIngredients.length === 0;

  const canConfirmNew = newIngName.trim() !== "" && newIngUnit.trim() !== "";

  return (
    <div ref={containerRef} className="relative">
      {!isAddingNew ? (
        <>
          {/* Search trigger */}
          <button
            type="button"
            onClick={() => onToggleDropdown(!isDropdownOpen)}
            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            <Plus size={15} />
            <span>Tambah Bahan Baku</span>
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 z-10 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                <Search size={14} className="text-slate-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari bahan baku…"
                  className="flex-1 text-sm outline-none placeholder:text-slate-400 bg-transparent"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-48 overflow-y-auto overscroll-contain">
                {filteredIngredients.map((ing) => (
                  <button
                    key={ing.id}
                    type="button"
                    onClick={() => onSelect(ing)}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 group-hover:text-blue-700">
                        {ing.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {ing.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {ing.unit}
                    </span>
                  </button>
                ))}

                {showNoMatch && (
                  <div className="px-3 py-2 text-xs text-slate-400 italic">
                    Tidak ditemukan di daftar.
                  </div>
                )}

                {/* Add new option */}
                <button
                  type="button"
                  onClick={() => {
                    onToggleDropdown(false);
                    onToggleAddNew(true);
                    if (search.trim()) onNewIngNameChange(search.trim());
                  }}
                  className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Plus size={14} />
                  <span>
                    {search.trim()
                      ? `Tambah "${search}" sebagai bahan baku baru`
                      : "Tambah bahan baku baru"}
                  </span>
                  <ChevronRight size={13} className="ml-auto text-blue-400" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Add new ingredient inline form */
        <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Bahan Baku Baru
            </span>
            <button
              type="button"
              onClick={() => onToggleAddNew(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                Nama Bahan Baku
              </label>
              <input
                autoFocus
                type="text"
                value={newIngName}
                onChange={(e) => onNewIngNameChange(e.target.value)}
                placeholder="mis. Daun Ketumbar"
                className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                Satuan
              </label>
              <input
                type="text"
                value={newIngUnit}
                onChange={(e) => onNewIngUnitChange(e.target.value)}
                placeholder="kg / pcs / ikat"
                className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                disabled={!canConfirmNew}
                onClick={onConfirmAddNew}
                className={cn(
                  "w-full rounded-md py-2 text-sm font-medium transition-colors",
                  canConfirmNew
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed",
                )}
              >
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
