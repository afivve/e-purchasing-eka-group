"use client";

import { Plus, Truck } from "lucide-react";
import { useArmada } from "@/hooks/useArmada";
import { ArmadaCard } from "@/components/features/transporter/ArmadaCard";
import { ArmadaFormSheet } from "@/components/features/transporter/ArmadaFormSheet";

export default function TransporterArmadaPage() {
  const {
    armada,
    isFormOpen,
    editingId,
    openAddForm,
    openEditForm,
    closeForm,
    form,
    setField,
    isValid,
    isSubmitting,
    saveArmada,
    toggleActive,
    toastMessage,
    jenisOptions,
  } = useArmada();

  const activeCount = armada.filter((a) => a.isActive).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-800">Manajemen Armada</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {activeCount} dari {armada.length} kendaraan aktif
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
        {armada.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Truck size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Belum ada armada terdaftar.</p>
          </div>
        ) : (
          armada.map((a) => (
            <ArmadaCard
              key={a.id}
              armada={a}
              onToggleActive={toggleActive}
              onEdit={openEditForm}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={openAddForm}
        className="fixed bottom-20 right-4 z-30 w-14 h-14 rounded-full bg-sky-600 text-white shadow-lg flex items-center justify-center hover:bg-sky-700 active:scale-95 transition-transform"
        aria-label="Tambah Armada"
      >
        <Plus size={24} />
      </button>

      {/* Form Sheet */}
      <ArmadaFormSheet
        isOpen={isFormOpen}
        onClose={closeForm}
        form={form}
        setField={setField}
        onSave={saveArmada}
        isValid={isValid}
        isSubmitting={isSubmitting}
        jenisOptions={jenisOptions}
        isEditing={editingId !== null}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white text-xs px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
