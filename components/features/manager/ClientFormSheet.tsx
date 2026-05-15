"use client";

import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClientFormData } from "@/hooks/useClients";
import type { AppUser } from "@/types";

interface ClientFormSheetProps {
  isOpen: boolean;
  onClose: () => void;
  form: ClientFormData;
  setField: <K extends keyof ClientFormData>(
    key: K,
    value: ClientFormData[K],
  ) => void;
  isValid: boolean;
  isSubmitting: boolean;
  onSave: () => void;
  adminClientUsers: AppUser[];
}

export function ClientFormSheet({
  isOpen,
  onClose,
  form,
  setField,
  isValid,
  isSubmitting,
  onSave,
  adminClientUsers,
}: ClientFormSheetProps) {
  if (!isOpen) return null;

  const isDapur = form.clientType === "dapur";

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[92dvh] flex-col rounded-t-2xl bg-white shadow-2xl">
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 pb-3">
          <h2 className="text-base font-semibold text-slate-800">
            Tambah Client
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 active:scale-95"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Nama */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Nama Client <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="RS / Panti / Pesantren…"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Alamat
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              placeholder="Alamat lengkap client"
              rows={2}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 resize-none"
            />
          </div>

          {/* Jenis Client */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Jenis Client <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {(
                [
                  { value: "dapur", label: "Dapur / Catering" },
                  { value: "non_dapur", label: "Non Dapur" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setField("clientType", opt.value)}
                  className={cn(
                    "flex-1 h-10 rounded-lg border text-xs font-medium transition-colors",
                    form.clientType === opt.value
                      ? "border-violet-400 bg-violet-50 text-violet-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional: Dapur */}
          {isDapur && (
            <>
              {/* Akuntan Client */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Akuntan Client <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.akuntanClientId}
                    onChange={(e) =>
                      setField("akuntanClientId", e.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="">— Pilih Akuntan Client —</option>
                    {adminClientUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Ahli Gizi */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Ahli Gizi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.ahliGiziId}
                    onChange={(e) => setField("ahliGiziId", e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="">— Pilih Ahli Gizi —</option>
                    {adminClientUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </>
          )}

          {/* Conditional: Non Dapur */}
          {!isDapur && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Manager Client <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={form.managerClientId}
                  onChange={(e) => setField("managerClientId", e.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                >
                  <option value="">— Pilih Manager Client —</option>
                  {adminClientUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-4">
          <button
            onClick={onSave}
            disabled={!isValid || isSubmitting}
            className={cn(
              "h-12 w-full rounded-xl text-sm font-semibold text-white",
              isValid && !isSubmitting
                ? "bg-violet-600 active:scale-95"
                : "bg-violet-300",
            )}
          >
            {isSubmitting ? "Menyimpan…" : "Tambah Client"}
          </button>
        </div>
      </div>
    </div>
  );
}
