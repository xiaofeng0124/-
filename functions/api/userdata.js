export async function onRequest(context) {
  const { request, env } = context;
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const email = await env.USERS.get(`session:${token}`);
  if (!email) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const key = `userdata:${email}`;

  if (request.method === 'GET') {
    try {
      const data = await env.USERS.get(key);
      return new Response(data || JSON.stringify({ favorites: [], alerts: [] }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      await env.USERS.put(key, JSON.stringify(body));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
}
