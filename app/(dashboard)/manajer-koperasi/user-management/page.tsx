"use client";

import { Search, Plus, UserCog, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUsers } from "@/hooks/useUsers";
import { UserCard } from "@/components/features/manager/UserCard";
import { UserFormSheet } from "@/components/features/manager/UserFormSheet";
import type { UserRole } from "@/types";

const ROLE_FILTER_OPTIONS: { value: UserRole | "all"; label: string }[] = [
  { value: "all", label: "Semua Role" },
  { value: "admin_client", label: "Admin Client" },
  { value: "admin_gudang_client", label: "Admin Gudang Client" },
  { value: "manajer_koperasi", label: "Manajer Koperasi" },
  { value: "admin_koperasi", label: "Admin Koperasi" },
  { value: "admin_gudang", label: "Admin Gudang" },
];

export default function UserManagementPage() {
  const {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    stats,
    isFormOpen,
    editingId,
    openAddForm,
    openEditForm,
    closeForm,
    form,
    setField,
    isValid,
    isSubmitting,
    saveUser,
    toggleActive,
    toastMessage,
    clients,
    getClientName,
  } = useUsers();

  return (
    <div className="flex flex-col">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 pt-3 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Pengguna</h1>
            <p className="text-xs text-slate-500">
              {stats.active} aktif · {stats.inactive} nonaktif
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama atau email…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Role filter */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
            className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-xs text-slate-700 focus:border-violet-400 focus:outline-none"
          >
            {ROLE_FILTER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
            <UserCog className="mx-auto h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">
              Belum ada pengguna
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {searchQuery || roleFilter !== "all"
                ? "Tidak ada hasil untuk filter ini."
                : "Tambah pengguna pertama."}
            </p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              clientName={getClientName(user.clientId)}
              onEdit={openEditForm}
              onToggleActive={toggleActive}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={openAddForm}
        className="fixed bottom-24 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 shadow-lg shadow-violet-200 active:scale-95 transition-transform md:bottom-6"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      {/* Form sheet */}
      <UserFormSheet
        isOpen={isFormOpen}
        onClose={closeForm}
        form={form}
        setField={setField}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onSave={saveUser}
        editingId={editingId}
        clients={clients}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-28 left-4 right-4 z-50 rounded-xl bg-slate-800 px-4 py-3 shadow-lg md:bottom-8">
          <p className="text-sm font-medium text-white">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
