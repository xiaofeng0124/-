// 搜索引擎: TalorData（替代 Serper）
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
  if (!apiKey) throw new Error('请配置 TALORDATA_KEY');

  const response = await fetch('https://serpapi.talordata.net/serp/v1/request', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      engine: 'google_shopping',
      q: query,
      num: '40',
      json: '1',
    }),
  });

  if (!response.ok) {
    throw new Error(`TalorData请求失败: ${response.status}`);
  }

  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`TalorData错误: ${JSON.stringify(data)}`);
  }

  const items = data.data?.shopping || [];
  const results = [];

  for (const item of items) {
    const price = parseFloat((item.price || '').replace(/[^0-9.]/g, '')) || 0;
    if (price <= 0) continue;

    results.push({
      store: item.source || 'Unknown',
      price,
      rating: parseFloat(item.rating) || 0,
      reviews: parseReviewCount(item.reviews) || 0,
      title: item.title || '',
      image: item.img_link || '',
      url: item.product_link || '#',
      shipping: item.guarantee || null,
    });
  }

  return results.slice(0, 30);
}

function parseReviewCount(str) {
  if (!str) return 0;
  if (typeof str === 'number') return str;
  const cleaned = str.replace(/[^0-9.]/g, '');
  if (str.includes('K') || str.includes('k')) return Math.round(parseFloat(cleaned) * 1000);
  if (str.includes('M') || str.includes('m')) return Math.round(parseFloat(cleaned) * 1000000);
  return parseInt(cleaned) || 0;
}
