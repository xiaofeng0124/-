// 图片识别: Groq (Llama 4 Scout) — 免费 API，无需绑定支付
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  let image;
  try {
    const body = await request.json();
    image = body.image;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  if (!image) {
    return new Response(JSON.stringify({ error: 'Image required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Get Groq API key: 环境变量 -> KV 备用
  const apiKey = env.GROQ_KEY || (await env.USERS.get('config:groq_key'));
  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, productName: '', error: 'Vision API not configured' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // 确保图片是 base64 data URL 格式
  const imageUrl = image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'What product is in this image? Reply with ONLY the product name (1-5 words). If unsure, reply "unknown".' },
            { type: 'image_url', image_url: { url: imageUrl } }
          ]
        }],
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ ok: false, productName: '', error: 'API error: ' + response.status + ' ' + errText }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || '';

    return new Response(JSON.stringify({
      ok: text.toLowerCase() !== 'unknown' && text.length > 0,
      productName: text.toLowerCase() === 'unknown' ? '' : text
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (e) {
    return new Response(JSON.stringify({ ok: false, productName: '', error: e.message }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
