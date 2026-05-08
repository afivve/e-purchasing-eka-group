"use client";

import { useState, useMemo } from "react";
import { MapPin, User, ChevronRight, Calendar } from "lucide-react";
import { cn, formatDateRange } from "@/lib/utils";
import { MOCK_PACKAGES } from "@/mock/packages";
import { MOCK_MENUS } from "@/mock/menus";
import type { Client, AppUser, DailyMenu } from "@/types";

interface ClientDetailViewProps {
  client: Client;
  kepalaSppiUser?: AppUser;
  ahliGiziUser?: AppUser;
}

export function ClientDetailView({
  client,
  kepalaSppiUser,
  ahliGiziUser,
}: ClientDetailViewProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  const packages = MOCK_PACKAGES.slice().reverse();

  const selectedPackage =
    packages.find((p) => p.id === selectedPackageId) ?? null;

  const menus: DailyMenu[] = useMemo(() => {
    if (!selectedPackageId) return [];
    return MOCK_MENUS.filter((m) => m.packageId === selectedPackageId);
  }, [selectedPackageId]);

  return (
    <div className="flex flex-col">
      {/* Client info strip */}
      <div className="mx-4 mb-4 rounded-xl border border-violet-100 bg-violet-50 p-3 space-y-1.5">
        <div className="flex items-start gap-1.5 text-xs text-violet-700">
          <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
          <span>{client.address || "—"}</span>
        </div>
        {kepalaSppiUser && (
          <div className="flex items-center gap-1.5 text-xs text-violet-700">
            <User className="h-3 w-3 shrink-0" />
            <span>PIC: {kepalaSppiUser.name}</span>
          </div>
        )}
        {ahliGiziUser && (
          <div className="flex items-center gap-1.5 text-xs text-violet-700">
            <User className="h-3 w-3 shrink-0" />
            <span>Ahli Gizi: {ahliGiziUser.name}</span>
          </div>
        )}
        <div className="flex items-center gap-3 pt-1 text-xs">
          <span className="text-violet-600 font-medium">
            {client.activeMenuCount} menu aktif
          </span>
          <span className="text-violet-400">·</span>
          <span className="text-violet-600 font-medium">
            {client.weeklyDeliveryProgress}% pengiriman minggu ini
          </span>
        </div>
      </div>

      {/* Package list */}
      <div className="px-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Paket Mingguan
        </p>
        <div className="space-y-2">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() =>
                setSelectedPackageId(
                  selectedPackageId === pkg.id ? null : pkg.id,
                )
              }
              className={cn(
                "w-full rounded-xl border p-3 text-left transition-colors",
                selectedPackageId === pkg.id
                  ? "border-violet-300 bg-violet-50"
                  : "border-slate-200 bg-white",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {pkg.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDateRange(pkg.startDate, pkg.endDate)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Progress */}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      pkg.deliveryProgress === 100
                        ? "text-emerald-600"
                        : pkg.deliveryProgress > 0
                          ? "text-blue-600"
                          : "text-slate-400",
                    )}
                  >
                    {pkg.deliveryProgress}%
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      selectedPackageId === pkg.id
                        ? "rotate-90 text-violet-500"
                        : "text-slate-300",
                    )}
                  />
                </div>
              </div>

              {/* Inline progress bar */}
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn(
                    "h-full rounded-full",
                    pkg.deliveryProgress === 100
                      ? "bg-emerald-500"
                      : pkg.deliveryProgress > 0
                        ? "bg-blue-500"
                        : "bg-slate-200",
                  )}
                  style={{ width: `${pkg.deliveryProgress}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Daily menus for selected package */}
      {selectedPackage && (
        <div className="mt-4 px-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Menu Harian — {selectedPackage.name}
          </p>
          {menus.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center">
              <Calendar className="mx-auto h-6 w-6 text-slate-300 mb-2" />
              <p className="text-sm text-slate-400">
                Belum ada menu untuk paket ini.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {menus.map((menu) => (
                <div
                  key={menu.id}
                  className="rounded-xl border border-slate-200 bg-white p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {menu.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {menu.deliveryDate}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
                        menu.status === "complete"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : menu.status === "partial"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200",
                      )}
                    >
                      {menu.status === "complete"
                        ? "Terkirim"
                        : menu.status === "partial"
                          ? "Sebagian"
                          : "Menunggu"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    {menu.ingredients.length} bahan baku · {menu.portionCount}{" "}
                    porsi
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="h-8" />
    </div>
  );
}
