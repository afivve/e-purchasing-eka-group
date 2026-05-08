"use client";

import { useEffect, useRef } from "react";
import { X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenuForm } from "@/hooks/useMenuForm";
import { IngredientItem } from "@/components/features/IngredientItem";
import { IngredientSelector } from "@/components/features/IngredientSelector";
import type { DailyMenu } from "@/types";

interface MenuFormSheetProps {
  open: boolean;
  onClose: () => void;
  onSave: (menu: DailyMenu) => void;
  editingMenu: DailyMenu | null;
  packageId: string | null;
}

export function MenuFormSheet({
  open,
  onClose,
  onSave,
  editingMenu,
  packageId,
}: MenuFormSheetProps) {
  const {
    form,
    setField,
    populate,
    reset,
    ingredientSearch,
    setIngredientSearch,
    isDropdownOpen,
    setIsDropdownOpen,
    isAddingNew,
    setIsAddingNew,
    newIngName,
    setNewIngName,
    newIngUnit,
    setNewIngUnit,
    filteredIngredients,
    addIngredientLine,
    addNewIngredient,
    updateLine,
    removeLine,
    isValid,
    buildMenu,
  } = useMenuForm(packageId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isEdit = editingMenu !== null;

  useEffect(() => {
    if (open) {
      if (editingMenu) {
        populate(editingMenu);
      } else {
        reset();
      }
    }
  }, [open, editingMenu, populate, reset]);

  // Trap body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    const menu = buildMenu(editingMenu?.id);
    onSave(menu);
  }

  const noIngredients = form.ingredientLines.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-2xl",
          "max-h-[92dvh] transition-transform duration-300 ease-in-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-slate-300" />
        </div>

        {/* Sheet header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
          <h2 className="text-base font-semibold text-slate-900">
            {isEdit ? "Edit Menu" : "Tambah Menu Harian"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-2"
        >
          <form
            id="menu-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Nama Menu */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Nama Menu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="mis. Nasi Goreng Spesial Komplit"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder:text-slate-400"
              />
            </div>

            {/* Grid: Tanggal + Porsi */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Tgl. Kirim Bahan Baku <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.deliveryDate}
                  onChange={(e) => setField("deliveryDate", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Jml. Porsi <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={form.portionCount}
                  onChange={(e) => setField("portionCount", e.target.value)}
                  placeholder="mis. 100"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Bahan Baku section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Bahan Baku <span className="text-red-500">*</span>
                </label>
                {form.ingredientLines.length > 0 && (
                  <span className="text-[11px] text-slate-400">
                    {form.ingredientLines.length} item
                  </span>
                )}
              </div>

              {/* Ingredient lines */}
              {form.ingredientLines.length > 0 && (
                <div className="flex flex-col gap-2">
                  {form.ingredientLines.map((line, i) => (
                    <IngredientItem
                      key={line.tempId}
                      line={line}
                      index={i}
                      onUpdate={updateLine}
                      onRemove={removeLine}
                    />
                  ))}
                </div>
              )}

              {/* Ingredient selector */}
              <IngredientSelector
                search={ingredientSearch}
                onSearchChange={setIngredientSearch}
                isDropdownOpen={isDropdownOpen}
                onToggleDropdown={setIsDropdownOpen}
                filteredIngredients={filteredIngredients}
                onSelect={addIngredientLine}
                isAddingNew={isAddingNew}
                onToggleAddNew={setIsAddingNew}
                newIngName={newIngName}
                onNewIngNameChange={setNewIngName}
                newIngUnit={newIngUnit}
                onNewIngUnitChange={setNewIngUnit}
                onConfirmAddNew={addNewIngredient}
              />

              {/* Warning: no ingredients */}
              {noIngredients && (
                <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
                  <AlertCircle
                    size={14}
                    className="text-amber-500 mt-0.5 shrink-0"
                  />
                  <p className="text-[12px] text-amber-700">
                    Tambahkan minimal satu bahan baku sebelum menyimpan menu.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Sticky save button */}
        <div className="shrink-0 px-4 py-3 border-t border-slate-100 bg-white">
          <button
            type="submit"
            form="menu-form"
            disabled={!isValid}
            className={cn(
              "w-full rounded-xl py-3 text-sm font-semibold transition-all duration-150",
              isValid
                ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                : "bg-slate-100 text-slate-400 cursor-not-allowed",
            )}
          >
            {isEdit ? "Simpan Perubahan" : "Simpan Menu"}
          </button>
        </div>
      </div>
    </>
  );
}
