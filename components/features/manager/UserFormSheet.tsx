"use client";

import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserFormData } from "@/hooks/useUsers";
import type { UserRole, AppUser } from "@/types";
import { ROLE_CONFIG } from "./UserRoleBadge";

const ROLE_OPTIONS: UserRole[] = [
  "admin_client",
  "admin_gudang_client",
  "manajer_koperasi",
  "admin_koperasi",
  "admin_gudang",
];

const ROLES_NEEDING_CLIENT: UserRole[] = [
  "admin_client",
  "admin_gudang_client",
];

interface UserFormSheetProps {
  isOpen: boolean;
  onClose: () => void;
  form: UserFormData;
  setField: <K extends keyof UserFormData>(
    key: K,
    value: UserFormData[K],
  ) => void;
  isValid: boolean;
  isSubmitting: boolean;
  onSave: () => void;
  editingId: string | null;
  clients: { id: string; name: string }[];
}

export function UserFormSheet({
  isOpen,
  onClose,
  form,
  setField,
  isValid,
  isSubmitting,
  onSave,
  editingId,
  clients,
}: UserFormSheetProps) {
  const needsClient = ROLES_NEEDING_CLIENT.includes(form.role);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="relative flex max-h-[92dvh] flex-col rounded-t-2xl bg-white shadow-2xl">
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 pb-3">
          <h2 className="text-base font-semibold text-slate-800">
            {editingId ? "Edit Pengguna" : "Tambah Pengguna"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-transform"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Nama pengguna"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="email@domain.com"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Nomor HP
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) => {
                  setField("role", e.target.value as UserRole);
                  if (
                    !ROLES_NEEDING_CLIENT.includes(e.target.value as UserRole)
                  ) {
                    setField("clientId", "");
                  }
                }}
                className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_CONFIG[r].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Client (conditional) */}
          {needsClient && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Client
              </label>
              <div className="relative">
                <select
                  value={form.clientId}
                  onChange={(e) => setField("clientId", e.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                >
                  <option value="">— Pilih Client —</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={onSave}
            disabled={!isValid || isSubmitting}
            className={cn(
              "h-12 w-full rounded-xl text-sm font-semibold text-white transition-opacity",
              isValid && !isSubmitting
                ? "bg-violet-600 active:scale-95"
                : "bg-violet-300",
            )}
          >
            {isSubmitting
              ? "Menyimpan…"
              : editingId
                ? "Simpan Perubahan"
                : "Tambah Pengguna"}
          </button>
        </div>
      </div>
    </div>
  );
}
