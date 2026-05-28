export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { email, code } = await request.json();
    if (!email || !code) {
      return new Response(JSON.stringify({ error: 'Email and code required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const lower = email.toLowerCase();
    const stored = await env.USERS.get(`verify:${lower}`);
    if (!stored) {
      return new Response(JSON.stringify({ error: 'Verification code expired or not found. Please register again.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const data = JSON.parse(stored);
    if (data.code !== code) {
      return new Response(JSON.stringify({ error: 'Invalid verification code' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Code verified - create the account
    const passwordHash = await hashPassword(data.password);
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

    // Clean up verification key
    await env.USERS.delete(`verify:${lower}`);

    const session = crypto.randomUUID();
    await env.USERS.put(`session:${session}`, lower, { expirationTtl: 604800 });

    return new Response(JSON.stringify({ ok: true, session, email: lower }), {
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
