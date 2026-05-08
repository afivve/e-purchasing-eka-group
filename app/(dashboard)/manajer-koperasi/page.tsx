"use client";

import { useRouter } from "next/navigation";
import {
  Store,
  ClipboardList,
  Building2,
  Package,
  UserCog,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_CLIENTS } from "@/mock/clients";
import { MOCK_SUPPLIERS } from "@/mock/suppliers";
import { MOCK_INGREDIENTS_WITH_STOCK } from "@/mock/ingredientsWithStock";
import { MOCK_DAILY_NEEDS } from "@/mock/dailyNeeds";

export default function ManajerKoperasiDashboardPage() {
  const router = useRouter();

  const TODAY = "2026-05-08";

  const activeClients = MOCK_CLIENTS.filter(
    (c) => c.operationalStatus === "active",
  ).length;
  const activeSuppliers = MOCK_SUPPLIERS.filter((s) => s.isActive).length;
  const emptyStock = MOCK_INGREDIENTS_WITH_STOCK.filter(
    (i) => i.stockStatus === "empty",
  ).length;
  const lowStock = MOCK_INGREDIENTS_WITH_STOCK.filter(
    (i) => i.stockStatus === "low",
  ).length;
  const todayNeeds = MOCK_DAILY_NEEDS.filter((n) => n.deliveryDate === TODAY);
  const unassigned = MOCK_DAILY_NEEDS.flatMap((n) =>
    n.ingredients.filter((i) => i.supplierId === null),
  ).length;

  const stats = [
    {
      label: "Client Aktif",
      value: activeClients,
      total: MOCK_CLIENTS.length,
      icon: Store,
      color: "text-violet-600",
      bg: "bg-violet-50",
      href: "/manajer-koperasi/client",
    },
    {
      label: "Supplier Aktif",
      value: activeSuppliers,
      total: MOCK_SUPPLIERS.length,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
      href: "/manajer-koperasi/supplier",
    },
    {
      label: "Stok Menipis",
      value: lowStock + emptyStock,
      total: MOCK_INGREDIENTS_WITH_STOCK.length,
      icon: Package,
      color: lowStock + emptyStock > 0 ? "text-amber-600" : "text-emerald-600",
      bg: lowStock + emptyStock > 0 ? "bg-amber-50" : "bg-emerald-50",
      href: "/manajer-koperasi/bahan-baku",
    },
    {
      label: "Belum Terjadwal",
      value: unassigned,
      total: null,
      icon: ClipboardList,
      color: unassigned > 0 ? "text-red-500" : "text-emerald-600",
      bg: unassigned > 0 ? "bg-red-50" : "bg-emerald-50",
      href: "/manajer-koperasi/kebutuhan-harian",
    },
  ];

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => router.push(s.href)}
            className="rounded-xl border border-slate-200 bg-white p-3 text-left active:scale-95 transition-transform"
          >
            <div
              className={cn(
                "mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg",
                s.bg,
              )}
            >
              <s.icon className={cn("h-4 w-4", s.color)} />
            </div>
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
            {s.total !== null && (
              <p className="text-[11px] text-slate-400">dari {s.total} total</p>
            )}
          </button>
        ))}
      </div>

      {/* Alert strip */}
      {(emptyStock > 0 || unassigned > 0) && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-orange-500 mt-0.5" />
          <div className="text-xs text-orange-700 space-y-0.5">
            {emptyStock > 0 && (
              <p>
                {emptyStock} bahan baku kosong — segera koordinasi supplier.
              </p>
            )}
            {unassigned > 0 && (
              <p>{unassigned} bahan belum ada supplier yang ditugaskan.</p>
            )}
          </div>
        </div>
      )}

      {/* Today's needs summary */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Kebutuhan Hari Ini ({todayNeeds.length} client)
        </p>
        {todayNeeds.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-6 text-center">
            <p className="text-sm text-slate-400">
              Tidak ada kebutuhan harian hari ini.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayNeeds.map((n) => {
              const unassignedCount = n.ingredients.filter(
                (i) => i.supplierId === null,
              ).length;
              return (
                <button
                  key={n.id}
                  onClick={() =>
                    router.push("/manajer-koperasi/kebutuhan-harian")
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left active:scale-95 transition-transform"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                        {n.menuName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {n.clientName} · {n.portionCount} porsi
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none shrink-0",
                        n.deliveryStatus === "complete"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : n.deliveryStatus === "in_process"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200",
                      )}
                    >
                      {n.deliveryStatus === "complete"
                        ? "Selesai"
                        : n.deliveryStatus === "in_process"
                          ? "Proses"
                          : "Belum"}
                    </span>
                  </div>
                  {unassignedCount > 0 && (
                    <p className="mt-1.5 text-[11px] text-orange-600">
                      {unassignedCount} bahan belum ada supplier
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Menu Cepat
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: "User",
              icon: UserCog,
              href: "/manajer-koperasi/user-management",
            },
            {
              label: "Bahan Baku",
              icon: Package,
              href: "/manajer-koperasi/bahan-baku",
            },
            {
              label: "Kebutuhan",
              icon: ClipboardList,
              href: "/manajer-koperasi/kebutuhan-harian",
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 active:scale-95 transition-transform"
            >
              <item.icon className="h-5 w-5 text-violet-600" />
              <span className="text-[11px] font-medium text-slate-600">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
