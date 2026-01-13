import React from 'react';
import Image from 'next/image';
import '../globals.css';
import OverzichtClient from './OverzichtClient';

type Stat = { title: string; value: string; badge?: string };
type Card = { title: string; location: string; question: string; options: [string, number][]; capacity: number };

const OverzichtPage = () => {
    const stats: Stat[] = [
        { title: 'Totaal Ballot Bins', value: '5' },
        { title: 'Actief', value: '3', badge: 'success' },
        { title: 'Vol - Aandacht Nodig', value: '2', badge: 'alert' },
        { title: 'Totaal Stemmen', value: '1.896' },
    ];

    const cards: Card[] = [
        { title: 'Centraal Station', location: 'Stationsplein 1, Amsterdam', question: 'Wat is de beste koffie?', options: [['Cappuccino',127], ['Espresso',89]], capacity: 65 },
        { title: 'Zuiderpark Ingang', location: 'Zuiderpark, Rotterdam', question: 'Wat doe je liever in het park?', options: [['Hardlopen',203], ['Picknicken',156]], capacity: 92 },
        { title: 'Funafuti Beach', location: 'Funafuti, Tuvalu', question: 'Beste seizoen?', options: [['Zomer',341], ['Winter',178]], capacity: 45 },
        { title: 'Leader Kim Honor Place', location: 'Pyongyang, Noord-Korea', question: 'Favoriete kapsel van de grote leider?', options: [['Kaal',89], ['Klassiek',134]], capacity: 30 },
        { title: 'Leidseplein', location: 'Leidseplein, Amsterdam', question: 'Beste uitgaansavond?', options: [['Vrijdag',267], ['Zaterdag',312]], capacity: 98 },
    ];

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
                                <li><a className="text-indigo-600 font-medium" href="/overzicht">Overzicht</a></li>
                                <li><a className="text-gray-600 hover:text-gray-900" href="/kaart">Kaart</a></li>
                                <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
                                <li><a className="text-indigo-600 font-medium" href="/items">Ballot Bin toevoegen</a></li>
                            </ul>
                        </nav>
                </div>
            </header>

            {/* Render client-side overzicht (search/filter) */}
            <OverzichtClient initialStats={stats} initialCards={cards} />

            <footer className="mt-8">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
                    &copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.
                </div>
            </footer>
        </div>
    );
};

export default OverzichtPage;
