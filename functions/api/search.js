// 搜索引擎: TalorData
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
    const results = await searchTalorData(query, env);
    return new Response(JSON.stringify({ results, count: results.length, engine: 'talordata' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function searchTalorData(query, env) {
  const rawKey = env.TALORDATA_KEY || (await env.USERS?.get('config:talordata_key')) || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;
  if (!apiKey) throw new Error('TALORDATA_KEY not configured');

  const response = await fetch('https://serpapi.talordata.net/serp/v1/request', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      engine: 'google_shopping',
      q: query,
      num: '20',
      json: '1',
    }),
  });

  if (!response.ok) {
    throw new Error(`TalorData请求失败: ${response.status}`);
  }

  const data = await response.json();
  if (data.code !== 0) {
    throw new Error('TalorData返回错误');
  }

  const items = data.data?.shopping || [];

  return items
    .filter(item => {
      const price = parseFloat((item.price || '').replace(/[^0-9.]/g, '')) || 0;
      return price > 0;
    })
    .map((item) => ({
      store: item.source || 'Unknown',
      price: parseFloat((item.price || '').replace(/[^0-9.]/g, '')) || 0,
      rating: parseFloat(item.rating) || 0,
      reviews: parseTalorDataReviews(item.reviews),
      title: item.title || '',
      image: item.img_link || '',
      url: item.product_link || '#',
      shipping: item.guarantee || null,
    }))
    .slice(0, 30);
}

function parseTalorDataReviews(str) {
  if (!str) return 0;
  if (typeof str === 'number') return str;
  const cleaned = str.replace(/[^0-9.]/g, '');
  if (/[kK]/.test(str)) return Math.round(parseFloat(cleaned) * 1000);
  if (/[mM]/.test(str)) return Math.round(parseFloat(cleaned) * 1000000);
  return parseInt(cleaned) || 0;
}
