// Amazon 商品搜索（通过 Scavio API）
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

  const rawKey = env.SCAVIO_KEY || (await env.USERS?.get('config:scavio_key')) || '';
  const apiKey = rawKey.charCodeAt(0) === 0xFEFF ? rawKey.slice(1) : rawKey;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Scavio key not configured', results: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch('https://api.scavio.dev/api/v1/amazon/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, sort_by: 'average_review' }),
    });

    if (!response.ok) {
      const errText = await response.text();
      // 额度耗尽时不报错，返回空结果
      return new Response(JSON.stringify({ results: [], count: 0, error: `Scavio请求失败: ${response.status}` }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const items = data.data || [];

    const results = items
      .filter(item => item.price)
      .map(item => ({
        store: 'Amazon',
        price: parseFloat(item.price) || 0,
        rating: item.rating || 0,
        reviews: item.reviews_count || item.review_count || 0,
        title: item.name || item.title || '',
        image: item.image || '',
        url: item.url || '#',
        shipping: item.prime ? 'Free Prime' : null,
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
