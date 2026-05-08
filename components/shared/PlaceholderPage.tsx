"use client";

import { NavIcon } from "@/components/navigation/NavIcon";
import { cn } from "@/lib/utils";

interface StatCard {
  label: string;
  value: string | number;
  iconName?: string;
}

interface PlaceholderPageProps {
  title: string;
  description: string;
  iconName: string;
  stats?: StatCard[];
  /** Override "Segera hadir" label */
  comingSoonLabel?: string;
}

export function PlaceholderPage({
  title,
  description,
  iconName,
  stats,
  comingSoonLabel = "Segera Hadir",
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Page header card */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            <NavIcon
              name={iconName}
              size={20}
              className="text-slate-600"
              strokeWidth={1.8}
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h1 className="text-base font-bold text-slate-900">{title}</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Optional stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-3"
            >
              <div className="flex flex-col gap-1">
                {stat.iconName && (
                  <NavIcon
                    name={stat.iconName}
                    size={14}
                    className="text-slate-400"
                    strokeWidth={1.8}
                  />
                )}
                <span className="text-xl font-bold text-slate-300 tabular-nums">
                  {stat.value}
                </span>
                <span className="text-[11px] text-slate-400 leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white py-14 px-6 text-center",
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <NavIcon
            name={iconName}
            size={24}
            className="text-slate-400"
            strokeWidth={1.6}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {comingSoonLabel}
          </span>
          <p className="mt-1 text-xs text-slate-400 max-w-55">
            Halaman ini sedang dalam pengembangan dan akan segera tersedia.
          </p>
        </div>
      </div>
    </div>
  );
}
