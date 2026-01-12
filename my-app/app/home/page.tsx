import React from 'react';
import '../globals.css';

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-gray-800 px-8 py-6 text-white">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">Trash vote</h1>
                    <h2 className="text-lg text-gray-300">Maakt afval weggooien leuk</h2>
                </div>
                <nav>
                    <ul className="flex justify-between space-x-8">
                        <li><a className="hover:underline text-lg" href="/home">Home</a></li>
                        <li><a className="hover:underline text-lg" href="/overzicht">Overzicht</a></li>
                        <li><a className="hover:underline text-lg" href="/kaart">Kaart</a></li>
                        <li><a className="hover:underline text-lg" href="/meldingen">Meldingen</a></li>
                    </ul>
                </nav>
            </header>
            <main className="flex-grow bg-white p-8">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold">Onze Missie</h2>
                    <p>Afval weggooien leuk maken!</p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold">Nieuws</h2>
                    <p>Hier komt het laatste nieuws.</p>
                </section>
            </main>
            <footer className="bg-gray-800 p-4 text-white">
                <p className="text-center">&copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.</p>
            </footer>
        </div>
    );
};

export default HomePage;
