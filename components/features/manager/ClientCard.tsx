"use client";

import { useRouter } from "next/navigation";
import { MapPin, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Client } from "@/types";

interface ClientCardProps {
  client: Client;
  kepalaSppiName?: string;
}

export function ClientCard({ client, kepalaSppiName }: ClientCardProps) {
  const router = useRouter();
  const progress = client.weeklyDeliveryProgress;

  return (
    <button
      onClick={() => router.push(`/manajer-koperasi/client/${client.id}`)}
      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left active:scale-[0.99] transition-transform"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 leading-tight">
            {client.name}
          </p>
          {client.address && (
            <div className="mt-0.5 flex items-start gap-1 text-xs text-slate-400">
              <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{client.address}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
              client.operationalStatus === "active"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-100 text-slate-500 border border-slate-200",
            )}
          >
            {client.operationalStatus === "active" ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {client.operationalStatus === "active" ? "Aktif" : "Nonaktif"}
          </span>
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
        <span>{client.activeMenuCount} menu aktif</span>
        <span className="text-slate-300">·</span>
        <span>Pengiriman minggu ini</span>
      </div>

      {/* Progress bar */}
      <div className="mt-2">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-slate-400">Progres pengiriman</span>
          <span
            className={cn(
              "font-medium",
              progress === 100
                ? "text-emerald-600"
                : progress > 0
                  ? "text-blue-600"
                  : "text-slate-400",
            )}
          >
            {progress}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              progress === 100
                ? "bg-emerald-500"
                : progress > 0
                  ? "bg-blue-500"
                  : "bg-slate-200",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {kepalaSppiName && (
        <p className="mt-2 text-xs text-slate-400">PIC: {kepalaSppiName}</p>
      )}
    </button>
  );
}
