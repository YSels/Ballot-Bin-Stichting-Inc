import React from 'react';
import Image from 'next/image';
import '../globals.css';

const MeldingenPage = () => {
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
                            <li><a className="text-gray-600 hover:text-gray-900" href="/overzicht">Overzicht</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/kaart">Kaart</a></li>
                            <li><a className="text-indigo-600 font-medium" href="/meldingen">Meldingen</a></li>
                        </ul>
                    </nav>
                </div>
                
            </header>
            <main className="max-w-7xl mx-auto px-6 py-12">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold">Meldingen</h2>
                    <p>Hier zal een lijst van alle meldingen en rapportages worden getoond.</p>
                </section>
            </main>
            <footer className="bg-gray-800 p-4 text-white">
                <p className="text-center">&copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.</p>
            </footer>
        </div>
    );
};

export default MeldingenPage;
