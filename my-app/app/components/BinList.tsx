"use client";

import React from 'react';

export default function BinList({ bins, onView }: { bins: any[]; onView: (b: any) => void }) {
  if (!Array.isArray(bins) || bins.length === 0) return <div className="text-sm text-gray-500">Geen ballot bins gevonden.</div>;

  return (
    <ul className="mt-3 space-y-3">
      {bins.map((b) => (
        <li key={b.id ?? b.naam} className="p-3 bg-gray-50 rounded-md flex items-start justify-between">
          <div>
            <div className="font-medium">{b.naam}</div>
            <div className="text-xs text-gray-500">{b.kaart}</div>
          </div>
          <button className="text-indigo-600 text-sm" onClick={() => onView(b)}>Bekijk</button>
        </li>
      ))}
    </ul>
  );
}
