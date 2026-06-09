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

    // 提取 base64 数据（去掉 data:image/xxx;base64, 前缀）
    const base64Data = image.includes('base64,') ? image.split('base64,')[1] : image;
    const mimeType = image.includes('data:') ? image.split(';')[0].split(':')[1] : 'image/jpeg';

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: 'What product is in this image? Reply with ONLY the product name (e.g. "Nike Air Max 270 White"), nothing else. If you cannot identify it, reply "unknown".' },
            { inline_data: { mime_type: mimeType, data: base64Data } }
          ]
        }]
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: 'Vision API error', detail: errText.slice(0,200) }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(JSON.stringify({
      ok: !!text && text.toLowerCase() !== 'unknown',
      productName: text.toLowerCase() === 'unknown' ? '' : text,
      raw: text
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
