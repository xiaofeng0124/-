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
    // Get App ID and Cert ID from env or KV
    const clientId = env.EBAY_APP_ID || (await env.USERS?.get('config:eBay_client_id')) || '';
    const certId = env.EBAY_CERT_ID || (await env.USERS?.get('config:eBay_cert_secret')) || '';

    if (!clientId || !certId) {
      return new Response(JSON.stringify({ error: 'eBay API not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get OAuth token (cached in KV for 1.5 hours)
    let token = await env.USERS?.get('eBay:access_token');
    if (!token) {
      const basic = btoa(`${clientId}:${certId}`);
      const tokenRes = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
      });
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        return new Response(JSON.stringify({ error: 'eBay auth failed', detail: tokenData }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      token = tokenData.access_token;
      // Cache for 1.5 hours (tokens expire in 2 hours)
      await env.USERS?.put('eBay:access_token', token, { expirationTtl: 5400 });
    }

    // Call eBay Browse API
    const searchRes = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=10`,
      { headers: { Authorization: `Bearer ${token}`, 'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US' } }
    );

    if (!searchRes.ok) {
      const errText = await searchRes.text();
      return new Response(JSON.stringify({ error: 'eBay search failed', status: searchRes.status, body: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await searchRes.json();
    const items = data.itemSummaries || [];

    const results = items
      .filter(item => item.price?.value)
      .map(item => ({
        store: 'eBay',
        price: parseFloat(item.price.value) || 0,
        rating: item.rating ? parseFloat(item.rating) : 0,
        reviews: 0,
        title: item.title || '',
        image: item.thumbnail?.url || item.image?.url || '',
        url: item.itemAffiliateWebUrl || item.itemWebUrl || '#',
        shipping: null,
        condition: item.condition || '',
        itemId: item.itemId || '',
      }));

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
