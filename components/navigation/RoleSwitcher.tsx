"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROLE_CONFIGS, ALL_ROLES, getRoleFromPathname } from "@/lib/navigation";

interface RoleSwitcherProps {
  /** compact mode: show just an icon button, used in sidebar footer */
  compact?: boolean;
}

export function RoleSwitcher({ compact = false }: RoleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentRoleId = getRoleFromPathname(pathname);
  const currentRole = ROLE_CONFIGS[currentRoleId];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSwitch(roleId: (typeof ALL_ROLES)[number]) {
    setOpen(false);
    if (roleId === currentRoleId) return;
    router.push(ROLE_CONFIGS[roleId].homeHref);
  }

  // ─── Compact mode (sidebar footer) ──────────────────────────
  if (compact) {
    return (
      <div ref={containerRef} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 transition-colors",
            open ? "bg-slate-100" : "hover:bg-slate-50",
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full shrink-0",
              currentRole.accentClass,
            )}
          />
          <span className="flex-1 text-left text-xs font-medium text-slate-700 truncate">
            {currentRole.label}
          </span>
          <RefreshCw size={12} className="shrink-0 text-slate-400" />
        </button>

        {open && (
          <div className="absolute bottom-full left-0 right-0 mb-1 z-50 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Ganti Role
              </p>
            </div>
            {ALL_ROLES.map((roleId) => {
              const role = ROLE_CONFIGS[roleId];
              const isActive = roleId === currentRoleId;
              return (
                <button
                  key={roleId}
                  onClick={() => handleSwitch(roleId)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors",
                    isActive
                      ? "bg-slate-50 text-slate-900 font-medium"
                      : "text-slate-700 hover:bg-slate-50",
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      role.accentClass,
                    )}
                  />
                  <span className="flex-1 truncate">{role.label}</span>
                  {isActive && (
                    <Check size={13} className="text-blue-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ─── Full mode (sidebar header or topbar) ───────────────────
  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors",
          open ? "bg-slate-100" : "hover:bg-slate-100",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full shrink-0",
            currentRole.accentClass,
          )}
        />
        <span className="text-xs font-medium text-slate-700">
          {currentRole.shortLabel}
        </span>
        <ChevronDown size={12} className="text-slate-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-52 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Simulasi Role
              </p>
            </div>
            {ALL_ROLES.map((roleId) => {
              const role = ROLE_CONFIGS[roleId];
              const isActive = roleId === currentRoleId;
              return (
                <button
                  key={roleId}
                  onClick={() => handleSwitch(roleId)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-800 font-medium"
                      : "text-slate-700 hover:bg-slate-50",
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      role.accentClass,
                    )}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] truncate">{role.label}</span>
                  </div>
                  {isActive && (
                    <Check
                      size={13}
                      className="text-blue-600 shrink-0 ml-auto"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
