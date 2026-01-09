import React from 'react';

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-gray-800 p-4 text-white">
                <h1 className="text-3xl font-bold">Welkom bij Ballot Bin Stichting</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a className="hover:underline" href="#">Home</a></li>
                        <li><a className="hover:underline" href="#">Over Ons</a></li>
                        <li><a className="hover:underline" href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main className="flex-grow bg-white p-8">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold">Onze Missie</h2>
                    <p>Hier komt een korte beschrijving van de missie van de stichting.</p>
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
