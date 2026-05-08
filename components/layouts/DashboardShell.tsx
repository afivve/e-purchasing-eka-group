"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { BottomNav } from "@/components/navigation/BottomNav";
import { RoleSwitcher } from "@/components/navigation/RoleSwitcher";
import type { RoleId } from "@/types/navigation";
import { ROLE_CONFIGS } from "@/lib/navigation";

interface DashboardShellProps {
  roleId: RoleId;
  pageTitle?: string;
  children: React.ReactNode;
}

export function DashboardShell({
  roleId,
  pageTitle,
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const config = ROLE_CONFIGS[roleId];

  return (
    <div className="flex h-dvh bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AppSidebar
        roleId={roleId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main column */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Sticky header */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center border-b border-slate-200 bg-white px-3 gap-2">
          {/* Hamburger – mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors md:hidden"
            aria-label="Buka sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Title */}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 leading-none">
              {config.label}
            </span>
            <span className="text-sm font-bold text-slate-900 truncate leading-tight">
              {pageTitle ?? config.label}
            </span>
          </div>

          {/* Role switcher */}
          <div className="shrink-0">
            <RoleSwitcher />
          </div>
        </header>

        {/* Scrollable body – extra bottom padding for bottom nav on mobile */}
        <main
          className={cn(
            "flex-1 overflow-y-auto overscroll-contain",
            // leave room for fixed bottom nav on mobile
            "pb-20 md:pb-0",
          )}
        >
          {children}
        </main>
      </div>

      {/* Bottom navigation (mobile only) */}
      <BottomNav roleId={roleId} />
    </div>
  );
}
