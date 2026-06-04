// 棣栭〉鐑棬鍟嗗搧瀹炴椂浠锋牸 API
// 鍚庣缂撳瓨锛圞V锛夛紝鎵€鏈夌敤鎴峰叡浜紝48灏忔椂鑷姩鍒锋柊涓€娆?// 浠锋牸鏉ユ簮: Amazon (via Serper) + eBay (via eBay API)

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
  // 女装 +10
  'Women Summer Dress', 'Women Yoga Leggings', 'Women Denim Jacket',
  'Cashmere Sweater Women', 'Silk Blouse Women', 'High Waist Leggings',
  'Women Winter Coat', 'Floral Maxi Dress', 'Women Running Shoes', 'Fleece Pullover',
  // 家居 & 厨房 +5
  'Vitamix Blender', 'Breville Espresso Machine', 'iRobot Roomba Vacuum',
  'Air Fryer Oven', 'Le Creuset Dutch Oven',
  // 装饰 +5
  'LED Strip Lights', 'Canvas Wall Art Set', 'Artificial Plants Decor',
  'Throw Pillow Covers Set', 'Scented Candles Gift Set',
  // 家具 +5
  'Standing Desk Adjustable', 'Office Ergonomic Chair', 'Bookshelf 5 Tier',
  'Storage Cabinet', 'Floor Lamp Modern',
  // 家电 +5
  'Samsung 65 Inch OLED TV', 'Portable Air Conditioner', 'Smart Air Purifier',
  'Robot Vacuum Mop Combo', 'Mini Dehumidifier',
];

const CACHE_TTL = 48 * 60 * 60; // 48灏忔椂锛堢锛?
export async function onRequest(context) {
  const { env } = context;

  try {
    // 1. 妫€鏌?KV 缂撳瓨
    const cacheKey = 'popular:prices_v6';
    const cached = await env.USERS?.get(cacheKey, 'json');
    if (cached && cached.timestamp && (Date.now() / 1000 - cached.timestamp) < CACHE_TTL) {
      return new Response(JSON.stringify({ prices: cached.prices, cached: true }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    // 2. 缓存过期，重新搜索
    const priceMap = {};
    const batchSize = 20;

    for (let i = 0; i < POPULAR_NAMES.length; i += batchSize) {
      const batch = POPULAR_NAMES.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(async (name) => {
          const query = encodeURIComponent(name);
          // 璋冩悳绱?API锛圫erper/SerpAPI锛夛紝浠庝腑鎻愬彇 Amazon 浠锋牸
          const res = await fetch(`https://snapprice.co/api/search?q=${query}`);
          if (!res.ok) return null;
          const data = await res.json();
          const items = data.results || [];

          // 浼樺厛 Amazon锛屽叾娆?eBay
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

    // 3. 瀛樺叆 KV 缂撳瓨
    const cacheData = { prices: priceMap, timestamp: Math.floor(Date.now() / 1000) };
    try {
      await env.USERS?.put(cacheKey, JSON.stringify(cacheData), { expirationTtl: CACHE_TTL + 3600 });
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

