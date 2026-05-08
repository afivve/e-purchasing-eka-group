"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavIcon } from "@/components/navigation/NavIcon";
import { RoleSwitcher } from "@/components/navigation/RoleSwitcher";
import type { RoleId } from "@/types/navigation";
import { ROLE_CONFIGS } from "@/lib/navigation";

interface AppSidebarProps {
  roleId: RoleId;
  isOpen: boolean;
  onClose: () => void;
}

export function AppSidebar({ roleId, isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const config = ROLE_CONFIGS[roleId];

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
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:z-auto md:translate-x-0",
        )}
      >
        {/* Header */}
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

        {/* Role badge */}
        <div className="px-4 py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full shrink-0",
                config.accentClass,
              )}
            />
            <span className="text-xs font-semibold text-slate-700">
              {config.label}
            </span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto overscroll-contain py-2 px-2">
          <div className="flex flex-col gap-0.5">
            {config.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600 rounded-r-none pr-2"
                      : "text-slate-700 hover:bg-slate-50",
                  )}
                >
                  <NavIcon
                    name={item.iconName}
                    size={16}
                    className={cn(
                      isActive ? "text-blue-600" : "text-slate-500",
                    )}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  <span
                    className={cn(
                      "text-[13px] font-medium",
                      isActive && "font-semibold",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer: role switcher */}
        <div className="shrink-0 border-t border-slate-100 px-2 py-2">
          <RoleSwitcher compact />
        </div>
      </aside>
    </>
  );
}
