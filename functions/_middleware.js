// 全局中间件：只处理 API 和 HTML 请求
// 静态文件（图片/CSS/JS）直接通过 _headers 文件管理缓存
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // 静态文件直接放行，不经过中间件
  if (path.match(/\.(js|css|png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot)$/)) {
    return context.next();
  }

  // 获取原始响应
  const response = await context.next();
  const headers = new Headers(response.headers);

  // 安全头（只对 HTML 和 API 请求）
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  // CORS
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // API 不缓存
  if (path.startsWith('/api/')) {
    headers.set('Cache-Control', 'no-store, must-revalidate');
  } else if (path === '/' || path.endsWith('.html')) {
    // HTML 页面缓存 10 分钟
    headers.set('Cache-Control', 'public, max-age=600, s-maxage=600');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
