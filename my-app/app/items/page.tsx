import ItemsClient from "./ItemsClient";

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
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Overzicht</h1>
        {/* Server-fetched initial items are passed to the client component */}
        {/* Client component handles client-side refresh & posting */}
        <ItemsClient initialItems={items} />
      </div>
    );
  } catch (err: any) {
    // Toon een duidelijke foutmelding in de pagina zodat je weet wat er misgaat
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Overzicht</h1>
        <div className="p-4 border rounded bg-red-50 text-red-700">
          Fout bij ophalen data: {String(err.message ?? err)}
        </div>
      </div>
    );
  }
}
