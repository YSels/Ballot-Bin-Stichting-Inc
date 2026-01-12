import React from 'react';
import '../globals.css';

const MeldingenPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold">Trash vote</h1>
                        <p className="text-sm text-gray-500">Maakt afval weggooien leuk</p>
                    </div>
                    <nav aria-label="primary" className="hidden sm:block">
                        <ul className="flex gap-6 text-sm">
                            <li><a className="text-gray-600 hover:text-gray-900" href="/home">Home</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/overzicht">Overzicht</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/kaart">Kaart</a></li>
                            <li><a className="text-indigo-600 font-medium" href="/meldingen">Meldingen</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">
                <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold">Meldingen</h2>
                    <p>Hier zal een lijst van alle meldingen en rapportages worden getoond.</p>
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

export default MeldingenPage;
