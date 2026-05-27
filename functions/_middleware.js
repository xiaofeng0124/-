const SITE_PASSWORD = '124124';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Skip API routes and static assets (they need to work for the password page too)
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/src/')) {
    return next();
  }

  // Check for password cookie
  const cookie = request.headers.get('Cookie') || '';
  if (cookie.includes(`site_pw=${SITE_PASSWORD}`)) {
    return next();
  }

  // If submitting password
  if (url.pathname === '/_unlock' && request.method === 'POST') {
    try {
      const { password } = await request.json();
      if (password === SITE_PASSWORD) {
        return new Response(JSON.stringify({ ok: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ ok: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(JSON.stringify({ ok: false }), { status: 400 });
    }
  }

  // Show password page
  const html = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SnappRice - Site Under Construction</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f8fafc;
  color: #1e293b;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.container {
  text-align: center;
  padding: 40px 20px;
}
h1 { font-size: 28px; margin-bottom: 8px; }
p { color: #64748b; margin-bottom: 24px; font-size: 15px; }
.input-group {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
input {
  padding: 10px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  width: 200px;
}
input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
button {
  padding: 10px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
button:hover { background: #1d4ed8; }
.error { color: #ef4444; font-size: 13px; margin-top: 10px; display: none; }
footer { margin-top: 40px; font-size: 12px; color: #94a3b8; }
</style>
</head><body>
<div class="container">
  <h1>🔧 Site Under Construction</h1>
  <p>We're making improvements. Enter the access password to continue.</p>
  <div class="input-group">
    <input type="password" id="pw" placeholder="Enter password" onkeydown="if(event.key==='Enter')unlock()">
    <button onclick="unlock()">Enter</button>
  </div>
  <div class="error" id="error">Incorrect password</div>
  <footer>SnappRice</footer>
</div>
<script>
async function unlock() {
  const pw = document.getElementById('pw').value;
  const err = document.getElementById('error');
  try {
    const res = await fetch('/_unlock', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password:pw}) });
    if (res.ok) {
      document.cookie = 'site_pw=${SITE_PASSWORD}; path=/; max-age=86400; SameSite=Lax';
      window.location.href = '/';
    } else { err.style.display = 'block'; }
  } catch { err.style.display = 'block'; }
}
</script>
</body></html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
