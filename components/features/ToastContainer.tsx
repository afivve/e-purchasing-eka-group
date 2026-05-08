"use client";

import { CheckCircle2, XCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToastItem } from "@/types";

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle2,
    bg: "bg-slate-900",
    text: "text-white",
    iconColor: "text-emerald-400",
  },
  error: {
    icon: XCircle,
    bg: "bg-slate-900",
    text: "text-white",
    iconColor: "text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-slate-900",
    text: "text-white",
    iconColor: "text-amber-400",
  },
};

interface ToastContainerProps {
  toasts: ToastItem[];
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-100 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifikasi"
    >
      {toasts.map((toast) => {
        const config = TOAST_CONFIG[toast.type];
        const Icon = config.icon;
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg",
              "animate-slide-up",
              config.bg,
              config.text,
            )}
          >
            <Icon size={16} className={cn("shrink-0", config.iconColor)} />
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
