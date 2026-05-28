export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { email, code, password } = await request.json();
    if (!email || !code || !password) {
      return new Response(JSON.stringify({ error: 'Email, code, and new password required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const lower = email.toLowerCase();

    // Check reset code
    const stored = await env.USERS.get(`reset:${lower}`);
    if (!stored) {
      return new Response(JSON.stringify({ error: 'Reset code expired or not found. Please request a new one.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const data = JSON.parse(stored);
    if (data.code !== code) {
      return new Response(JSON.stringify({ error: 'Invalid reset code' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Hash new password and update
    const passwordHash = await hashPassword(password);
    const userData = JSON.parse(await env.USERS.get(`user:${lower}`) || '{}');
    userData.passwordHash = passwordHash;
    await env.USERS.put(`user:${lower}`, JSON.stringify(userData));

    // Clean up reset key
    await env.USERS.delete(`reset:${lower}`);

    return new Response(JSON.stringify({ ok: true }), {
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
