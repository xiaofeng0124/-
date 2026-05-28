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

    // Check daily verification limit (Resend free tier: 100/day)
    const today = new Date().toISOString().slice(0, 10);
    const countKey = `verifycount:${today}`;
    const todayCount = parseInt(await env.USERS.get(countKey) || '0');
    if (todayCount >= 100) {
      return new Response(JSON.stringify({ error: 'Daily registration limit reached. Please try again tomorrow.' }), { status: 429, headers: { 'Content-Type': 'application/json' } });
    }

    // Generate 6-digit verification code
    const code = String(Math.floor(100000 + Math.random() * 900000));

    // Store pending verification (10 min TTL)
    await env.USERS.put(`verify:${lower}`, JSON.stringify({ code, password, createdAt: Date.now() }), { expirationTtl: 600 });

    // Send email via Resend
    const resendKey = await env.USERS.get('config:resend_key');
    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SnappRice <noreply@snapprice.co>',
        to: lower,
        subject: 'Your SnappRice verification code',
        html: `<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:0 auto;padding:32px 20px">
          <h2 style="font-size:22px;margin-bottom:12px">Welcome to SnappRice!</h2>
          <p style="font-size:15px;color:#64748b;margin-bottom:24px">Enter this code to verify your email address:</p>
          <div style="font-size:36px;font-weight:800;letter-spacing:8px;text-align:center;padding:20px;background:#f8fafc;border-radius:12px;color:#0f172a">${code}</div>
          <p style="font-size:13px;color:#94a3b8;margin-top:24px">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
        </div>`,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      return new Response(JSON.stringify({ error: 'Failed to send verification email' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Increment daily counter
    await env.USERS.put(countKey, String(todayCount + 1), { expirationTtl: 86400 });

    return new Response(JSON.stringify({ ok: true, needVerify: true, email: lower }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
