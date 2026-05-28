export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  if (action === 'login' && request.method === 'POST') {
    return handleLogin(request, env);
  }
  if (action === 'verify' && request.method === 'GET') {
    return handleVerify(request, env);
  }
  if (action === 'users' && request.method === 'GET') {
    return handleUsers(request, env);
  }
  if (action === 'user' && request.method === 'GET') {
    return handleUserDetail(request, env);
  }
  if (action === 'membership' && request.method === 'POST') {
    return handleMembershipUpdate(request, env);
  }

  return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
}

// ==== Admin login (first-time setup auto-creates admin) ====
async function handleLogin(request, env) {
  try {
    const { password } = await request.json();
    if (!password || password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const existing = await env.USERS.get('admin:auth');
    if (existing) {
      const auth = JSON.parse(existing);
      const valid = await verifyPassword(password, auth.hash);
      if (!valid) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
    } else {
      // First-time setup: create admin auth
      const hash = await hashPassword(password);
      await env.USERS.put('admin:auth', JSON.stringify({ hash }));
    }

    const token = crypto.randomUUID();
    await env.USERS.put(`admin:session:${token}`, 'admin', { expirationTtl: 3600 });

    return new Response(JSON.stringify({ ok: true, token }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// ==== Verify admin session ====
async function handleVerify(request, env) {
  const token = getAdminToken(request);
  if (!token) return respond(401, { error: 'Not authenticated' });

  const session = await env.USERS.get(`admin:session:${token}`);
  if (!session) return respond(401, { error: 'Invalid session' });

  return respond(200, { ok: true });
}

// ==== List all users with membership info ====
async function handleUsers(request, env) {
  const authError = await checkAdminAuth(request, env);
  if (authError) return authError;

  const userList = JSON.parse(await env.USERS.get('admin:users') || '[]');
  const result = [];

  for (const email of userList) {
    const userData = JSON.parse(await env.USERS.get(`user:${email}`) || '{}');
    const memberData = JSON.parse(await env.USERS.get(`membership:${email}`) || '{"tier":"free","expiresAt":null}');
    result.push({
      email,
      createdAt: userData.createdAt || null,
      tier: memberData.tier,
      expiresAt: memberData.expiresAt,
    });
  }

  return respond(200, { users: result });
}

// ==== Get user detail (favorites, alerts, search history) ====
async function handleUserDetail(request, env) {
  const authError = await checkAdminAuth(request, env);
  if (authError) return authError;

  const email = request.headers.get('X-Admin-User-Email') || '';
  if (!email) return respond(400, { error: 'Email required' });

  const userData = JSON.parse(await env.USERS.get(`user:${email}`) || '{}');
  const memberData = JSON.parse(await env.USERS.get(`membership:${email}`) || '{"tier":"free","expiresAt":null,"trialUsed":false}');
  const userContent = JSON.parse(await env.USERS.get(`userdata:${email}`) || '{"favorites":[],"alerts":[]}');
  const searchHistory = JSON.parse(await env.USERS.get(`searchhistory:${email}`) || '[]');

  return respond(200, {
    email,
    createdAt: userData.createdAt || null,
    membership: memberData,
    favorites: userContent.favorites || [],
    alerts: userContent.alerts || [],
    searchHistory,
  });
}

// ==== Update membership (requires password re-verify) ====
async function handleMembershipUpdate(request, env) {
  try {
    const body = await request.json();
    const { email, adminPassword, action, amount, unit } = body;

    if (!email || !adminPassword) {
      return respond(400, { error: 'Email and admin password required' });
    }

    // Verify admin password
    const auth = JSON.parse(await env.USERS.get('admin:auth') || '{}');
    if (!auth.hash || !(await verifyPassword(adminPassword, auth.hash))) {
      return respond(401, { error: 'Invalid admin password' });
    }

    const memberKey = `membership:${email}`;
    const memberData = JSON.parse(await env.USERS.get(memberKey) || '{"tier":"free","expiresAt":null,"trialUsed":false}');

    memberData.tier = 'premium';
    const now = new Date();
    const currentExpiry = memberData.expiresAt ? new Date(memberData.expiresAt) : now;
    let newExpiry = new Date(currentExpiry);

    const units = parseInt(amount) || 0;
    if (action === 'remove') {
      newExpiry.setDate(newExpiry.getDate() - units);
    } else {
      newExpiry.setDate(newExpiry.getDate() + units);
    }

    // If removing pushed expiry past now, set to free
    if (newExpiry <= now) {
      memberData.tier = 'free';
      memberData.expiresAt = null;
    } else {
      memberData.expiresAt = newExpiry.toISOString();
    }
    if (!memberData.trialUsed) memberData.trialUsed = true;

    await env.USERS.put(memberKey, JSON.stringify(memberData));

    return respond(200, { ok: true, membership: memberData });
  } catch (e) {
    return respond(500, { error: e.message });
  }
}

// ==== Helpers ====
function getAdminToken(request) {
  const auth = request.headers.get('Authorization') || '';
  return auth.replace('Bearer ', '');
}

async function checkAdminAuth(request, env) {
  const token = getAdminToken(request);
  if (!token) return respond(401, { error: 'Not authenticated' });
  const session = await env.USERS.get(`admin:session:${token}`);
  if (!session) return respond(401, { error: 'Invalid session' });
  return null;
}

function respond(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
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

async function verifyPassword(password, storedHash) {
  const [saltHex, hashHex] = storedHash.split(':');
  const salt = new Uint8Array(saltHex.match(/.{2}/g).map(b => parseInt(b, 16)));
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
  const h = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  return h === hashHex;
}
