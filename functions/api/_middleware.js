// API 中间件：仅添加安全头，缓存由 _headers 管理
export async function onRequest(context) {
  const response = await context.next();
  const headers = new Headers(response.headers);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
