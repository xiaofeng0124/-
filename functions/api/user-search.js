export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const email = await env.USERS.get(`session:${token}`);
  if (!email) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { query } = await request.json();
    if (!query) {
      return new Response(JSON.stringify({ error: 'Query required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const key = `searchhistory:${email}`;
    const history = JSON.parse(await env.USERS.get(key) || '[]');

    // Remove duplicate
    const filtered = history.filter(h => h.query !== query);
    filtered.unshift({ query, time: Date.now() });

    // Keep max 50
    const trimmed = filtered.slice(0, 50);
    await env.USERS.put(key, JSON.stringify(trimmed));

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
