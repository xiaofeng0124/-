// 全局中间件：CORS + 静态资源缓存
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // 获取原始响应
  const response = await context.next();
  const headers = new Headers(response.headers);

  // ---- 安全头 ----
  // HSTS: 强制HTTPS，1年生效，包含子域名
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  // 防点击劫持
  headers.set('X-Frame-Options', 'DENY');
  // 权限策略：限制API权限
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  // ---- CORS ----
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // ---- 缓存策略 ----
  const path = url.pathname;

  if (path.startsWith('/api/')) {
    // API 路由：不缓存（动态数据）
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

  } else if (path.match(/\.(js|css|png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot)$/)) {
    // 静态资源：长期缓存
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  } else if (path === '/' || path.endsWith('.html')) {
    // HTML 页面：短期缓存（10 分钟）
    headers.set('Cache-Control', 'public, max-age=600, s-maxage=600');

  } else {
    // 其他：保守缓存
    headers.set('Cache-Control', 'public, max-age=300');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
