// 首页热门商品实时价格 API
// 后端缓存（KV），所有用户共享，48小时自动刷新一次
// 价格来源: Amazon (via Serper) + eBay (via eBay API)

const POPULAR_NAMES = [
  // 📱 手机 & 平板 (10)
  'Apple iPhone 16 Pro Max', 'Samsung Galaxy S25 Ultra', 'Google Pixel 9 Pro',
  'Apple iPhone 16', 'Samsung Galaxy S25', 'OnePlus 13',
  'iPad Pro M4 13"', 'iPad Air M3 11"', 'Samsung Galaxy Tab S10 Ultra',
  'Amazon Fire Max 11',

  // 💻 笔记本 & 电脑 (8)
  'MacBook Air M4', 'MacBook Pro 16" M4 Pro', 'Dell XPS 16 Laptop',
  'Samsung Galaxy Book 4', 'Lenovo ThinkPad X1 Carbon', 'Microsoft Surface Laptop 7',
  'HP Spectre x360', 'ASUS Zenbook 14 OLED',

  // 🎧 耳机 & 音频 (8)
  'AirPods Pro 3', 'AirPods 4', 'Sony WH-1000XM6 Headphones',
  'Bose QuietComfort Ultra Earbuds', 'Samsung Galaxy Buds 4 Pro',
  'Sony WF-1000XM6 Earbuds', 'Beats Studio Pro', 'JBL Tune 770NC',

  // ⌚ 手表 & 穿戴 (6)
  'Apple Watch Ultra 3', 'Apple Watch Series 10', 'Samsung Galaxy Watch 7',
  'Fitbit Charge 7', 'Garmin Fenix 8', 'Whoop 5.0 Band',

  // 🎮 游戏 (8)
  'PlayStation 5 Slim', 'Xbox Series X 2TB', 'Nintendo Switch 2',
  'Meta Quest 3S 256GB', 'Steam Deck OLED 1TB', 'ASUS ROG Ally X',
  'PS5 DualSense Edge', 'Nintendo Pro Controller',

  // 📷 相机 & 影像 (6)
  'Sony A7R V Camera', 'Canon EOS R6 Mark II', 'GoPro Hero 14',
  'DJI Osmo Pocket 4', 'DJI Mini 4 Pro Drone', 'Instax Mini 99',

  // 🏠 家居 & 厨房 (8)
  'Instant Pot Duo Plus', 'KitchenAid Stand Mixer', 'Vitamix E310 Blender',
  'Ninja Creami Deluxe', 'Keurig K-Elite Coffee', 'Breville Barista Express',
  'Dyson V15 Detect', 'iRobot Roomba j9+',

  // 👟 服装 & 鞋 (14)
  'Nike Air Max 2025', 'Adidas Ultraboost Light', 'New Balance 990v6',
  'Nike Air Force 1', 'Crocs Classic Clogs', 'UGG Classic Boots',
  'Levi 501 Original Jeans', 'North Face Nuptse Jacket',
  'Patagonia Better Sweater', 'Carhartt Detroit Jacket',
  'Tommy Hilfiger Polo Shirt', 'Calvin Klein Cotton Boxers',
  'Nike Dri-FIT T-Shirt', 'Champion Hoodie',

  // 🎒 配饰 & 其他 (6)
  'Ray-Ban Meta Wayfarer', 'Apple AirTag 4 Pack', 'Tile Mate 2025',
  'Ridge Wallet Carbon', 'Herschel Backpack', 'Bellroy Tokyo Tote',

  // 🏋️ 运动 & 健康 (6)
  'Peloton Bike+', 'Bowflex Adjustable Dumbbells', 'Theragun Pro 6',
  'Yeti Rambler 64oz', 'Oral-B iO Series 10', 'Philips Sonicare DiamondClean',
];

const CACHE_TTL = 48 * 60 * 60; // 48小时（秒）

export async function onRequest(context) {
  const { env } = context;

  try {
    // 1. 检查 KV 缓存
    const cached = await env.USERS?.get('popular:prices', 'json');
    if (cached && cached.timestamp && (Date.now() / 1000 - cached.timestamp) < CACHE_TTL) {
      return new Response(JSON.stringify({ prices: cached.prices, cached: true }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    // 2. 缓存过期，重新搜索（只取 Amazon 和 eBay 价格）
    const priceMap = {};
    const batchSize = 5;

    for (let i = 0; i < POPULAR_NAMES.length; i += batchSize) {
      const batch = POPULAR_NAMES.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(async (name) => {
          const query = encodeURIComponent(name);
          // 调搜索 API（Serper/SerpAPI），从中提取 Amazon 价格
          const res = await fetch(`https://snapprice.co/api/search?q=${query}`);
          if (!res.ok) return null;
          const data = await res.json();
          const items = data.results || [];

          // 优先 Amazon，其次 eBay
          let best = items.find(r => r.price > 0 && r.store === 'Amazon');
          if (!best) best = items.find(r => r.price > 0 && r.store === 'eBay');
          if (!best) best = items.find(r => r.price > 0);
          if (!best) return null;

          return { name, price: best.price, store: best.store, image: best.image || '' };
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
