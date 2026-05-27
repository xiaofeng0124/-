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

  const memberKey = `membership:${email}`;
  const photoKey = `photousage:${email}`;

  if (request.method === 'GET') {
    try {
      const memberData = JSON.parse(await env.USERS.get(memberKey) || '{"tier":"free","expiresAt":null,"trialUsed":false}');
      const now = new Date().toISOString();

      // Check if premium expired
      if (memberData.tier === 'premium' && memberData.expiresAt && new Date(memberData.expiresAt) < new Date(now)) {
        memberData.tier = 'free';
        memberData.expiresAt = null;
        await env.USERS.put(memberKey, JSON.stringify(memberData));
      }

      // Photo usage for current month
      const currentMonth = now.slice(0, 7);
      const photoUsage = JSON.parse(await env.USERS.get(photoKey) || '{"month":"","count":0}');
      if (photoUsage.month !== currentMonth) {
        photoUsage.month = currentMonth;
        photoUsage.count = 0;
        await env.USERS.put(photoKey, JSON.stringify(photoUsage));
      }

      const alerts = JSON.parse(await env.USERS.get(`userdata:${email}`) || '{"alerts":[]}');

      return new Response(JSON.stringify({
        tier: memberData.tier,
        expiresAt: memberData.expiresAt,
        trialUsed: memberData.trialUsed,
        photoUsage: photoUsage.count,
        photoLimit: 5,
        photoLimitMax: 6,
        alertsUsed: (alerts.alerts || []).length,
        alertsLimit: memberData.tier === 'premium' ? 999 : 3,
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();

      // Track photo usage
      if (body.trackPhoto) {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const photoUsage = JSON.parse(await env.USERS.get(photoKey) || '{"month":"","count":0}');
        if (photoUsage.month !== currentMonth) {
          photoUsage.month = currentMonth;
          photoUsage.count = 0;
        }
        photoUsage.count++;
        await env.USERS.put(photoKey, JSON.stringify(photoUsage));
        return new Response(JSON.stringify({ ok: true, photoUsage: photoUsage.count }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
}
