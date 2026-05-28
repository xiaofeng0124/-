export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { name, email, subject, message } = await request.json();
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const resendKey = await env.USERS.get('config:resend_key');
    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const forwardEmail = await env.USERS.get('config:contact_email') || '1067678960@qq.com';

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SnappRice Contact <noreply@snapprice.co>',
        replyTo: email,
        to: forwardEmail,
        subject: `[SnappRice Contact] ${subject}`,
        html: `<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:0 auto;padding:32px 20px">
          <h2 style="font-size:20px;margin-bottom:16px">New Contact Message</h2>
          <table style="font-size:14px;color:#334155;width:100%">
            <tr><td style="padding:6px 12px;font-weight:600;color:#64748b;width:80px">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Subject</td><td>${escapeHtml(subject)}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:8px;font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
        </div>`,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '"') return '&quot;';
    if (m === "'") return '&#39;';
    return m;
  });
}
