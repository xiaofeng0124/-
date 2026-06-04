// 首页热门商品实时价格 API
// 后端缓存（KV），所有用户共享，48小时自动刷新一次
// 使用 waitUntil 后台刷新，不受30秒超时限制

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
  'Women Winter Coat', 'Floral Maxi Dress', 'Women Running Shoes', 'Fleece Pullover',
  'Vitamix Blender', 'Breville Espresso Machine', 'iRobot Roomba Vacuum',
  'Air Fryer Oven', 'Le Creuset Dutch Oven',
  'LED Strip Lights', 'Canvas Wall Art Set', 'Artificial Plants Decor',
  'Throw Pillow Covers Set', 'Scented Candles Gift Set',
  'Standing Desk Adjustable', 'Office Ergonomic Chair', 'Bookshelf 5 Tier',
  'Storage Cabinet', 'Floor Lamp Modern',
  'Samsung 65 Inch OLED TV', 'Portable Air Conditioner', 'Smart Air Purifier',
  'Robot Vacuum Mop Combo', 'Mini Dehumidifier',
  'Men Casual Shirt', 'Men Winter Jacket', 'Men Running Sneakers',
  'Men Slim Jeans', 'Men Leather Watch',
  'Camping Tent 4 Person', 'Hiking Backpack 40L', 'Insulated Water Bottle',
  'Portable Camping Hammock', 'Outdoor Propane Grill',
  'Wireless Phone Charger', 'Smart WiFi Light Bulb', 'Electric Kettle Stainless',
  'Yoga Mat Non Slip', 'Resistance Bands Set', 'Car Phone Mount',
  'Vitamin D3 Supplement', 'Organic Protein Powder', 'Cat Food Dispenser',
];

const CACHE_TTL = 48 * 60 * 60;

export async function onRequest(context) {
  const { env, waitUntil } = context;
  const cacheKey = 'popular:prices_v7';

  // 1. 检查 KV 缓存 → 有就直接返回
  try {
    const cached = await env.USERS?.get(cacheKey, 'json');
    if (cached && cached.timestamp && (Date.now() / 1000 - cached.timestamp) < CACHE_TTL) {
      return new Response(JSON.stringify({ prices: cached.prices, cached: true }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }
  } catch {}

  // 2. 后台异步刷新所有商品（不阻塞响应）
  waitUntil(refreshAllPrices(cacheKey, env));

  // 返回已有缓存（可能旧数据或空）
  try {
    const old = await env.USERS?.get(cacheKey, 'json');
    if (old && old.prices && Object.keys(old.prices).length > 0) {
      return new Response(JSON.stringify({ prices: old.prices, cached: true }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }
  } catch {}
  return new Response(JSON.stringify({ prices: {} }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function refreshAllPrices(cacheKey, env) {
  try {
    const priceMap = {};
    for (let i = 0; i < POPULAR_NAMES.length; i += 30) {
      const batch = POPULAR_NAMES.slice(i, i + 30);
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
    await env.USERS?.put(cacheKey, JSON.stringify({ prices: priceMap, timestamp: Math.floor(Date.now() / 1000) }), { expirationTtl: CACHE_TTL + 3600 });
  } catch (_) {}
}
