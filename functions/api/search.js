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
      engine: 'google',
      q: query,
      device: 'desktop',
      num: '20',
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

  // 从 immersive_products 提取购物数据
  const shoppingItems = data.data?.immersive_products || [];

  // 也试试 organic_results 里的商品卡片
  const organicItems = data.data?.organic_results || [];

  const results = [];

  // 处理购物结果
  for (const item of shoppingItems) {
    const priceStr = (item.price || '').replace(/[^0-9.]/g, '');
    const price = parseFloat(priceStr) || 0;
    if (price <= 0) continue;

    results.push({
      store: item.source || 'Unknown',
      price,
      rating: parseFloat(item.rating) || 0,
      reviews: parseReviewCount(item.reviews) || 0,
      title: item.title || '',
      image: item.thumbnail || item.image || '',
      url: item.link || item.product_link || '#',
      shipping: item.delivery || item.shipping || null,
    });
  }

  // 处理普通结果中带价格的商品
  for (const item of organicItems) {
    if (results.length >= 20) break;
    const richSnippet = item.rich_snippet?.top || {};
    const priceStr = (richSnippet?.price || item.snippet?.price || '').replace(/[^0-9.]/g, '');
    const price = parseFloat(priceStr) || 0;
    if (price <= 0) continue;
    if (results.some(r => r.store === item.domain && Math.abs(r.price - price) < 1)) continue;

    results.push({
      store: item.domain || item.source || 'Unknown',
      price,
      rating: parseFloat(richSnippet?.rating || item.rating || 0) || 0,
      reviews: 0,
      title: item.title || '',
      image: item.thumbnail || '',
      url: item.link || '#',
      shipping: null,
    });
  }

  return results.slice(0, 20);
}

function parseReviewCount(str) {
  if (!str) return 0;
  if (typeof str === 'number') return str;
  const cleaned = str.replace(/[^0-9.]/g, '');
  if (str.includes('K') || str.includes('k')) return Math.round(parseFloat(cleaned) * 1000);
  if (str.includes('M') || str.includes('m')) return Math.round(parseFloat(cleaned) * 1000000);
  return parseInt(cleaned) || 0;
}
