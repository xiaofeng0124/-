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

  // Get API key
  const apiKey = env.GEMINI_KEY || (await env.USERS.get('config:gemini_key'));
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Vision API not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Parse image data
  const base64Data = image.includes('base64,') ? image.split('base64,')[1] : image;
  const mimeType = image.includes('data:') ? image.split(';')[0].split(':')[1] : 'image/jpeg';

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: 'What product is in this image? Reply with ONLY the product name. Nothing else. If unsure, reply "unknown".' },
            { inline_data: { mime_type: mimeType, data: base64Data } }
          ]
        }]
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ ok: false, productName: '', error: 'API error: ' + response.status }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = text.trim();

    return new Response(JSON.stringify({
      ok: clean.toLowerCase() !== 'unknown' && clean.length > 0,
      productName: clean.toLowerCase() === 'unknown' ? '' : clean
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (e) {
    return new Response(JSON.stringify({ ok: false, productName: '', error: e.message }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
