// 多引擎自动降级搜索
// 顺序: SerpAPI（花完已付额度）→ Serper（预付费，长期用）
// 额度用完自动标记停用，24小时后重置
// ValueSERP 待完善（接口格式不匹配），后续加上

const ENGINES = ['serpapi', 'serper'];
const ENGINE_NAMES = {
  serpapi: 'SerpAPI',
  serper: 'Serper'
};

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
    let results = [];
    let usedEngine = '';

    for (const engine of ENGINES) {
      // 检查这个引擎是否已被标记为额度用完
      const exhaustedKey = `config:engine_exhausted:${engine}`;
      const isExhausted = await env.USERS?.get(exhaustedKey);
      if (isExhausted) continue;

      try {
        // 尝试用当前引擎搜索
        if (engine === 'serpapi') results = await searchSerpApi(query, env);
        else if (engine === 'serper') results = await searchSerper(query, env);

        if (results.length > 0) {
          usedEngine = engine;
          break; // 这个引擎有结果，就用它
        }
      } catch (e) {
        // 标记这个引擎额度已用完，后续跳过
        console.warn(`${ENGINE_NAMES[engine]} 失败: ${e.message}，标记为已用尽`);
        try {
          await env.USERS?.put(exhaustedKey, '1', { expirationTtl: 86400 }); // 24小时后自动重置
        } catch (_) {}
      }
    }

    if (results.length === 0) {
      // 所有引擎都失效了，清理标记等 Serper 额度恢复
      await cleanupExhaustedFlags(env);
      throw new Error('所有搜索引擎额度已用尽，请充值');
    }

    return new Response(JSON.stringify({ results, count: results.length, engine: usedEngine }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function cleanupExhaustedFlags(env) {
  try {
    for (const engine of ENGINES) {
      await env.USERS?.delete(`config:engine_exhausted:${engine}`);
    }
  } catch (_) {}
}

// ---- 引擎实现 ----
async function searchSerpApi(query, env) {
  const rawKey = env.SERPAPI_KEY || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;
  if (!apiKey) throw new Error('SerpAPI 未配置');

  const params = new URLSearchParams({
    engine: 'google_shopping', q: query, api_key: apiKey, num: 20, currency: 'USD',
  });

  const response = await fetch(`https://serpapi.com/search?${params}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error);

  return (data.shopping_results || [])
    .filter(item => item.extracted_price > 0)
    .map((item) => ({
      store: item.source || item.seller || 'Unknown',
      price: item.extracted_price || 0,
      rating: item.rating || 0,
      reviews: typeof item.reviews === 'string'
        ? parseInt(item.reviews.replace(/[^0-9]/g, '')) || 0
        : item.reviews || 0,
      title: item.title || '',
      image: item.thumbnail || '',
      url: item.link || '#',
      shipping: item.delivery || null,
    }));
}

async function searchSerper(query, env) {
  const rawKey = env.SERPER_KEY || (await env.USERS?.get('config:serper_key')) || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;
  if (!apiKey) throw new Error('Serper 未配置');

  const response = await fetch('https://google.serper.dev/shopping', {
    method: 'POST',
    headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: query, gl: 'us', num: 20 }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

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
