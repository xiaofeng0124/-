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
    // 搜索引擎: serpapi / valueserp / serper，通过环境变量或KV config:search_engine 切换
    const engine = (env.SEARCH_ENGINE || (await env.USERS?.get('config:search_engine')) || 'serpapi').toLowerCase();
    let results = [];

    if (engine === 'serper') {
      results = await searchSerper(query, env);
    } else if (engine === 'valueserp') {
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
    throw new Error(`SerpAPI请求失败: ${response.status} - ${errText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return (data.shopping_results || [])
    .filter(item => item.extracted_price > 0)
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
    }));
}

async function searchValueSerp(query, env) {
  const rawKey = env.VALUESERP_KEY || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;

  if (!apiKey) {
    throw new Error('VALUESERP_KEY not configured');
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    q: query,
    tbm: 'shop',
    gl: 'us',
    hl: 'en',
    num: 20,
  });

  const response = await fetch(`https://api.valueserp.com/search?${params}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`ValueSERP请求失败: ${response.status} - ${errText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  const allItems = [
    ...(data.shopping_results || []),
    ...(data.inline_shopping_results || [])
  ];

  return allItems
    .filter(item => (item.extracted_price || item.price || 0) > 0)
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
    }));
}

async function searchSerper(query, env) {
  const rawKey = env.SERPER_KEY || (await env.USERS?.get('config:serper_key')) || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;

  if (!apiKey) {
    throw new Error('SERPER_KEY not configured，请设置环境变量或KV config:serper_key');
  }

  const response = await fetch('https://google.serper.dev/shopping', {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      gl: 'us',
      num: 20,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Serper请求失败: ${response.status} - ${errText}`);
  }

  const data = await response.json();

  const items = data.shopping || [];

  return items
    .filter(item => item.price)
    .map((item) => {
      // 从 "$199.99" 格式提取数字
      const priceStr = (item.price || '').replace(/[^0-9.]/g, '');
      const price = parseFloat(priceStr) || 0;

      return {
        store: item.source || item.seller || 'Unknown',
        price: price,
        rating: item.rating || 0,
        reviews: item.reviews || parseInt(item.reviewCount) || 0,
        title: item.title || '',
        image: item.imageUrl || '',
        url: item.link || '#',
        shipping: item.delivery || null,
      };
    });
}
