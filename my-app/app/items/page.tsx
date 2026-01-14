import ItemsClient from "./ItemsClient";
import Image from 'next/image';
import '../globals.css';

async function getItems() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is niet ingesteld');
  const res = await fetch(apiUrl, {
    headers: {
      "X-Tunnel-Skip-Anti-Phishing-Page": "true",
    },
    cache: 'no-store'
  });
  // Lees als tekst zodat we veilig kunnen controleren op lege/HTML/ongeldige responses
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`API fout ${res.status}: ${text}`);
  }
  if (!text) return [];
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Ongeldige JSON response van API: ${text}`);
  }
}

export default async function ItemsOverzicht() {
  try {
    const items = await getItems();
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo.Bin.png" alt="Trash vote logo" width={40} height={40} />
              <div>
                <h1 className="text-2xl font-extrabold">Trash Vote</h1>
                <p className="text-sm text-gray-500">Maakt afval weggooien leuk</p>
              </div>
            </div>
            <nav aria-label="primary" className="hidden sm:block">
              <ul className="flex gap-6 text-sm">
                <li><a className="text-gray-600 hover:text-gray-900" href="/home">Home</a></li>
                <li><a className="text-gray-600 hover:text-gray-900" href="/overzicht">Overzicht</a></li>
                <li><a className="text-gray-600 hover:text-gray-900" href="/kaart">Kaart</a></li>
                <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
                <li><a className="text-indigo-600 font-medium" href="/items">Ballot Bin toevoegen</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Ballot Bin toevoegen</h1>
            {/* Server-fetched initial items are passed to the client component */}
            {/* Client component handles client-side refresh & posting */}
            <ItemsClient initialItems={items} />
          </div>
        </main>
      </div>
    );
  } catch (err: any) {
    // Toon een duidelijke foutmelding in de pagina zodat je weet wat er misgaat
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
                <li><a className="text-gray-600 hover:text-gray-900" href="/meldingen">Meldingen</a></li>
                <li><a className="text-indigo-600 font-medium" href="/items">Ballot Bin toevoegen</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Ballot Bin toevoegen</h1>
            <div className="p-4 border rounded bg-red-50 text-red-700">
              Fout bij ophalen data: {String(err.message ?? err)}
            </div>
          </div>
        </main>
      </div>
    );
  }
}
