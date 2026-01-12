import React from 'react';
import '../globals.css';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold">Trash vote</h1>
                        <p className="text-sm text-gray-500">maakt afval weggooien leuk</p>
                    </div>
                    <nav aria-label="primary" className="hidden sm:block">
                        <ul className="flex gap-6 text-sm">
                            <li><a className="text-indigo-600 font-medium" href="/home">Home</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/overzicht">Overzicht</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/kaart">Kaart</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <section className="lg:col-span-2">
                        <div className="bg-white p-10 rounded-lg shadow-sm">
                            <h2 className="text-3xl font-extrabold mb-3">Samen maken we schoon</h2>
                            <p className="text-gray-600 mb-6">Vind snel afvalpunten, stem op het netste gebied en doe mee met challenges in je buurt.</p>
                            <div className="flex gap-4">
                                <a href="/kaart" className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md shadow-sm">Bekijk kaart</a>
                                <a href="/overzicht" className="inline-block border border-indigo-600 text-indigo-600 px-5 py-3 rounded-md">Overzicht</a>
                            </div>
                        </div>
                    </section>

                    <aside className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">Snelle acties</h3>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li><a href="/meldingen" className="text-indigo-600">Meld vuil</a></li>
                                <li><a href="/kaart" className="text-indigo-600">Zoek prullenbak</a></li>
                                <li><a href="/overzicht" className="text-indigo-600">Buurtscore</a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="mt-8">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
                    &copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.
                </div>
            </footer>
        </div>
    );
}
