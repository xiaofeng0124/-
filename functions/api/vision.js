// 图片识别代理 — 调 Google Gemini API
// 将商品图片发送给 AI，返回商品名称/描述

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { image } = await request.json();
    if (!image) {
      return new Response(JSON.stringify({ error: 'Image required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const apiKey = env.GEMINI_KEY || (await env.USERS?.get('config:gemini_key'));
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Vision API not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // 提取 base64 数据
    const base64Data = image.includes('base64,') ? image.split('base64,')[1] : image;
    const mimeType = image.includes('data:') ? image.split(';')[0].split(':')[1] : 'image/jpeg';

    // 使用 AbortController 设置 25s 超时
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: 'What product is in this image? Reply with ONLY the product name (e.g. "iPhone 15 Pro Max" or "Samsung Galaxy S25"). Nothing else. If unsure, reply "unknown".' },
              { inline_data: { mime_type: mimeType, data: base64Data } }
            ]
          }]
        }),
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errText = await response.text().catch(() => 'Unknown error');
        // Quota 429 也返回可读信息
        return new Response(JSON.stringify({
          ok: false,
          productName: '',
          error: 'Vision API error',
          detail: response.status === 429 ? 'Rate limit reached. Try again later.' : errText.slice(0, 100)
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return new Response(JSON.stringify({
        ok: !!text && text.toLowerCase() !== 'unknown',
        productName: text.toLowerCase() === 'unknown' ? '' : text.trim(),
        raw: text.trim()
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } finally {
      clearTimeout(timeout);
    }
  } catch (e) {
    return new Response(JSON.stringify({
      ok: false,
      productName: '',
      error: e.message
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
