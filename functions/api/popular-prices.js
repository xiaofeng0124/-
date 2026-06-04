// 首页热门商品实时价格 API - 后台渐进式刷新
// 每次请求只搜一部分，用 waitUntil 在后台慢慢搜完所有80个

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

const CACHE_KEY = 'popular:80';
const CACHE_TTL = 48 * 60 * 60;

export async function onRequest(context) {
  const { env, waitUntil } = context;

  // 1. 有完整缓存 → 直接返回
  try {
    const cache = await env.USERS?.get(CACHE_KEY, 'json');
    if (cache && cache.done && cache.timestamp && (Date.now() / 1000 - cache.timestamp) < CACHE_TTL) {
      return new Response(JSON.stringify({ prices: cache.prices, cached: true }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }
  } catch {}

  // 2. 后台继续处理未完成的商品
  waitUntil(processRemaining(CACHE_KEY, env));

  // 3. 返回当前已有的数据（可能部分或空）
  try {
    const cache = await env.USERS?.get(CACHE_KEY, 'json');
    const prices = (cache && cache.prices) || {};
    return new Response(JSON.stringify({ prices, cached: true }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch {}
  return new Response(JSON.stringify({ prices: {} }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function processRemaining(CACHE_KEY, env) {
  try {
    // 读取当前进度
    const cache = await env.USERS?.get(CACHE_KEY, 'json');
    const prices = (cache && cache.prices) || {};
    const doneSet = new Set(Object.keys(prices));
    const remaining = POPULAR_NAMES.filter(n => !doneSet.has(n));

    if (remaining.length === 0) {
      // 全部搜完了，标记完成
      await env.USERS?.put(CACHE_KEY, JSON.stringify({ prices, done: true, timestamp: Math.floor(Date.now() / 1000) }), { expirationTtl: CACHE_TTL + 3600 });
      return;
    }

    // 一次处理最多 30 个（约10秒）
    const batch = remaining.slice(0, 30);
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
        prices[r.value.name] = { price: r.value.price, store: r.value.store, image: r.value.image || '' };
      }
    });

    // 存回 KV（标记未完成）
    await env.USERS?.put(CACHE_KEY, JSON.stringify({ prices, done: false, timestamp: Math.floor(Date.now() / 1000) }), { expirationTtl: CACHE_TTL + 3600 });

    // 如果还有剩，递归处理下一批（waitUntil 支持异步链）
    if (remaining.length > 30) {
      await processRemaining(CACHE_KEY, env);
    }
  } catch (_) {}
}
