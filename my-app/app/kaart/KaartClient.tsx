"use client";

import React, { useState } from 'react';
import { MapComponent, BinList } from '../components';

export default function KaartClient({ bins }: { bins: any[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalBin, setModalBin] = useState<any | null>(null);

  function handleView(bin: any) {
    setSelectedId(String(bin.id ?? bin.naam ?? '').trim());
    setModalBin(bin);
  }

  function handleClose() {
    setModalBin(null);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Balllot Bins:</h2>
            <div className="space-y-3">
              <BinList bins={bins} onView={handleView} />
            </div>
          </div>
        </aside>

        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[60vh]">
            <MapComponent bins={bins} selectedId={selectedId} onMarkerClick={(b) => handleView(b)} />
          </div>

        </section>
      </div>

      {/* Modal for bin details */}
      {modalBin && (
        <div onClick={handleClose} className="fixed inset-0 bg-black/40 flex items-center justify-center z-[10000]">
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{modalBin.naam || modalBin.name}</h3>
              <button className="text-gray-500" onClick={handleClose}>Sluiten</button>
            </div>
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              <div><strong>Adres:</strong> {modalBin.kaart}</div>
              <div><strong>Stelling:</strong> {modalBin.stelling}</div>
              <div><strong>Antwoord A:</strong> {modalBin.antwoord_A} ({modalBin.stemmen_voor})</div>
              <div><strong>Antwoord B:</strong> {modalBin.antwoord_B} ({modalBin.stemmen_tegen})</div>
              <div><strong>Afvalteller:</strong> {modalBin.afvalteller}</div>
              <div><strong>Capaciteit:</strong> {modalBin.capaciteit}</div>
              <div><strong>Status:</strong> {modalBin.prullenbak_status}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
