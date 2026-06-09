// 降价提醒自动检查
// 定时触发（cron-job.org 等），每天 4AM EST 左右跑一次
// 按 URL 去重，不同用户相同商品只查一次价格

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 验证密钥
  const key = url.searchParams.get('key');
  const expectedKey = env.CRON_SECRET || (await env.USERS?.get('config:cron_key') || '');
  if (!key || key !== expectedKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const results = { checked: 0, notified: 0, errors: 0, details: [] };
  const resendKey = await env.USERS?.get('config:resend_key') || '';

  try {
    // 1. 读取所有用户数据
    const userEntries = await listKVByPrefix(env.USERS, 'userdata:');
    results.totalUsers = userEntries.length;

    // 2. 提取所有提醒，按 URL 分组
    const urlMap = new Map(); // url → [{email, alert}]
    for (const { email, data } of userEntries) {
      const alerts = data.alerts || [];
      for (const alert of alerts) {
        if (alert.notified) continue; // 已通知过的跳过
        if (!alert.url || alert.url === '#') continue; // 无有效链接
        const key = alert.url;
        if (!urlMap.has(key)) urlMap.set(key, []);
        urlMap.get(key).push({ email, alert });
      }
    }

    results.uniqueUrls = urlMap.size;
    if (urlMap.size === 0) {
      return new Response(JSON.stringify({ ...results, message: 'No active alerts to check' }), { headers: { 'Content-Type': 'application/json' } });
    }

    // 3. 逐个检查价格（去重：每个 URL 只查一次）
    let count = 0;
    for (const [productUrl, entries] of urlMap) {
      count++;
      if (count > (parseInt(url.searchParams.get('limit') || '50'))) break;

      const currentPrice = await fetchProductPrice(productUrl, env, entries[0]?.alert?.productName || '');
      results.checked++;

      if (currentPrice === null || currentPrice === undefined) {
        results.errors++;
        results.details.push({ url: productUrl.slice(0, 60), price: null, error: 'Failed to fetch price' });
        continue;
      }

      // 4. 对每个设了该提醒的用户检查是否达到目标价
      for (const { email, alert } of entries) {
        if (currentPrice <= alert.targetPrice) {
          // 发送邮件通知
          if (resendKey) {
            try {
              await sendPriceAlertEmail(alert, email, currentPrice, env);
            } catch (e) {
              results.errors++;
              results.details.push({ email, alert: alert.id, error: 'Email failed: ' + e.message });
              continue;
            }
          }
          // 标记已通知
          await markAlertNotified(env, email, alert.id);
          results.notified++;
          results.details.push({ email, product: alert.productName, store: alert.store, target: alert.targetPrice, current: currentPrice, notified: true });
        }
      }
    }

    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message, stack: e.stack }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// ======== KV 辅助 ========
async function listKVByPrefix(kv, prefix) {
  const results = [];
  let cursor;
  do {
    const list = await kv.list({ prefix, cursor });
    for (const key of list.keys) {
      const value = await kv.get(key.name);
      if (value) {
        const email = key.name.slice(prefix.length);
        results.push({ email, data: JSON.parse(value) });
      }
    }
    cursor = list.cursor;
  } while (cursor);
  return results;
}

// ======== 获取当前价格 ========
async function fetchProductPrice(productUrl, env, productName) {
  const domain = extractDomain(productUrl);

  // Amazon
  if (domain.includes('amazon')) {
    const asin = extractASIN(productUrl);
    if (!asin) return null;
    const key = env.ASA_KEY || (await env.USERS?.get('config:asa_key') || '');
    if (!key) return null;
    try {
      const res = await fetch(`https://api.amazonscraperapi.com/api/v1/amazon/product?api_key=${key}&asin=${asin}&domain=com`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.price?.current || data.price || null;
    } catch { return null; }
  }

  // eBay
  if (domain.includes('ebay')) {
    const itemId = extractItemID(productUrl);
    if (!itemId) return null;
    try {
      const clientId = env.EBAY_APP_ID || (await env.USERS?.get('config:eBay_client_id') || '');
      const certId = env.EBAY_CERT_ID || (await env.USERS?.get('config:eBay_cert_secret') || '');
      if (!clientId || !certId) { console.log('eBay: no credentials'); return null; }
      const basic = typeof btoa === 'function' ? btoa(`${clientId}:${certId}`) : Buffer.from(`${clientId}:${certId}`).toString('base64');
      const tokenRes = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
        method: 'POST',
        headers: { 'Authorization': `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
      });
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) { console.log('eBay: token failed', tokenData); return null; }
      // 直接用搜索 API 查价格（get_item 需要额外 scope，且商品易过期）
      const searchQuery = productName || 'product';
      const searchRes = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(searchQuery)}&limit=1`, {
        headers: { 'Authorization': `Bearer ${tokenData.access_token}`, 'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US' },
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const first = searchData.itemSummaries?.[0];
        if (first?.price?.value) return parseFloat(first.price.value);
      }
      return null;
    } catch (e) { console.log('eBay exception', e.message); return null; }
  }

  // Walmart / Best Buy / Target 等 → 页面抓取
  return fetchPagePrice(productUrl);
}

// ======== 从页面 HTML 提取价格（Walmart/Best Buy/Target 等） ========
async function fetchPagePrice(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    const html = await res.text();

    // 1. 尝试 JSON-LD (ld+json) — 最可靠
    const jsonLdMatches = html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        const offers = parsed.offers || parsed.offers?.itemOffered?.offers || null;
        if (offers) {
          const price = offers.price || offers.highPrice || null;
          if (price) return parseFloat(price);
        }
      } catch {}
    }

    // 2. 尝试 meta 标签
    const metaPatterns = [
      /<meta[^>]+itemprop="price"[^>]+content="([^"]+)"/i,
      /<meta[^>]+property="product:price:amount"[^>]+content="([^"]+)"/i,
      /<meta[^>]+property="og:price:amount"[^>]+content="([^"]+)"/i,
      /<meta[^>]+name="price"[^>]+content="([^"]+)"/i,
    ];
    for (const pat of metaPatterns) {
      const m = html.match(pat);
      if (m) return parseFloat(m[1]);
    }

    // 3. 尝试 JSON 对象中找价格
    const priceJsonMatch = html.match(/"price"\s*:\s*"(\d+\.?\d*)"|"price"\s*:\s*(\d+\.?\d*)/);
    if (priceJsonMatch) return parseFloat(priceJsonMatch[1] || priceJsonMatch[2]);

    return null;
  } catch {
    return null;
  }
}

// ======== URL 辅助函数 ========
function extractDomain(url) {
  try { return new URL(url).hostname.toLowerCase(); } catch { return ''; }
}

function extractASIN(url) {
  // amazon.com/dp/B0XXXXXX 或 amazon.com/B0XXXXXX
  const m = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/([A-Z0-9]{10})(?:\/|$|\?)/);
  return m ? m[1] : null;
}

function extractItemID(url) {
  // ebay.com/itm/123456789 或 ebay.com/itm/NAME/123456789
  const m = url.match(/\/itm[^/]*\/(\d+)/);
  return m ? m[1] : null;
}

// ======== 发送降价邮件 ========
async function sendPriceAlertEmail(alert, userEmail, currentPrice, env) {
  const resendKey = await env.USERS?.get('config:resend_key');
  if (!resendKey) throw new Error('Resend key not configured');

  const productName = alert.productName || 'Product';
  const store = alert.store || 'Store';
  const targetPrice = alert.targetPrice || 0;
  const savings = targetPrice - currentPrice;

  const baseUrl = 'https://snapprice.co';
  const accountUrl = `${baseUrl}/account#alerts`;
  const dealUrl = alert.url || baseUrl;

  const subject = `🔥 Price drop: ${productName} is now $${currentPrice.toFixed(2)} on ${store}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;margin-top:24px;margin-bottom:24px">
    <tr>
      <td style="padding:32px 24px 8px;text-align:center">
        <div style="font-size:22px;font-weight:800">
          <span style="color:#0f172a">Snap</span><span style="color:#16a34a">Price</span>
        </div>
        <p style="font-size:14px;color:#64748b;margin-top:4px">Price Drop Alert</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 24px 12px;text-align:center">
        <p style="font-size:15px;color:#334155;margin:0;line-height:1.5">Hey there,<br><br>You set a price alert for <strong>${escapeHtml(productName)}</strong> on ${escapeHtml(store)} — and it just dropped to your target!</p>
      </td>
    </tr>
    <tr>
      <td style="padding:4px 24px;text-align:center">
        <h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:0">${escapeHtml(productName)}</h2>
        <p style="font-size:14px;color:#64748b;margin:4px 0 0">${escapeHtml(store)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 24px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align:center;padding:8px">
              <div style="font-size:12px;color:#94a3b8">Target Price</div>
              <div style="font-size:22px;font-weight:700;color:#64748b">$${targetPrice.toFixed(2)}</div>
            </td>
            <td style="text-align:center;padding:8px">
              <div style="font-size:24px;color:#94a3b8">→</div>
            </td>
            <td style="text-align:center;padding:8px">
              <div style="font-size:12px;color:#94a3b8">Current Price</div>
              <div style="font-size:22px;font-weight:700;color:#16a34a">$${currentPrice.toFixed(2)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${savings > 0 ? `
    <tr>
      <td style="text-align:center;padding:4px 24px">
        <span style="display:inline-block;background:#f0fdf4;color:#16a34a;font-size:14px;font-weight:600;padding:6px 16px;border-radius:20px">You save $${savings.toFixed(2)} 🎉</span>
      </td>
    </tr>` : ''}
    <tr>
      <td style="padding:20px 24px;text-align:center">
        <a href="${dealUrl}" target="_blank" style="display:inline-block;background:#16a34a;color:#fff;font-size:16px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none">View Deal</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:center;padding:8px 24px 4px">
        <p style="font-size:14px;color:#64748b;margin:0">Happy saving!</p>
        <p style="font-size:13px;color:#94a3b8;margin:6px 0 0">— The SnappRice Team</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 24px 20px;text-align:center">
        <a href="${accountUrl}" target="_blank" style="font-size:13px;color:#64748b;text-decoration:underline">Manage your alerts</a>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8">
        <p style="margin:0 0 4px">SnappRice — search, compare, save — it's that simple</p>
        <a href="${baseUrl}" target="_blank" style="color:#2563eb;text-decoration:none">${baseUrl}</a>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SnappRice Alerts <noreply@snapprice.co>',
      to: userEmail,
      subject,
      html,
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    throw new Error(`Resend error: ${err.slice(0, 200)}`);
  }
}

// ======== 标记提醒为已通知 ========
async function markAlertNotified(env, email, alertId) {
  const key = `userdata:${email}`;
  const raw = await env.USERS.get(key);
  if (!raw) return;
  const data = JSON.parse(raw);
  const alerts = data.alerts || [];
  let changed = false;
  for (const a of alerts) {
    if (a.id === alertId && !a.notified) {
      a.notified = true;
      a.notifiedAt = new Date().toISOString();
      changed = true;
      break;
    }
  }
  if (changed) {
    await env.USERS.put(key, JSON.stringify(data));
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '"') return '&quot;';
    if (m === "'") return '&#39;';
    return m;
  });
}
