import React from 'react';
import Image from 'next/image';
import '../globals.css';
import KaartClient from './KaartClient';

const KaartPage = async () => {
  const apiUrl = process.env.BALLOT_API_URL || process.env.NEXT_PUBLIC_BALLOT_API_URL || process.env.NEXT_PUBLIC_API_URL || '';
  let bins: any[] = [];
  if (apiUrl) {
    try {
      const res = await fetch(apiUrl);
      if (res.ok) bins = await res.json();
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.Bin.png" alt="Trash vote logo" width={40} height={40} />
            <div>
              <h1 className="text-2xl font-extrabold">Trash Vote</h1>
              <p className="text-sm text-gray-500">Maakt afval weggooien leuk</p>
            </div>
          </div>
          <nav aria-label="primary" className="hidden sm:block">
            <ul className="flex gap-6 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900" href="/home">Home</a></li>
              <li><a className="text-gray-600 hover:text-gray-900" href="/overzicht">Overzicht</a></li>
              <li><a className="text-indigo-600 font-medium" href="/kaart">Kaart</a></li>
              <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
              <li><a className="text-indigo-600 font-medium" href="/items">Ballot Bin toevoegen</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Client-side UI: list + map. KaartClient handles layout and interactions. */}
      <KaartClient bins={bins} />

      <footer className="mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          &copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
};

export default KaartPage;