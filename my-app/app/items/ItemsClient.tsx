"use client";

import React, { useEffect, useState } from "react";

type RawItem = Record<string, any>;
type Item = {
  id: string;
  naam?: string;
  stelling?: string;
  antwoord_A?: string;
  antwoord_B?: string;
  kaart?: string;
  raw?: RawItem;
};

function normalize(raw: RawItem): Item {
  const id = raw?.id != null ? String(raw.id).trim() : String(raw?.ID ?? raw?._id ?? '');
  return {
    id,
    naam: raw?.naam ?? raw?.username ?? raw?.name ?? '',
    stelling: raw?.stelling ?? raw?.question ?? raw?.vraag ?? '',
    antwoord_A: raw?.antwoord_A ?? raw?.optionA ?? raw?.optA ?? raw?.antwoordA ?? '',
    antwoord_B: raw?.antwoord_B ?? raw?.optionB ?? raw?.optB ?? raw?.antwoordB ?? '',
    kaart: raw?.kaart ?? raw?.location ?? raw?.adres ?? raw?.address ?? '',
    raw,
  };
}

export default function ItemsClient({ initialItems }: { initialItems: any[] | null }) {
  const [items, setItems] = useState<Item[]>((initialItems ?? []).map(normalize));
  const [naam, setNaam] = useState('');
  const [stelling, setStelling] = useState('');
  const [antwoordA, setAntwoordA] = useState('');
  const [antwoordB, setAntwoordB] = useState('');
  const [kaart, setKaart] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchItems() {
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is niet ingesteld");
      return;
    }
    try {
      const res = await fetch(apiUrl, {
        headers: { "X-Tunnel-Skip-Anti-Phishing-Page": "true" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Netwerkfout ${res.status}`);
      const data = await res.json();
      // normalize incoming items so UI can render consistent fields
      setItems(Array.isArray(data) ? data.map(normalize) : []);
    } catch (err) {
      console.error("Fout bij ophalen items:", err);
    }
  }

  useEffect(() => {
    // refresh items client-side to ensure latest state
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!apiUrl) {
      alert("Geen API URL gevonden. Voeg NEXT_PUBLIC_API_URL toe aan .env.local");
      return;
    }
    setLoading(true);
    try {
      const body = {
        naam: naam || undefined,
        stelling: stelling || undefined,
        antwoord_A: antwoordA || undefined,
        antwoord_B: antwoordB || undefined,
        kaart: kaart || undefined,
      };
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tunnel-Skip-Anti-Phishing-Page': 'true',
        },
        body: JSON.stringify(body),
      });
      if (res.status === 405) {
        alert('Posting is niet toegestaan door de backend (405).');
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(await res.text());
      setNaam('');
      setStelling('');
      setAntwoordA('');
      setAntwoordB('');
      setKaart('');
      await fetchItems();
    } catch (err) {
      console.error("Fout bij posten item:", err);
      alert("Fout bij opslaan item. Zie console voor details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Nieuwe Ballot Bin Toevoegen</h3>
        <div>
          <label className="block text-sm font-medium">Naam van de Ballot Bin</label>
          <input value={naam} onChange={(e) => setNaam(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="Bijv. Centraal Station" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Adres / Kaart</label>
          <input value={kaart} onChange={(e) => setKaart(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="Bijv. Stationsplein 1, Amsterdam" />
        </div>

        <div>
          <label className="block text-sm font-medium">Vraag / Stelling</label>
          <input value={stelling} onChange={(e) => setStelling(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="Bijv. Wat is de beste koffie?" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Optie A (Links)</label>
            <input value={antwoordA} onChange={(e) => setAntwoordA(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="Bijv. Cappuccino" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Optie B (Rechts)</label>
            <input value={antwoordB} onChange={(e) => setAntwoordB(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="Bijv. Espresso" required />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded">{loading ? 'Opslaan...' : 'Ballot Bin Toevoegen'}</button>
          <button type="button" onClick={() => { setNaam(''); setStelling(''); setAntwoordA(''); setAntwoordB(''); setKaart(''); }} className="px-4 py-2 border rounded">Annuleren</button>
        </div>

        <div className="mt-4">
          <h4 className="text-sm text-gray-600 mb-2">Preview Scherm</h4>
          <div className="p-4 border rounded bg-gray-50">
            <div className="text-center text-sm text-gray-500 mb-2">{stelling || 'Jouw vraag hier'}</div>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-2 bg-blue-500 text-white rounded">{antwoordA || 'Optie A'}</button>
              <button className="px-6 py-2 bg-purple-500 text-white rounded">{antwoordB || 'Optie B'}</button>
            </div>
          </div>
        </div>
      </form>

      
    </div>
  );
}
