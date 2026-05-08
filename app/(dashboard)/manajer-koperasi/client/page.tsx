"use client";

import { Search, Plus, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClients } from "@/hooks/useClients";
import { ClientCard } from "@/components/features/manager/ClientCard";
import { ClientFormSheet } from "@/components/features/manager/ClientFormSheet";
import type { UserRole } from "@/types";

export default function ClientPage() {
  const {
    filteredClients,
    searchQuery,
    setSearchQuery,
    stats,
    isFormOpen,
    openForm,
    closeForm,
    form,
    setField,
    isValid,
    isSubmitting,
    saveClient,
    toastMessage,
    getUser,
    users,
  } = useClients();

  const adminClientUsers = users.filter(
    (u) => u.role === "admin_client" && u.isActive,
  );

  return (
    <div className="flex flex-col">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 pt-3 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Client</h1>
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
            placeholder="Cari client…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-3">
        {filteredClients.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
            <Store className="mx-auto h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">
              Belum ada client
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {searchQuery
                ? "Tidak ada hasil untuk pencarian ini."
                : "Tambah client pertama Anda."}
            </p>
          </div>
        ) : (
          filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              kepalaSppiName={
                client.kepalaSppiId
                  ? getUser(client.kepalaSppiId)?.name
                  : undefined
              }
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={openForm}
        className="fixed bottom-24 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 shadow-lg shadow-violet-200 active:scale-95 transition-transform md:bottom-6"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      {/* Form sheet */}
      <ClientFormSheet
        isOpen={isFormOpen}
        onClose={closeForm}
        form={form}
        setField={setField}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onSave={saveClient}
        adminClientUsers={adminClientUsers}
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
