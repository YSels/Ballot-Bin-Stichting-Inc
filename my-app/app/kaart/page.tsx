import React from 'react';
import '../globals.css';

const KaartPage = () => {
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
                    <h2 className="text-2xl font-semibold">Kaart</h2>
                    <p>Hier zal de interactieve kaart met afvalverzamellocaties worden getoond.</p>
                </section>
            </main>
            <footer className="bg-gray-800 p-4 text-white">
                <p className="text-center">&copy; 2026 Ballot Bin Stichting. Alle rechten voorbehouden.</p>
            </footer>
        </div>
    );
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
              <li><a className="text-indigo-600 font-medium" href="/kaart">Kaart</a></li>
              <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Filters</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Restafval</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Plastic</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Glas</span>
                </label>
              </div>

              <div className="mt-6">
                <h3 className="text-sm text-gray-500">Locaties in de buurt</h3>
                <ul className="mt-3 space-y-3">
                  <li className="p-3 bg-gray-50 rounded-md flex items-start justify-between">
                    <div>
                      <div className="font-medium">Prullenbak A</div>
                      <div className="text-xs text-gray-500">200m - Plastic</div>
                    </div>
                    <button className="text-indigo-600 text-sm">Bekijk</button>
                  </li>
                  <li className="p-3 bg-gray-50 rounded-md flex items-start justify-between">
                    <div>
                      <div className="font-medium">Afvalpunt B</div>
                      <div className="text-xs text-gray-500">350m - Glas</div>
                    </div>
                    <button className="text-indigo-600 text-sm">Bekijk</button>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[60vh]">
              <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-gray-400">
                Kaartplaceholder — plaats hier je interactieve kaart (Leaflet/Mapbox/Google Maps)
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Meer locaties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <article className="p-4 border rounded-lg">
                  <h3 className="font-medium">Locatie X</h3>
                  <p className="text-sm text-gray-500">Type: Restafval · Afstand: 120m</p>
                </article>
                <article className="p-4 border rounded-lg">
                  <h3 className="font-medium">Locatie Y</h3>
                  <p className="text-sm text-gray-500">Type: Plastic · Afstand: 450m</p>
                </article>
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

export default KaartPage;