// API 中间件：确保搜索结果不缓存
export async function onRequest(context) {
  const response = await context.next();
  const headers = new Headers(response.headers);

  // 清空所有缓存相关头，然后设置为不缓存
  headers.delete('Cf-Cache-Status');
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
