// 返回正确的 robots.txt，绕过 Cloudflare Content-Signals
export async function onRequest(context) {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /src/

Sitemap: https://snapprice.co/sitemap.xml
`;

  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
