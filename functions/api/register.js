export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const lower = email.toLowerCase();
    const existing = await env.USERS.get(`user:${lower}`);
    if (existing) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    const passwordHash = await hashPassword(password);
    await env.USERS.put(`user:${lower}`, JSON.stringify({
      passwordHash,
      createdAt: new Date().toISOString(),
    }));

    // Track user in admin:users list
    const userList = JSON.parse(await env.USERS.get('admin:users') || '[]');
    if (!userList.includes(lower)) {
      userList.push(lower);
      await env.USERS.put('admin:users', JSON.stringify(userList));
    }

    const session = crypto.randomUUID();
    await env.USERS.put(`session:${session}`, lower, { expirationTtl: 604800 });

    return new Response(JSON.stringify({ ok: true, session, email: email.toLowerCase() }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
  const s = Array.from(new Uint8Array(salt)).map(b => b.toString(16).padStart(2, '0')).join('');
  const h = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  return s + ':' + h;
}
