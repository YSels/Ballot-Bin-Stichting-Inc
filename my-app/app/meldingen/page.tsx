import React from 'react';
import '../globals.css';

const MeldingenPage = () => {
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
                            <li><a className="text-gray-600 hover:text-gray-900" href="/home">Home</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/overzicht">Overzicht</a></li>
                            <li><a className="text-gray-600 hover:text-gray-900" href="/kaart">Kaart</a></li>
                            <li><a className="text-indigo-600 font-medium" href="/meldingen">Meldingen</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <aside className="md:col-span-1">
                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-3">Snel melden</h2>
                            <button className="w-full bg-indigo-600 text-white py-2 rounded-md">Nieuwe melding</button>
                        </div>
                    </aside>

                    <section className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Laatst gemeld</h2>
                            <ul className="space-y-3">
                                <li className="p-4 border rounded-md">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium">Vuilniszak op stoep</div>
                                            <div className="text-xs text-gray-500">Gerapporteerd 2u geleden · Type: Restafval</div>
                                        </div>
                                        <button className="text-indigo-600 text-sm">Bekijk</button>
                                    </div>
                                </li>
                                <li className="p-4 border rounded-md">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium">Volle prullenbak</div>
                                            <div className="text-xs text-gray-500">Gerapporteerd 1d geleden · Type: Plastic</div>
                                        </div>
                                        <button className="text-indigo-600 text-sm">Bekijk</button>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Status meldingen</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                <div className="p-3 bg-gray-50 rounded-md text-center">Open: 4</div>
                                <div className="p-3 bg-gray-50 rounded-md text-center">In behandeling: 2</div>
                                <div className="p-3 bg-gray-50 rounded-md text-center">Opgelost: 28</div>
                            </div>
                        </div>
                    </section>
                </div>
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
