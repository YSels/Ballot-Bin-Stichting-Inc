"use client";

import React, { useEffect, useState } from "react";

type Item = { id: string; naam: string; beschrijving?: string };

export default function ItemsClient({ initialItems }: { initialItems: Item[] | null }) {
  const [items, setItems] = useState<Item[]>(initialItems ?? []);
  const [naam, setNaam] = useState("");
  const [beschrijving, setBeschrijving] = useState("");
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
      setItems(data);
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
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tunnel-Skip-Anti-Phishing-Page": "true",
        },
        body: JSON.stringify({ naam, beschrijving }),
      });
      if (!res.ok) throw new Error(await res.text());
      setNaam("");
      setBeschrijving("");
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
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div>
          <label className="block text-sm font-medium">Naam</label>
          <input
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Beschrijving</label>
          <input
            value={beschrijving}
            onChange={(e) => setBeschrijving(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Opslaan..." : "Opslaan"}
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Items (client)</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="border p-2 rounded shadow-sm">
            <div className="font-medium">{item.naam}</div>
            <div className="text-sm text-gray-500">{item.beschrijving}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
