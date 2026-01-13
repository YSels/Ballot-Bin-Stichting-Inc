'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import '../globals.css';

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center">Kaart wordt geladen...</div>,
});

const KaartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.Bin.png" alt="Trash vote logo" width={40} height={40} />
            <div>
              <h1 className="text-2xl font-extrabold">Trash vote</h1>
              <p className="text-sm text-gray-500">Maakt afval weggooien leuk</p>
            </div>
          </div>
          <nav aria-label="primary" className="hidden sm:block">
            <ul className="flex gap-6 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900" href="/home">Home</a></li>
              <li><a className="text-gray-600 hover:text-gray-900" href="/overzicht">Overzicht</a></li>
              <li><a className="text-indigo-600 font-medium" href="/kaart">Kaart</a></li>
              <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Balllot Bins:</h2>
              <div className="space-y-3">
                
              </div>

              <div className="mt-6">
                <h3 className="text-sm text-gray-500"></h3>
                <ul className="mt-3 space-y-3">
                  <li className="p-3 bg-gray-50 rounded-md flex items-start justify-between">
                    <div>
                      <div className="font-medium">Amsterdam</div>
                      <div className="text-xs text-gray-500">92,06km</div>
                    </div>
                    <button className="text-indigo-600 text-sm">Bekijk</button>
                  </li>
                  <li className="p-3 bg-gray-50 rounded-md flex items-start justify-between">
                    <div>
                      <div className="font-medium">Rotterdam</div>
                      <div className="text-xs text-gray-500">58,67km</div>
                    </div>
                    <button className="text-indigo-600 text-sm">Bekijk</button>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[60vh]">
              <MapComponent />
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Meer locaties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <article className="p-4 border rounded-lg">
                  <h3 className="font-medium">Pyongyang</h3>
                  <p className="text-sm text-gray-500">Type: Restafval · Afstand: 8.417,83km</p>
                </article>
                <article className="p-4 border rounded-lg">
                  <h3 className="font-medium">Funafuti</h3>
                  <p className="text-sm text-gray-500">Type: Plastic · Afstand: 15.199,95km</p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          &copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
};

export default KaartPage;