"use client";

import { useEffect, useRef } from 'react';

export default function MapComponent({ bins, selectedId, onMarkerClick }: { bins?: any[]; selectedId?: string | null; onMarkerClick?: (b: any) => void }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any | null>(null);
  const markersRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    async function init() {
      // Dynamically import Leaflet only on client to avoid SSR errors
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      // Create map instance centered on Netherlands
      map.current = L.map(mapContainer.current!).setView([52.13, 5.29], 7);

      // Add tile layer
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map.current);

      // Custom Ballot Bin icon
      const ballotBinIcon = L.icon({
        iconUrl: '/logo.Bin.png',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
      });

      // helper to geocode address
      async function geocode(address: string) {
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
            { headers: { 'User-Agent': 'BallotBin/1.0 (your-email@example.com)' } }
          );
          if (!geoRes.ok) return null;
          const geo = await geoRes.json();
          if (!Array.isArray(geo) || geo.length === 0) return null;
          const lat = Number(geo[0].lat);
          const lon = Number(geo[0].lon);
          if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
          return { lat, lon };
        } catch (e) {
          return null;
        }
      }

      async function addMarkers(data: any[]) {
        // remove existing markers
        Object.values(markersRef.current).forEach((m) => m.remove());
        markersRef.current = {};

        const bounds: any[] = [];

        await Promise.all(
          data.map(async (b: any) => {
            const address = String(b.kaart || b.location || b.address || '');
            if (!address) return;
            const geo = await geocode(address);
            if (!geo) return;

            const title = String(b.naam || b.name || `Bin ${b.id ?? ''}`);
            const question = String(b.stelling || b.question || '');
            const votesA = Number(b.stemmen_voor ?? 0);
            const votesB = Number(b.stemmen_tegen ?? 0);
            const afvalteller = Number(b.afvalteller ?? 0);
            const capaciteit = Number(b.capaciteit ?? b.capacity ?? 0);
            const capacityPct = capaciteit > 0 ? Math.round((afvalteller / capaciteit) * 100) : 0;

            const popupHtml = `
              <div style="min-width:160px">
                <div style="font-weight:600">${title}</div>
                <div style="font-size:12px;color:#555">${address}</div>
                <div style="margin-top:6px;font-size:13px">${question}</div>
                <div style="margin-top:6px;font-size:12px;color:#333">${b.antwoord_A || 'Optie A'}: ${votesA} · ${b.antwoord_B || 'Optie B'}: ${votesB}</div>
                <div style="margin-top:6px;font-size:12px;color:#333">Vulling: ${capacityPct}%</div>
              </div>
            `;

            const marker = L.marker([geo.lat, geo.lon], { icon: ballotBinIcon }).addTo(map.current!);

            // Do not bind Leaflet popup — use client modal instead. Use click to notify parent.
            marker.on('click', () => {
              if (onMarkerClick) onMarkerClick(b);
            });

            const key = String((b.id ?? b.naam ?? `${geo.lat}_${geo.lon}`).toString()).trim();
            markersRef.current[key] = marker;
            bounds.push([geo.lat, geo.lon]);
          })
        );

        if (bounds.length > 0) {
          const b = L.latLngBounds(bounds as any);
          map.current!.fitBounds(b.pad(0.2));
        }
      }

      // If bins prop provided, use it. Otherwise attempt to fetch the API like before.
      if (Array.isArray(bins) && bins.length > 0) {
        addMarkers(bins);
      } else {
        const apiUrl = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '') : '';
        if (apiUrl) {
          try {
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error('API error');
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) return;
            await addMarkers(data as any[]);
          } catch (e) {
            console.error('Failed to load bins for map', e);
          }
        }
      }
    }

    init();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // react to selectedId changes
  useEffect(() => {
    if (!selectedId) return;
    const key = String(selectedId);
    const m = markersRef.current[key.trim()];
    if (m && map.current) {
      map.current.setView(m.getLatLng(), Math.max(map.current.getZoom(), 14));
    }
  }, [selectedId]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', minHeight: '600px' }} />;
}
