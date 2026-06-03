// 首页热门商品实时价格 API
// 后端缓存（KV），所有用户共享，6小时自动刷新一次

// 必须和前端 POPULAR_POOL 中的 name 完全一致，共60个
const POPULAR_NAMES = [
  'Apple AirPods Pro 2nd Gen',
  'Sony PlayStation 5 Digital',
  'Sony WH-1000XM5 Headphones',
  'iPhone 15 Pro Max 256GB',
  'Samsung 65" OLED 4K TV',
  'MacBook Pro 14" M3 Pro',
  'Nintendo Switch OLED Bundle',
  'Google Pixel 8 Pro 128GB',
  'Apple Watch Series 9 45mm',
  'Bose QuietComfort Ultra',
  'Samsung Galaxy S24 Ultra',
  'iPad Air 11" M2 128GB',
  'Amazon Echo Dot 5th Gen',
  'Dyson V15 Detect Vacuum',
  'Instant Pot Duo 7-in-1',
  'Kindle Paperwhite 2024',
  'Nintendo Pro Controller',
  'Sony WF-1000XM5 Earbuds',
  'Logitech MX Master 3S',
  'Samsung Galaxy Tab S9 FE',
  'Apple MagSafe Charger',
  'JBL Flip 6 Speaker',
  'Nespresso Vertuo Coffee',
  'Ring Video Doorbell Pro 2',
  'Canon EOS R50 Camera',
  'LG C3 55" OLED TV',
  'Roku Streaming Stick 4K',
  'iRobot Roomba j7+',
  'Anker Power Bank 20000mAh',
  'Samsung 49" Curved Monitor',
  'Apple AirTag 4 Pack',
  'Sony A7 IV Camera',
  'Dell XPS 15 Laptop',
  'HP Envy 6055 Printer',
  'Samsung Galaxy Watch 6',
  'Beats Studio Pro',
  'Meta Quest 3 128GB VR',
  'Asus ROG Ally Handheld',
  'Fitbit Charge 6',
  'Sony XM5 Headphones',
  'Xbox Series X Console',
  'Samsung Galaxy Buds 3 Pro',
  'Ninja Creami Ice Cream',
  'Keurig K-Mini Coffee',
  'Shark Navigator Vacuum',
  'Weber Spirit Grill',
  'Nike Air Max Sneakers',
  'Apple Mac Mini M4',
  'Bose SoundLink Speaker',
  'GoPro Hero 13',
  'DJI Mini 4 Pro Drone',
  'Sonos Era 100 Speaker',
  'KitchenAid Stand Mixer',
  'Vitamix Blender',
  'Breville Espresso',
  'Lenovo ThinkPad X1',
  'Microsoft Surface Pro',
  'Adidas Ultraboost',
  'Traeger Pellet Grill',
  'Fujifilm Instax Camera',
];

const CACHE_TTL = 6 * 60 * 60; // 6小时（秒）

export async function onRequest(context) {
  const { env } = context;

  try {
    // 1. 先检查 KV 缓存
    const cached = await env.USERS?.get('popular:prices', 'json');
    if (cached && cached.timestamp && (Date.now() / 1000 - cached.timestamp) < CACHE_TTL) {
      return new Response(JSON.stringify({ prices: cached.prices, cached: true }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    // 2. 缓存过期，重新搜索
    const priceMap = {};
    const batchSize = 5;

    for (let i = 0; i < POPULAR_NAMES.length; i += batchSize) {
      const batch = POPULAR_NAMES.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(async (name) => {
          const query = encodeURIComponent(name);
          // 调自己的搜索 API（走 SerpAPI/Serper 降级链）
          const res = await fetch(`https://snapprice.co/api/search?q=${query}`);
          if (!res.ok) return null;
          const data = await res.json();
          const items = data.results || [];
          // 取第一个非 eBay 的有效价格
          const best = items.find(r => r.price > 0 && r.store !== 'eBay') || items.find(r => r.price > 0);
          if (!best) return null;
          return { name, price: best.price, store: best.store };
        })
      );
      results.forEach(r => {
        if (r.status === 'fulfilled' && r.value) {
          priceMap[r.value.name] = { price: r.value.price, store: r.value.store };
        }
      });
    }

    // 3. 存入 KV 缓存
    const cacheData = { prices: priceMap, timestamp: Math.floor(Date.now() / 1000) };
    try {
      await env.USERS?.put('popular:prices', JSON.stringify(cacheData), { expirationTtl: CACHE_TTL + 3600 });
    } catch {}

    return new Response(JSON.stringify({ prices: priceMap, cached: false }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
