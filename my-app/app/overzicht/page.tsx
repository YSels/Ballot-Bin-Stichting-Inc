import React from 'react';
import Image from 'next/image';
import '../globals.css';
import OverzichtClient from './OverzichtClient';

type Stat = { title: string; value: string; badge?: string };
type Card = { title: string; location: string; question: string; options: [string, number][]; capacity: number };

const OverzichtPage = async () => {
    const fallbackStats: Stat[] = [
        { title: 'Totaal Ballot Bins', value: '5' },
        { title: 'Actief', value: '3', badge: 'success' },
        { title: 'Vol - Aandacht Nodig', value: '2', badge: 'alert' },
        { title: 'Totaal Stemmen', value: '1.896' },
    ];

    const fallbackCards: Card[] = [
        { title: 'Centraal Station', location: 'Stationsplein 1, Amsterdam', question: 'Wat is de beste koffie?', options: [['Cappuccino',127], ['Espresso',89]], capacity: 65 },
        { title: 'Zuiderpark Ingang', location: 'Zuiderpark, Rotterdam', question: 'Wat doe je liever in het park?', options: [['Hardlopen',203], ['Picknicken',156]], capacity: 92 },
        { title: 'Funafuti Beach', location: 'Funafuti, Tuvalu', question: 'Beste seizoen?', options: [['Zomer',341], ['Winter',178]], capacity: 45 },
        { title: 'Leader Kim Honor Place', location: 'Pyongyang, Noord-Korea', question: 'Favoriete kapsel van de grote leider?', options: [['Kaal',89], ['Klassiek',134]], capacity: 30 },
        { title: 'Leidseplein', location: 'Leidseplein, Amsterdam', question: 'Beste uitgaansavond?', options: [['Vrijdag',267], ['Zaterdag',312]], capacity: 98 },
    ];

    let stats: Stat[] = fallbackStats;
    let cards: Card[] = fallbackCards;

    const apiUrl = process.env.BALLOT_API_URL || process.env.NEXT_PUBLIC_BALLOT_API_URL || process.env.NEXT_PUBLIC_API_URL || '';
    if (apiUrl) {
        try {
            const res = await fetch(apiUrl, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    const bins = data;
                    cards = bins.map((b: any) => {
                        const title = b.naam || b.name || (`Bin ${String(b.id ?? '')}`);
                        const location = b.kaart || b.location || b.address || '';
                        const question = b.stelling || b.question || '';
                        const votesA = Number(b.stemmen_voor ?? b.votes_for ?? 0);
                        const votesB = Number(b.stemmen_tegen ?? b.votes_against ?? 0);
                        const optionA = String(b.antwoord_A ?? 'Optie A');
                        const optionB = String(b.antwoord_B ?? 'Optie B');
                        const afvalteller = Number(b.afvalteller ?? 0);
                        const capaciteitRaw = Number(b.capaciteit ?? b.capacity ?? 0);
                        const capacityPct = capaciteitRaw > 0 ? Math.round((afvalteller / capaciteitRaw) * 100) : 0;
                        const options: [string, number][] = [[optionA, votesA], [optionB, votesB]];
                        return { title, location, question, options, capacity: capacityPct } as Card;
                    });

                    const total = cards.length;
                    const active = bins.filter((b: any) => {
                        const status = String(b.prullenbak_status ?? b.status ?? '').toLowerCase();
                        if (!status) return false;
                        return (
                            status.includes('oper') || // matches 'operationeel' / 'operational'
                            status.includes('act') || // matches 'active'
                            status.includes('bueno') ||
                            status.includes('ok') ||
                            status === 'true'
                        );
                    }).length;
                    const full = bins.filter((b: any) => {
                        const afvalteller = Number(b.afvalteller ?? 0);
                        const capaciteitRaw = Number(b.capaciteit ?? b.capacity ?? 0);
                        return capaciteitRaw > 0 ? (afvalteller / capaciteitRaw) >= 0.9 : false;
                    }).length;
                    const totalVotes = bins.reduce((sum: number, b: any) => sum + (Number(b.stemmen_voor ?? 0) + Number(b.stemmen_tegen ?? 0)), 0);

                    stats = [
                        { title: 'Totaal Ballot Bins', value: String(total) },
                        { title: 'Actief', value: String(active), badge: 'success' },
                        { title: 'Vol - Aandacht Nodig', value: String(full), badge: 'alert' },
                        { title: 'Totaal Stemmen', value: String(totalVotes) },
                    ];
                }
            }
        } catch (e) {
            
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
                                <li><a className="text-indigo-600 font-medium" href="/overzicht">Overzicht</a></li>
                                <li><a className="text-gray-600 hover:text-gray-900" href="/kaart">Kaart</a></li>
                                <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
                                <li><a className="text-indigo-600 font-medium" href="/items">Ballot Bin toevoegen</a></li>
                            </ul>
                        </nav>
                </div>
            </header>

            {/* Render client-side overzicht (search/filter) */}
            <OverzichtClient initialStats={stats} initialCards={cards} /><br></br><br></br><br></br><br></br>

            <footer className="mt-8">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
                    &copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.
                </div>
            </footer>
        </div>
    );
};

export default OverzichtPage;
