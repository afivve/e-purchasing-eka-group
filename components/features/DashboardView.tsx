"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  SlidersHorizontal,
  Plus,
  X,
  ChevronDown,
} from "lucide-react";
import { cn, formatDateRange } from "@/lib/utils";
import { useDashboard } from "@/hooks/useDashboard";
import { useMenuTemplates } from "@/hooks/useMenuTemplates";
import { WeeklyPackageSidebar } from "@/components/features/WeeklyPackageSidebar";
import { DailyMenuList } from "@/components/features/DailyMenuList";
import { MenuFormSheet } from "@/components/features/MenuFormSheet";
import { TemplatePickerSheet } from "@/components/features/TemplatePickerSheet";
import { ToastContainer } from "@/components/features/ToastContainer";
import { MOCK_PACKAGES } from "@/mock/packages";
import type { MenuTemplate } from "@/types";

type FilterStatus = "all" | "pending" | "partial" | "complete";

interface DashboardViewProps {
  clientId?: string;
}

export function DashboardView({ clientId = "client-001" }: DashboardViewProps) {
  const {
    selectedPackageId,
    selectPackage,
    isSidebarOpen,
    setIsSidebarOpen,
    selectedMenus,
    searchQuery,
    setSearchQuery,
    isSearchVisible,
    setIsSearchVisible,
    isFormOpen,
    editingMenu,
    openAddForm,
    openEditForm,
    closeForm,
    saveMenu,
    deleteMenu,
    isLoading,
    toasts,
  } = useDashboard();

  const { templates, saveTemplate, deleteTemplate } =
    useMenuTemplates(clientId);
  const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
  const [populateFromTemplate, setPopulateFromTemplate] =
    useState<MenuTemplate | null>(null);

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleSaveMenu(
    menu: Parameters<typeof saveMenu>[0],
    asTemplate: boolean,
  ) {
    if (asTemplate) {
      saveTemplate(menu.name, menu.ingredients);
    }
    saveMenu(menu);
  }

  function handleUseTemplate(tpl: MenuTemplate) {
    setPopulateFromTemplate(tpl);
    setIsTemplatePickerOpen(false);
    openAddForm();
  }

  const selectedPackage =
    MOCK_PACKAGES.find((p) => p.id === selectedPackageId) ?? null;

  const filteredMenus =
    filterStatus === "all"
      ? selectedMenus
      : selectedMenus.filter((m) => m.status === filterStatus);

  useEffect(() => {
    if (isSearchVisible) {
      searchInputRef.current?.focus();
    }
  }, [isSearchVisible]);

  const FILTER_LABELS: Record<FilterStatus, string> = {
    all: "Semua",
    pending: "Menunggu",
    partial: "Sebagian",
    complete: "Lengkap",
  };

  return (
    <div className="flex h-dvh bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <WeeklyPackageSidebar
        selectedPackageId={selectedPackageId}
        onSelectPackage={selectPackage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center border-b border-slate-200 bg-white px-3 gap-2">
          {/* Hamburger – mobile only */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors md:hidden"
            aria-label="Buka sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Title area */}
          <div className="flex flex-col flex-1 min-w-0">
            {selectedPackage ? (
              <>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 leading-none">
                  Paket Aktif
                </span>
                <span className="text-sm font-bold text-slate-900 truncate leading-tight">
                  {selectedPackage.name}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-slate-500">
                Pilih paket di sidebar
              </span>
            )}
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Search toggle */}
            <button
              onClick={() => {
                setIsSearchVisible((v) => !v);
                if (isSearchVisible) setSearchQuery("");
              }}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                isSearchVisible
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-100",
              )}
              aria-label="Cari menu"
            >
              <Search size={16} />
            </button>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen((v) => !v)}
                className={cn(
                  "flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-medium transition-colors",
                  filterStatus !== "all"
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-slate-500 hover:bg-slate-100",
                )}
                aria-label="Filter"
              >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline">
                  {FILTER_LABELS[filterStatus]}
                </span>
                <ChevronDown size={12} />
              </button>

              {isFilterOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <div className="absolute right-0 top-9 z-20 w-36 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                    {(Object.keys(FILTER_LABELS) as FilterStatus[]).map(
                      (key) => (
                        <button
                          key={key}
                          onClick={() => {
                            setFilterStatus(key);
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between px-3 py-2.5 text-sm transition-colors",
                            filterStatus === key
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-slate-700 hover:bg-slate-50",
                          )}
                        >
                          {FILTER_LABELS[key]}
                          {filterStatus === key && (
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Search bar – collapsible */}
        <div
          className={cn(
            "overflow-hidden border-b border-slate-100 bg-white transition-all duration-200",
            isSearchVisible ? "max-h-14 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex items-center gap-2 px-4 py-2.5">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama menu…"
              className="flex-1 text-sm outline-none placeholder:text-slate-400 bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Package info strip */}
        {selectedPackage && (
          <div className="flex items-center gap-3 bg-white border-b border-slate-100 px-4 py-2">
            <span className="text-[11px] text-slate-500">
              {formatDateRange(
                selectedPackage.startDate,
                selectedPackage.endDate,
              )}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] text-slate-500">
              {filteredMenus.length} menu
            </span>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${selectedPackage.deliveryProgress}%` }}
                />
              </div>
              <span className="text-[11px] tabular-nums text-slate-500">
                {selectedPackage.deliveryProgress}%
              </span>
            </div>
          </div>
        )}

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-24">
          <DailyMenuList
            menus={filteredMenus}
            isLoading={isLoading}
            onEdit={openEditForm}
            onDelete={deleteMenu}
            onAdd={openAddForm}
          />
        </main>
      </div>

      {/* Floating Action Button */}
      {selectedPackageId && (
        <button
          onClick={openAddForm}
          className="fixed bottom-6 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-150"
          aria-label="Tambah menu"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Menu Form Bottom Sheet */}
      <MenuFormSheet
        open={isFormOpen}
        onClose={() => {
          closeForm();
          setPopulateFromTemplate(null);
        }}
        onSave={handleSaveMenu}
        editingMenu={editingMenu}
        packageId={selectedPackageId}
        templates={templates}
        onPickTemplate={() => setIsTemplatePickerOpen(true)}
        populateTemplate={populateFromTemplate}
        onTemplateClear={() => setPopulateFromTemplate(null)}
      />

      {/* Template Picker Sheet */}
      <TemplatePickerSheet
        isOpen={isTemplatePickerOpen}
        templates={templates}
        onUse={handleUseTemplate}
        onDelete={deleteTemplate}
        onClose={() => setIsTemplatePickerOpen(false)}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
