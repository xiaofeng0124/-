// Amazon 商品搜索（通过 Amazon Scraper API）
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

  const rawKey = env.ASA_KEY || (await env.USERS?.get('config:asa_key')) || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;
  if (!apiKey) {
    return new Response(JSON.stringify({ results: [], count: 0 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiUrl = new URL('https://api.amazonscraperapi.com/api/v1/amazon/search');
    apiUrl.searchParams.set('api_key', apiKey);
    apiUrl.searchParams.set('query', query);
    apiUrl.searchParams.set('domain', 'com');

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      return new Response(JSON.stringify({ results: [], count: 0 }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const items = data.results || [];

    const results = items
      .filter(item => item.price?.current)
      .map(item => ({
        store: 'Amazon',
        price: item.price.current || 0,
        rating: item.rating?.average || 0,
        reviews: item.rating?.count || 0,
        title: item.title || '',
        image: item.images?.[0] || '',
        url: item.url || '#',
        shipping: item.buybox?.prime ? 'Free Prime' : null,
      }))
      .filter(item => item.price > 0);

    return new Response(JSON.stringify({ results, count: results.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, results: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
