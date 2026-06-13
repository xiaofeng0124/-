// API 中间件：确保搜索结果不缓存
export async function onRequest(context) {
  const response = await context.next();
  const headers = new Headers(response.headers);

  // 覆盖所有 API 响应为不缓存
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
