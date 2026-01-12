import React from 'react';
import '../globals.css';

const OverzichtPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold">Trash vote</h1>
                        <p className="text-sm text-gray-500">Maakt afval weggooien leuk</p>
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

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <aside className="md:col-span-1">
                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-3">Filters</h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                                    <span className="text-sm">Alle type</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                                    <span className="text-sm">Binnen buurt</span>
                                </label>
                            </div>
                        </div>
                    </aside>

                    <section className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Top locaties</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <article className="p-4 border rounded-lg">
                                    <h3 className="font-medium">Prullenbak Centrum</h3>
                                    <p className="text-sm text-gray-500">Stemmen: 124 · Type: Restafval</p>
                                </article>
                                <article className="p-4 border rounded-lg">
                                    <h3 className="font-medium">Afvalpunt Stationsplein</h3>
                                    <p className="text-sm text-gray-500">Stemmen: 98 · Type: Glas</p>
                                </article>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Buurt rankings</h2>
                            <ol className="space-y-3 text-sm text-gray-700">
                                <li className="p-3 bg-gray-50 rounded-md">1. Noordwijk — Score 92</li>
                                <li className="p-3 bg-gray-50 rounded-md">2. Centrum — Score 87</li>
                                <li className="p-3 bg-gray-50 rounded-md">3. Oost — Score 78</li>
                            </ol>
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

export default OverzichtPage;
