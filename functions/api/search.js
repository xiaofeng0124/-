// 搜索引擎: Serper
// 原 SerpAPI 已用完额度，代码已清理

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
    const results = await searchSerper(query, env);
    return new Response(JSON.stringify({ results, count: results.length, engine: 'serper' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function searchSerper(query, env) {
  const rawKey = env.SERPER_KEY || (await env.USERS?.get('config:serper_key')) || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;
  if (!apiKey) throw new Error('请配置 SERPER_KEY');

  const response = await fetch('https://google.serper.dev/shopping', {
    method: 'POST',
    headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: query, gl: 'us', results: 40 }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Serper请求失败: ${response.status}`);
  }

  const data = await response.json();
  const items = data.shopping || [];

  return items
    .filter(item => item.price)
    .map((item) => {
      const priceStr = (item.price || '').replace(/[^0-9.]/g, '');
      return {
        store: item.source || item.seller || 'Unknown',
        price: parseFloat(priceStr) || 0,
        rating: item.rating || 0,
        reviews: item.reviews || parseInt(item.reviewCount) || 0,
        title: item.title || '',
        image: item.imageUrl || '',
        url: item.link || '#',
        shipping: item.delivery || null,
      };
    });
}
