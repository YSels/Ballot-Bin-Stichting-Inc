import React from 'react';
import Image from 'next/image';
import '../globals.css';

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
        { title: 'Vondelpark Ingang', location: 'Vondelpark 1, Amsterdam', question: 'Wat doe je liever in het park?', options: [['Hardlopen',203], ['Picknicken',156]], capacity: 92 },
        { title: 'Dam Square', location: 'Dam, Amsterdam', question: 'Beste seizoen?', options: [['Zomer',341], ['Winter',178]], capacity: 45 },
        { title: 'Museumplein', location: 'Museumplein, Amsterdam', question: 'Favoriete kunststroming?', options: [['Modern',89], ['Klassiek',134]], capacity: 30 },
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
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow bg-gray-50 p-8">
                <section className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {stats.map((s: Stat) => (
                        <div key={s.title} className="bg-white p-4 rounded shadow">
                            <div className="text-sm text-gray-500">{s.title}</div>
                            <div className="text-2xl font-bold mt-2">{s.value}</div>
                        </div>
                    ))}
                </section>

                <section className="mb-6">
                    <div className="max-w-3xl">
                        <input
                            placeholder="Zoek op naam of locatie..."
                            className="w-full rounded border p-3 bg-white shadow-sm"
                        />
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {cards.map((c: Card) => {
                        const totalVotes = c.options.reduce((a: number, b: [string, number]) => a + Number(b[1]), 0);
                        return (
                            <div key={c.title} className="bg-white rounded-lg p-6 shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-semibold">{c.title}</div>
                                        <div className="text-xs text-gray-500">{c.location}</div>
                                    </div>
                                    <div className="text-sm text-green-600 font-medium">Actief</div>
                                </div>

                                <div className="mt-4 text-sm text-gray-700">{c.question}</div>

                                <div className="mt-3 space-y-3">
                                    {c.options.map((o: any, idx: number) => {
                                        const pct = totalVotes ? Math.round((Number(o[1]) / totalVotes) * 100) : 0;
                                        const barColor = idx === 0 ? 'bg-blue-500' : 'bg-purple-500';
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

            <footer className="mt-8">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
                    &copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.
                </div>
            </footer>
        </div>
    );
};

export default OverzichtPage;
