"use client";

import React, { useMemo, useState } from "react";

type Stat = { title: string; value: string; badge?: string };
type Card = { title: string; location: string; question: string; options: [string, number][]; capacity: number; status?: string };

export default function OverzichtClient({ initialStats, initialCards }: { initialStats: Stat[]; initialCards: Card[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialCards;
    return initialCards.filter((c) => c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q));
  }, [query, initialCards]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        {initialStats.map((s) => (
          <div key={s.title} className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">{s.title}</div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <div className="max-w-3xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek op naam of locatie..."
            className="w-full rounded border p-3 bg-white shadow-sm"
            aria-label="Zoek locaties"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filtered.map((c) => {
          const totalVotes = c.options.reduce((a, b) => a + Number(b[1]), 0);
          const st = String(c.status ?? '').toLowerCase();
          let statusLabel = 'Status onbekend';
          let statusClass = 'text-gray-600';
          if (st) {
            if (st.includes('oper') || st.includes('act')) {
              statusLabel = 'Actief';
              statusClass = 'text-green-600';
            } else if (st.includes('vol') || st.includes('full')) {
              statusLabel = 'Vol';
              statusClass = 'text-orange-600';
            } else if (st.includes('construct') || st.includes('bouw')) {
              statusLabel = 'In constructie';
              statusClass = 'text-yellow-600';
            } else if (st.includes('buiten') || st.includes('niet')) {
              statusLabel = 'Buiten Werking';
              statusClass = 'text-red-600';
            } else if (st.includes('defect') || st.includes('buiten') || st.includes('broken') || st.includes('niet')) {
              statusLabel = 'Defect';
              statusClass = 'text-red-600';
            } else {
              statusLabel = c.status ?? statusLabel;
              statusClass = 'text-gray-600';
            }
          }
          return (
            <div key={c.title} className="bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-xs text-gray-500">{c.location}</div>
                </div>
                <div className={`text-sm font-medium ${statusClass}`}>{statusLabel}</div>
              </div>

              <div className="mt-4 text-sm text-gray-700">{c.question}</div>

              <div className="mt-3 space-y-3">
                {c.options.map((o, idx) => {
                  const pct = totalVotes ? Math.round((Number(o[1]) / totalVotes) * 100) : 0;
                  const barColor = idx === 0 ? "bg-blue-500" : "bg-purple-500";
                  return (
                    <div key={o[0]}>
                      <div className="flex justify-between text-sm text-gray-600">
                        <div>{o[0]}</div>
                        <div>{o[1]} ({pct}%)</div>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded mt-1">
                        <div className={`h-2 rounded ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-sm text-gray-600">Capaciteit</div>
              <div className="w-full bg-gray-200 h-3 rounded mt-1">
                <div className="h-3 rounded bg-green-500" style={{ width: `${c.capacity}%` }} />
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
