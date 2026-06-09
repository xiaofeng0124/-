// 换绑邮箱
// 1. 验证密码 → 2. 发验证码到新邮箱 → 3. 验证码确认 → 更新

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { action, email: currentEmail, password, newEmail, code } = await request.json();

    // 验证登录
    const auth = request.headers.get('Authorization') || '';
    const token = auth.replace('Bearer ', '');
    const sessionEmail = await env.USERS.get(`session:${token}`);
    if (!sessionEmail) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const oldEmail = sessionEmail;
    const lowerOld = oldEmail.toLowerCase();
    const lowerNew = (newEmail || '').toLowerCase();

    // 步骤1: 验证密码 + 发送验证码到新邮箱
    if (action === 'send_code') {
      if (!password) return new Response(JSON.stringify({ error: 'Password required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      if (!newEmail || !newEmail.includes('@')) return new Response(JSON.stringify({ error: 'Valid new email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      // 验证旧密码
      const userData = JSON.parse(await env.USERS.get(`user:${lowerOld}`) || '{}');
      const pwHash = userData.passwordHash;
      if (!pwHash) return new Response(JSON.stringify({ error: 'Account not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

      const [salt, hash] = pwHash.split(':');
      const encoder = new TextEncoder();
      const saltBytes = new Uint8Array(salt.match(/.{2}/g).map(b => parseInt(b, 16)));
      const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
      const verifyHash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' }, key, 256);
      const verifyHex = Array.from(new Uint8Array(verifyHash)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (hash !== verifyHex) return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 403, headers: { 'Content-Type': 'application/json' } });

      // 检查新邮箱是否已被注册
      const existing = await env.USERS.get(`user:${lowerNew}`);
      if (existing) return new Response(JSON.stringify({ error: 'This email is already registered' }), { status: 409, headers: { 'Content-Type': 'application/json' } });

      // 检查每日限额
      const today = new Date().toISOString().slice(0, 10);
      const countKey = `verifycount:${today}`;
      const todayCount = parseInt(await env.USERS.get(countKey) || '0');
      if (todayCount >= 100) return new Response(JSON.stringify({ error: 'Daily limit reached' }), { status: 429, headers: { 'Content-Type': 'application/json' } });

      // 生成验证码
      const verifyCode = String(Math.floor(100000 + Math.random() * 900000));

      // 存验证码（10分钟有效）
      await env.USERS.put(`change_email:${lowerNew}`, JSON.stringify({ code: verifyCode, oldEmail: lowerOld, createdAt: Date.now() }), { expirationTtl: 600 });
      // 也存一份用于验证
      await env.USERS.put(`verify:${lowerNew}`, JSON.stringify({ code: verifyCode, password: '' }), { expirationTtl: 600 });

      // 发送验证码到新邮箱
      const resendKey = await env.USERS.get('config:resend_key');
      if (!resendKey) return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'SnappRice <noreply@snapprice.co>',
          to: lowerNew,
          subject: 'Verify your new email for SnappRice',
          html: `<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:0 auto;padding:32px 20px">
            <h2 style="font-size:22px;margin-bottom:12px">Verify your new email</h2>
            <p style="font-size:15px;color:#64748b;margin-bottom:24px">Enter this code to verify your new email address on SnappRice:</p>
            <div style="font-size:36px;font-weight:800;letter-spacing:8px;text-align:center;padding:20px;background:#f8fafc;border-radius:12px;color:#0f172a">${verifyCode}</div>
            <p style="font-size:13px;color:#94a3b8;margin-top:24px">This code expires in 10 minutes.</p>
          </div>`,
        }),
      });

      if (!emailRes.ok) return new Response(JSON.stringify({ error: 'Failed to send verification email' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

      await env.USERS.put(countKey, String(todayCount + 1), { expirationTtl: 86400 });

      return new Response(JSON.stringify({ ok: true, message: 'Verification code sent to new email' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 步骤2: 验证码确认 + 换绑
    if (action === 'verify_code') {
      if (!newEmail || !code) return new Response(JSON.stringify({ error: 'New email and code required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      // 验证码
      const stored = await env.USERS.get(`verify:${lowerNew}`);
      if (!stored) return new Response(JSON.stringify({ error: 'Verification code expired. Please start over.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      const data = JSON.parse(stored);
      if (data.code !== code) return new Response(JSON.stringify({ error: 'Invalid verification code' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      // 获取旧账户数据
      const oldUserData = JSON.parse(await env.USERS.get(`user:${lowerOld}`) || '{}');
      const oldUserdata = await env.USERS.get(`userdata:${lowerOld}`);
      const oldMembership = await env.USERS.get(`membership:${lowerOld}`);
      const oldSearchHistory = await env.USERS.get(`searchhistory:${lowerOld}`);

      // 创建新账户（复制数据）
      await env.USERS.put(`user:${lowerNew}`, JSON.stringify({
        passwordHash: oldUserData.passwordHash,
        createdAt: oldUserData.createdAt || new Date().toISOString(),
        migratedFrom: lowerOld,
        migratedAt: new Date().toISOString(),
      }));

      // 转移用户数据
      if (oldUserdata) await env.USERS.put(`userdata:${lowerNew}`, oldUserdata);
      if (oldMembership) await env.USERS.put(`membership:${lowerNew}`, oldMembership);
      if (oldSearchHistory) await env.USERS.put(`searchhistory:${lowerNew}`, oldSearchHistory);

      // 记录旧账号禁止注册（3个月）
      const blockUntil = Date.now() + 90 * 24 * 60 * 60 * 1000;
      await env.USERS.put(`blocked_email:${lowerOld}`, String(blockUntil), { expirationTtl: 90 * 24 * 60 * 60 });

      // 删除旧账号
      await env.USERS.delete(`user:${lowerOld}`);
      await env.USERS.delete(`userdata:${lowerOld}`);
      await env.USERS.delete(`membership:${lowerOld}`);
      await env.USERS.delete(`searchhistory:${lowerOld}`);

      // 更新 session 指向新邮箱
      await env.USERS.put(`session:${token}`, lowerNew, { expirationTtl: 604800 });

      // 清理验证码
      await env.USERS.delete(`verify:${lowerNew}`);
      await env.USERS.delete(`change_email:${lowerNew}`);

      // 更新 admin 用户列表
      const userList = JSON.parse(await env.USERS.get('admin:users') || '[]');
      const oldIdx = userList.indexOf(lowerOld);
      if (oldIdx >= 0) {
        userList[oldIdx] = lowerNew;
        await env.USERS.put('admin:users', JSON.stringify(userList));
      }

      return new Response(JSON.stringify({ ok: true, message: 'Email changed successfully', newEmail: lowerNew }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
