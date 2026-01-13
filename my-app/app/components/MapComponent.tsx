'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Create map instance centered on Netherlands
    map.current = L.map(mapContainer.current).setView([52.13, 5.29], 7);

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

    // Add Ballot Bin markers in Netherlands
    L.marker([52.37, 4.89], { icon: ballotBinIcon })
      .addTo(map.current)
      .bindPopup('Ballot Bin, Amsterdam')
      .openPopup();

    L.marker([51.92, 4.48], { icon: ballotBinIcon })
      .addTo(map.current)
      .bindPopup('Ballot Bin, Rotterdam');

    L.marker([39.03, 125.75], { icon: ballotBinIcon })
      .addTo(map.current)
      .bindPopup('Ballot Bin, Pyongyang');

    L.marker([-8.52, 179.19], { icon: ballotBinIcon })
      .addTo(map.current)
      .bindPopup('Ballot Bin, Funafuti');
    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', minHeight: '600px' }} />;
}
