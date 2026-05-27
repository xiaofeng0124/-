export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing query' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Strip BOM if present (PowerShell piping issue)
    const rawKey = env.SERPAPI_KEY || '';
    const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;

    const params = new URLSearchParams({
      engine: 'google_shopping',
      q: query,
      api_key: apiKey,
      num: 20,
      currency: 'USD',
    });

    const response = await fetch(`https://serpapi.com/search?${params}`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: 'SerpAPI request failed', status: response.status }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const results = (data.shopping_results || [])
      .map((item) => ({
        store: item.source || item.seller || 'Unknown',
        price: item.extracted_price || 0,
        rating: item.rating || 0,
        reviews:
          typeof item.reviews === 'string'
            ? parseInt(item.reviews.replace(/[^0-9]/g, '')) || 0
            : item.reviews || 0,
        title: item.title || '',
        image: item.thumbnail || '',
        url: item.link || '#',
        shipping: item.delivery || null,
      }))
      .filter((item) => item.price > 0);

    return new Response(JSON.stringify({ results, count: results.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
