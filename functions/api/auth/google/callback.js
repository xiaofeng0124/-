export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const origin = url.origin;

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response('Google OAuth not configured', { status: 500 });
  }

  try {
    // Exchange authorization code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${origin}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokens.access_token) {
      return new Response('Failed to get access token', { status: 400 });
    }

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const userInfo = await userRes.json();

    const email = userInfo.email;
    if (!email) {
      return new Response('Failed to get email from Google', { status: 400 });
    }

    // Create user account if first time signing in
    const existing = await env.USERS.get(`user:${email.toLowerCase()}`);
    if (!existing) {
      await env.USERS.put(`user:${email.toLowerCase()}`, JSON.stringify({
        googleId: userInfo.id,
        name: userInfo.name || '',
        picture: userInfo.picture || '',
        createdAt: new Date().toISOString(),
      }));
    }

    // Create session
    const session = crypto.randomUUID();
    await env.USERS.put(`session:${session}`, email.toLowerCase(), { expirationTtl: 604800 });

    // Return HTML page that stores session in sessionStorage and redirects
    const html = `<!DOCTYPE html>
<html><body><script>
  sessionStorage.setItem('sr_session', JSON.stringify({ token: '${session}', email: '${email.toLowerCase()}' }));
  window.location.href = '${origin}/';
</script></body></html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (e) {
    return new Response('OAuth error: ' + e.message, { status: 500 });
  }
}
