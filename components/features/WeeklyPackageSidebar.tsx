"use client";

import { X, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn, formatDateRange } from "@/lib/utils";
import { groupPackagesByMonth } from "@/mock/packages";
import type { WeeklyPackage, PackageGroup } from "@/types";
import { MOCK_PACKAGES } from "@/mock/packages";
import { RoleSwitcher } from "@/components/navigation/RoleSwitcher";

interface WeeklyPackageSidebarProps {
  selectedPackageId: string | null;
  onSelectPackage: (pkg: WeeklyPackage) => void;
  isOpen: boolean;
  onClose: () => void;
}

function PackageProgressDot({ progress }: { progress: number }) {
  if (progress >= 100)
    return <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />;
  if (progress > 0)
    return (
      <span className="shrink-0 text-[10px] font-semibold tabular-nums text-amber-600 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded">
        {progress}%
      </span>
    );
  return <span className="shrink-0 h-2 w-2 rounded-full bg-slate-300" />;
}

const packageGroups = groupPackagesByMonth(MOCK_PACKAGES);

export function WeeklyPackageSidebar({
  selectedPackageId,
  onSelectPackage,
  isOpen,
  onClose,
}: WeeklyPackageSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-white",
          "transition-transform duration-300 ease-in-out",
          // Mobile: slide in/out
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "md:relative md:z-auto md:translate-x-0",
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Purchasing
            </span>
            <span className="text-sm font-bold text-slate-900 leading-tight">
              Eka Group
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors md:hidden"
            aria-label="Tutup sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable package list */}
        <div className="flex-1 overflow-y-auto overscroll-contain py-2">
          {packageGroups.map((group) => (
            <PackageGroupSection
              key={group.key}
              group={group}
              selectedPackageId={selectedPackageId}
              onSelect={onSelectPackage}
            />
          ))}
        </div>

        {/* Footer: role switcher */}
        <div className="shrink-0 border-t border-slate-100 px-2 py-2">
          <RoleSwitcher compact />
        </div>
      </aside>
    </>
  );
}

function PackageGroupSection({
  group,
  selectedPackageId,
  onSelect,
}: {
  group: PackageGroup;
  selectedPackageId: string | null;
  onSelect: (pkg: WeeklyPackage) => void;
}) {
  const hasSelected = group.packages.some((p) => p.id === selectedPackageId);

  return (
    <div className="mb-0.5">
      {/* Month label */}
      <div className="flex items-center gap-2 px-4 py-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {group.label}
        </span>
      </div>

      {/* Package items */}
      {group.packages.map((pkg) => {
        const isSelected = pkg.id === selectedPackageId;
        return (
          <button
            key={pkg.id}
            onClick={() => onSelect(pkg)}
            className={cn(
              "flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors",
              isSelected
                ? "bg-blue-50 border-r-2 border-blue-600"
                : "hover:bg-slate-50",
            )}
          >
            <div className="flex flex-1 flex-col gap-0.5 min-w-0">
              <span
                className={cn(
                  "text-[13px] font-medium leading-tight",
                  isSelected ? "text-blue-700" : "text-slate-700",
                )}
              >
                {pkg.weekPeriod}
              </span>
              <span className="text-[10px] text-slate-400 tabular-nums truncate">
                {formatDateRange(pkg.startDate, pkg.endDate)}
              </span>
            </div>
            <PackageProgressDot progress={pkg.deliveryProgress} />
          </button>
        );
      })}
    </div>
  );
}
