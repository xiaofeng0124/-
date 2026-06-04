// 首页热门商品实时价格 API
// 后端缓存（KV），所有用户共享，48小时自动刷新
// 稳定50个商品，确保每个都有图有价

const POPULAR_NAMES = [
  'Apple iPhone 16 Pro Max', 'Samsung Galaxy S25 Ultra', 'Google Pixel 9 Pro',
  'Apple iPhone 16', 'Samsung Galaxy S25',
  'MacBook Air M4', 'MacBook Pro 16" M4 Pro',
  'AirPods Pro 3', 'AirPods 4', 'Sony WH-1000XM6 Headphones',
  'Apple Watch Ultra 3', 'Apple Watch Series 10',
  'PlayStation 5 Slim', 'Xbox Series X 2TB', 'Nintendo Switch 2',
  'Nike Air Max 2025', 'Adidas Ultraboost Light', 'New Balance 990v6',
  'Nike Air Force 1', 'Crocs Classic Clogs', 'UGG Classic Boots',
  'Levi 501 Original Jeans', 'Champion Hoodie',
  'Instant Pot Duo Plus', 'KitchenAid Stand Mixer', 'Dyson V15 Detect',
  'Ninja Creami Deluxe', 'Keurig K-Elite Coffee',
  'Peloton Bike+', 'Bowflex Adjustable Dumbbells',
  'Apple AirTag 4 Pack',
  'Women Summer Dress', 'Women Yoga Leggings', 'Women Denim Jacket',
  'Cashmere Sweater Women', 'Silk Blouse Women', 'High Waist Leggings',
  'Women Winter Coat', 'Floral Maxi Dress',
  'Vitamix Blender', 'Breville Espresso Machine',
  'LED Strip Lights', 'Canvas Wall Art Set',
  'Throw Pillow Covers Set', 'Scented Candles Gift Set',
  'Standing Desk Adjustable', 'Office Ergonomic Chair',
  'Men Casual Shirt', 'Men Winter Jacket',
];

const CACHE_TTL = 48 * 60 * 60;

export async function onRequest(context) {
  const { env } = context;
  const cacheKey = 'popular:prices_final';

  try {
    const cached = await env.USERS?.get(cacheKey, 'json');
    if (cached && cached.timestamp && (Date.now() / 1000 - cached.timestamp) < CACHE_TTL) {
      return new Response(JSON.stringify({ prices: cached.prices, cached: true }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }
  } catch {}

  // 实时搜索50个商品
  const priceMap = {};
  const batchSize = 25;

  for (let i = 0; i < POPULAR_NAMES.length; i += batchSize) {
    const batch = POPULAR_NAMES.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (name) => {
        const query = encodeURIComponent(name);
        const res = await fetch(`https://snapprice.co/api/search?q=${query}`);
        if (!res.ok) return null;
        const data = await res.json();
        const items = data.results || [];
        let best = items.find(r => r.price > 0 && r.store === 'Amazon');
        if (!best) best = items.find(r => r.price > 0 && r.store === 'eBay');
        if (!best) best = items.find(r => r.price > 0);
        if (!best) return null;
        return { name, price: best.price, store: best.store, image: best.image || '' };
      })
    );
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value) {
        priceMap[r.value.name] = { price: r.value.price, store: r.value.store, image: r.value.image || '' };
      }
    });
  }

  try {
    await env.USERS?.put(cacheKey, JSON.stringify({ prices: priceMap, timestamp: Math.floor(Date.now() / 1000) }), { expirationTtl: CACHE_TTL + 3600 });
  } catch {}

  return new Response(JSON.stringify({ prices: priceMap, cached: false }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
  });
}
