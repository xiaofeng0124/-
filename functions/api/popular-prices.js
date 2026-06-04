// 首页热门商品实时价格 API
// 分批缓存：每次请求只搜30个，多几次就全部搜完
// 搜过的不再搜，永久存 KV

const POPULAR_NAMES = [
  'Apple iPhone 16 Pro Max', 'Samsung Galaxy S25 Ultra', 'Google Pixel 9 Pro',
  'Apple iPhone 16', 'Samsung Galaxy S25',
  'MacBook Air M4', 'Apple iPhone 17',
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

const CACHE_KEY = 'popular:final2';
const CACHE_TTL = 30 * 24 * 60 * 60; // 30天
const BATCH = 30; // 每次搜30个

export async function onRequest(context) {
  const { env } = context;

  // 1. 读缓存
  const cache = await env.USERS?.get(CACHE_KEY, 'json');
  const prices = (cache && cache.prices) || {};

  // 2. 检查哪些商品还没搜过
  const done = new Set(Object.keys(prices));
  const todo = POPULAR_NAMES.filter(n => !done.has(n));

  // 3. 如果全部搜完了 → 直接返回
  if (todo.length === 0) {
    return new Response(JSON.stringify({ prices, cached: true }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
    });
  }

  // 4. 还有没搜的 → 搜一批（最多30个）
  const batch = todo.slice(0, BATCH);
  const results = await Promise.allSettled(
    batch.map(async (name) => {
      const q = encodeURIComponent(name);
      const res = await fetch(`https://snapprice.co/api/search?q=${q}`);
      if (!res.ok) return null;
      const data = await res.json();
      const items = data.results || [];
      let best = items.find(r => r.price > 0 && r.store === 'Amazon')
              || items.find(r => r.price > 0 && r.store === 'eBay')
              || items.find(r => r.price > 0);
      if (!best) return null;
      // 优先选真实URL图片（不要base64）
      let imgItem = best;
      if (best.image && best.image.startsWith('data:')) {
        const withUrl = items.find(r => r.price > 0 && r.image && !r.image.startsWith('data:'));
        if (withUrl) imgItem = withUrl;
      }
      return { name, price: imgItem.price, store: imgItem.store, image: imgItem.image || '' };
    })
  );
  results.forEach(r => {
    if (r.status === 'fulfilled' && r.value) {
      prices[r.value.name] = { price: r.value.price, store: r.value.store, image: r.value.image || '' };
    }
  });

  // 5. 存回 KV
  await env.USERS?.put(CACHE_KEY, JSON.stringify({ prices, done: todo.length <= BATCH }), { expirationTtl: CACHE_TTL + 3600 });

  return new Response(JSON.stringify({ prices, cached: false }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
  });
}
