"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavIcon } from "@/components/navigation/NavIcon";
import type { RoleId } from "@/types/navigation";
import { ROLE_CONFIGS } from "@/lib/navigation";

interface BottomNavProps {
  roleId: RoleId;
}

export function BottomNav({ roleId }: BottomNavProps) {
  const pathname = usePathname();
  const config = ROLE_CONFIGS[roleId];
  const items = config.navItems.slice(0, 5);

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 md:hidden">
      <div className="flex">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 min-h-14 transition-colors",
                isActive ? "text-blue-600" : "text-slate-500",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <NavIcon
                name={item.iconName}
                size={20}
                className={cn(isActive ? "text-blue-600" : "text-slate-400")}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-none",
                  isActive ? "text-blue-600" : "text-slate-500",
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
