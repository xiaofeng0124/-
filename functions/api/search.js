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
    // 支持两种搜索引擎: SERPAPI 或 VALUESERP，通过环境变量 SEARCH_ENGINE 切换
    const engine = (env.SEARCH_ENGINE || 'serpapi').toLowerCase();
    let results = [];

    if (engine === 'valueserp') {
      results = await searchValueSerp(query, env);
    } else {
      results = await searchSerpApi(query, env);
    }

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

async function searchSerpApi(query, env) {
  // Strip BOM if present (PowerShell piping issue)
  const rawKey = env.SERPAPI_KEY || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;

  if (!apiKey) {
    throw new Error('SERPAPI_KEY not configured');
  }

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
    throw new Error(`SerpAPI request failed: ${response.status} - ${errText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return (data.shopping_results || [])
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
}

async function searchValueSerp(query, env) {
  const rawKey = env.VALUESERP_KEY || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;

  if (!apiKey) {
    throw new Error('VALUESERP_KEY not configured');
  }

  // ValueSERP API: https://api.valueserp.com/search
  // 使用 tbm=shop 获取 Google Shopping 结果
  const params = new URLSearchParams({
    api_key: apiKey,
    q: query,
    tbm: 'shop',
    gl: 'us',  // 美国市场
    hl: 'en',  // 英文
    num: 20,
  });

  const response = await fetch(`https://api.valueserp.com/search?${params}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`ValueSERP request failed: ${response.status} - ${errText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  // ValueSERP 返回格式与 SerpAPI 类似，包含 shopping_results
  const shoppingItems = data.shopping_results || [];

  // 某些版本可能返回 inline_shopping_results
  const inlineItems = data.inline_shopping_results || [];

  const allItems = [...shoppingItems, ...inlineItems];

  return allItems
    .map((item) => ({
      store: item.source || item.seller || item.store_name || 'Unknown',
      price: item.extracted_price || item.price || 0,
      rating: item.rating || 0,
      reviews:
        typeof item.reviews === 'string'
          ? parseInt(item.reviews.replace(/[^0-9]/g, '')) || 0
          : item.reviews || 0,
      title: item.title || '',
      image: item.thumbnail || item.image || '',
      url: item.link || item.url || '#',
      shipping: item.delivery || item.shipping || null,
    }))
    .filter((item) => item.price > 0);
}
