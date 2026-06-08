export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const email = await env.USERS.get(`session:${token}`);
  if (!email) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const key = `searchhistory:${email}`;

  // GET: retrieve search history
  if (request.method === 'GET') {
    const history = JSON.parse(await env.USERS.get(key) || '[]');
    return new Response(JSON.stringify({ history }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // POST: save search history
  if (request.method === 'POST') {
    try {
      const { query, name, image } = await request.json();
      if (!query) {
        return new Response(JSON.stringify({ error: 'Query required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const history = JSON.parse(await env.USERS.get(key) || '[]');
      const filtered = history.filter(h => h.query !== query);
      filtered.unshift({ query, name: name || query, image: image || '', time: Date.now() });
      const trimmed = filtered.slice(0, 50);
      await env.USERS.put(key, JSON.stringify(trimmed));

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
}
