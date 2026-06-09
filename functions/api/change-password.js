// 修改密码
// 1. 验证旧密码 → 2. 发验证码到邮箱 → 3. 验证码确认 → 更新

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { action, oldPassword, newPassword, code } = await request.json();

    // 验证登录
    const auth = request.headers.get('Authorization') || '';
    const token = auth.replace('Bearer ', '');
    const email = await env.USERS.get(`session:${token}`);
    if (!email) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const lower = email.toLowerCase();

    // 步骤1: 验证旧密码 + 发送验证码
    if (action === 'send_code') {
      if (!oldPassword) return new Response(JSON.stringify({ error: 'Current password required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      if (!newPassword || newPassword.length < 8) return new Response(JSON.stringify({ error: 'New password must be at least 8 characters' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      // 验证密码强度
      if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^a-zA-Z0-9]/.test(newPassword)) {
        return new Response(JSON.stringify({ error: 'Password must contain letters, numbers, and symbols' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      // 验证旧密码
      const userData = JSON.parse(await env.USERS.get(`user:${lower}`) || '{}');
      const pwHash = userData.passwordHash;
      if (!pwHash) return new Response(JSON.stringify({ error: 'Account not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

      const [salt, hash] = pwHash.split(':');
      const encoder = new TextEncoder();
      const saltBytes = new Uint8Array(salt.match(/.{2}/g).map(b => parseInt(b, 16)));
      const key = await crypto.subtle.importKey('raw', encoder.encode(oldPassword), 'PBKDF2', false, ['deriveBits']);
      const verifyHash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' }, key, 256);
      const verifyHex = Array.from(new Uint8Array(verifyHash)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (hash !== verifyHex) return new Response(JSON.stringify({ error: 'Current password is incorrect' }), { status: 403, headers: { 'Content-Type': 'application/json' } });

      // 检查每日限额
      const today = new Date().toISOString().slice(0, 10);
      const countKey = `verifycount:${today}`;
      const todayCount = parseInt(await env.USERS.get(countKey) || '0');
      if (todayCount >= 100) return new Response(JSON.stringify({ error: 'Daily limit reached' }), { status: 429, headers: { 'Content-Type': 'application/json' } });

      // 生成验证码
      const verifyCode = String(Math.floor(100000 + Math.random() * 900000));

      // 存验证码（10分钟）
      await env.USERS.put(`change_pw:${lower}`, JSON.stringify({ code: verifyCode, newPassword, createdAt: Date.now() }), { expirationTtl: 600 });

      // 发送验证码到注册邮箱
      const resendKey = await env.USERS.get('config:resend_key');
      if (!resendKey) return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'SnappRice <noreply@snapprice.co>',
          to: lower,
          subject: 'Confirm your SnappRice password change',
          html: `<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:0 auto;padding:32px 20px">
            <h2 style="font-size:22px;margin-bottom:12px">Confirm password change</h2>
            <p style="font-size:15px;color:#64748b;margin-bottom:24px">Enter this code to confirm your password change on SnappRice:</p>
            <div style="font-size:36px;font-weight:800;letter-spacing:8px;text-align:center;padding:20px;background:#f8fafc;border-radius:12px;color:#0f172a">${verifyCode}</div>
            <p style="font-size:13px;color:#94a3b8;margin-top:24px">This code expires in 10 minutes. If you didn't request this, please secure your account.</p>
          </div>`,
        }),
      });

      if (!emailRes.ok) return new Response(JSON.stringify({ error: 'Failed to send verification email' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

      await env.USERS.put(countKey, String(todayCount + 1), { expirationTtl: 86400 });

      return new Response(JSON.stringify({ ok: true, message: 'Verification code sent to your email' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 步骤2: 验证码确认 + 更新密码
    if (action === 'verify_code') {
      if (!code) return new Response(JSON.stringify({ error: 'Verification code required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      const stored = await env.USERS.get(`change_pw:${lower}`);
      if (!stored) return new Response(JSON.stringify({ error: 'Verification code expired. Please start over.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      const data = JSON.parse(stored);
      if (data.code !== code) return new Response(JSON.stringify({ error: 'Invalid verification code' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      // 哈希新密码
      const encoder = new TextEncoder();
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await crypto.subtle.importKey('raw', encoder.encode(data.newPassword), 'PBKDF2', false, ['deriveBits']);
      const hash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
      const s = Array.from(new Uint8Array(salt)).map(b => b.toString(16).padStart(2, '0')).join('');
      const h = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
      const newHash = s + ':' + h;

      // 更新密码
      const userData = JSON.parse(await env.USERS.get(`user:${lower}`) || '{}');
      userData.passwordHash = newHash;
      await env.USERS.put(`user:${lower}`, JSON.stringify(userData));

      // 清理
      await env.USERS.delete(`change_pw:${lower}`);

      return new Response(JSON.stringify({ ok: true, message: 'Password changed successfully' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
