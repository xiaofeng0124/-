
const MOCK_PRODUCTS = {
  'airpods pro': {
    name: 'Apple AirPods Pro (2nd Gen)',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT7g0hwJ1OevttWG6cNAuXBRXWmw_lSvxeslvctkt78vg5OFmesGjzAnTZ9affUAb8j22IyYQvHupKyZpoC2ir7PIcpra6-ilpj2GjKl7k',
    stores: [
      { store: 'Amazon', price: 199.99, rating: 4.5, reviews: 28450, shipDays: 2, reputation: 95, url: '#' },
      { store: 'Walmart', price: 189.99, rating: 4.3, reviews: 12300, shipDays: 3, reputation: 92, url: '#' },
      { store: 'eBay', price: 169.99, rating: 4.1, reviews: 8900, shipDays: 5, reputation: 88, url: '#' },
      { store: 'Best Buy', price: 199.99, rating: 4.6, reviews: 15200, shipDays: 1, reputation: 94, url: '#' },
      { store: 'Target', price: 199.99, rating: 4.4, reviews: 7600, shipDays: 2, reputation: 91, url: '#' }
    ]
  },
  'ps5': {
    name: 'Sony PlayStation 5 Digital Edition',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTc_0XEWN8zrXylA0fJLbV0xIjDnAVN-bzrrOL8WkhG-f-A_CzT4TyDW2lv3lfymq7Getjw3hPDsLLLeLS__4juY4BtZaCRMgD_CakHlOtefDCq4Utna_7Glg',
    stores: [
      { store: 'Amazon', price: 449.99, rating: 4.7, reviews: 52100, shipDays: 2, reputation: 95, url: '#' },
      { store: 'Walmart', price: 449.99, rating: 4.5, reviews: 31200, shipDays: 3, reputation: 92, url: '#' },
      { store: 'eBay', price: 429.99, rating: 4.0, reviews: 15400, shipDays: 5, reputation: 85, url: '#' },
      { store: 'Best Buy', price: 449.99, rating: 4.6, reviews: 28100, shipDays: 1, reputation: 94, url: '#' },
      { store: 'Target', price: 449.99, rating: 4.4, reviews: 9800, shipDays: 2, reputation: 91, url: '#' }
    ]
  },
  'sony headphones': {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQMhBdy3y9VcJgaP_D2CKpd6wX76yAqFZZP5Majq-FJXvqzAwxvJvEwsMLOipRS0tlSNsyFyKE8p37vwjeLbLxshZWZnbuzjGT33Gv2Bmgi4-7CektwVxUE',
    stores: [
      { store: 'Amazon', price: 349.99, rating: 4.6, reviews: 19800, shipDays: 2, reputation: 95, url: '#' },
      { store: 'Walmart', price: 328.00, rating: 4.4, reviews: 8700, shipDays: 3, reputation: 92, url: '#' },
      { store: 'eBay', price: 299.99, rating: 4.2, reviews: 5400, shipDays: 5, reputation: 87, url: '#' },
      { store: 'Best Buy', price: 329.99, rating: 4.5, reviews: 12300, shipDays: 1, reputation: 94, url: '#' },
      { store: 'Target', price: 348.00, rating: 4.3, reviews: 4100, shipDays: 2, reputation: 91, url: '#' }
    ]
  },
  'iphone 15': {
    name: 'Apple iPhone 15 Pro Max 256GB',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTWZOetxxII_InRmkerS2okIRJCYL_ss847xT_1fSpjvfAMTNLuBKgdqU3SJIjDMz5xGSNQ2Yn2trRKIwcaNUBqOnXhx60yTPFCU5Eee0BW',
    stores: [
      { store: 'Amazon', price: 1199.99, rating: 4.7, reviews: 46200, shipDays: 2, reputation: 95, url: '#' },
      { store: 'Walmart', price: 1179.00, rating: 4.5, reviews: 21100, shipDays: 3, reputation: 92, url: '#' },
      { store: 'eBay', price: 1099.99, rating: 4.3, reviews: 18200, shipDays: 5, reputation: 86, url: '#' },
      { store: 'Best Buy', price: 1199.99, rating: 4.6, reviews: 32100, shipDays: 1, reputation: 94, url: '#' }
    ]
  },
  'samsung tv': {
    name: 'Samsung 65" OLED 4K Smart TV',
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSt8QOsyozj2UmsLG2cGVWngs9zca4ljdtSiZs4tx5LX9q0jv6oQJE9VJTh3Dk7ZNecmeAhESmF5Cda6kPHlPPJzwcSb66SUqxYJKAyyBW9_pBqqfwBoCJx',
    stores: [
      { store: 'Amazon', price: 1799.99, rating: 4.5, reviews: 12400, shipDays: 3, reputation: 95, url: '#' },
      { store: 'Walmart', price: 1748.00, rating: 4.3, reviews: 5600, shipDays: 5, reputation: 92, url: '#' },
      { store: 'eBay', price: 1599.99, rating: 4.1, reviews: 3200, shipDays: 7, reputation: 85, url: '#' },
      { store: 'Best Buy', price: 1749.99, rating: 4.6, reviews: 8900, shipDays: 1, reputation: 94, url: '#' }
    ]
  },
  'macbook pro': {
    name: 'Apple MacBook Pro 14" M3 Pro',
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQCiLJDsw_5HaAzWN-qHzRtK2hSnkUFVBoWNm3PSEIoFOf50RsxQ9bqjAnjgo7zl7dNSd4hYndBwUpQL2NLeuyqWins3Cnn7yWl6KLIzYY7',
    stores: [
      { store: 'Amazon', price: 1999.99, rating: 4.6, reviews: 18200, shipDays: 2, reputation: 95, url: '#' },
      { store: 'Walmart', price: 1949.00, rating: 4.4, reviews: 5400, shipDays: 3, reputation: 92, url: '#' },
      { store: 'Best Buy', price: 1999.99, rating: 4.7, reviews: 12400, shipDays: 1, reputation: 94, url: '#' },
      { store: 'Target', price: 1999.99, rating: 4.5, reviews: 3100, shipDays: 2, reputation: 91, url: '#' }
    ]
  },
  'nintendo switch': {
    name: 'Nintendo Switch OLED Mario Bundle',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSkxQ7-KEyowOYGrR-tgXnS-1TCeqK0I5oizsaii5klUwRDFvdsMh1Kei4H_jpfTuMkcmMdNX61UmS5uTg9KbNnJSoXUdPQBc8R_DVrxuC1z8C7YH7kmB5nJYg',
    stores: [
      { store: 'Amazon', price: 349.99, rating: 4.8, reviews: 45200, shipDays: 2, reputation: 95, url: '#' },
      { store: 'Walmart', price: 345.00, rating: 4.6, reviews: 21500, shipDays: 3, reputation: 92, url: '#' },
      { store: 'eBay', price: 329.99, rating: 4.3, reviews: 12800, shipDays: 5, reputation: 87, url: '#' },
      { store: 'Target', price: 349.99, rating: 4.5, reviews: 8900, shipDays: 2, reputation: 91, url: '#' }
    ]
  },
  'google pixel': {
    name: 'Google Pixel 8 Pro 128GB',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTSzJRX6WF4Ou5SlNxroox4erFoeapqR6opV6PbhfBgKeScU_B6_TrAKk5GL2LFX-TavjIeD6j_8UBTxaiEg5V9nV3NXgXyn_9hrFr-BHl4cLaOM5X-HQbx',
    stores: [
      { store: 'Amazon', price: 799.99, rating: 4.4, reviews: 15800, shipDays: 2, reputation: 95, url: '#' },
      { store: 'Walmart', price: 769.00, rating: 4.3, reviews: 6700, shipDays: 3, reputation: 92, url: '#' },
      { store: 'Best Buy', price: 799.99, rating: 4.5, reviews: 9600, shipDays: 1, reputation: 94, url: '#' },
      { store: 'eBay', price: 729.99, rating: 4.1, reviews: 4100, shipDays: 5, reputation: 86, url: '#' }
    ]
  }
};

const STORE_CONFIG = {
  Amazon: { bg: '#ff9900' },
  Walmart: { bg: '#0071dc' },
  eBay: { bg: '#e53238' },
  'Best Buy': { bg: '#0046be' },
  Target: { bg: '#cc0000' },
  Temu: { bg: '#e60012' }
};

function proxyImg(url) {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('/api/img')) return url;
  return '/api/img?url=' + encodeURIComponent(url);
}

function getStoreUrl(store, productName, price) {
  const q = encodeURIComponent(productName);
  switch (store) {
    case 'Amazon':
      return `https://www.amazon.com/s?k=${q}&tag=snapprice04-20`;
    case 'Walmart':
      return `https://www.walmart.com/search?q=${q}`;
    case 'eBay':
      return `https://www.ebay.com/sch/i.html?_nkw=${q}&_sop=15&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339155328&toolid=10001&mkevt=1`;
    case 'Best Buy':
      return `https://www.bestbuy.com/site/searchpage.jsp?st=${q}`;
    case 'Target':
      return `https://www.target.com/s?searchTerm=${q}`;
    default:
      return `https://www.amazon.com/s?k=${q}&tag=snapprice04-20`;
  }
}

// ======== Multi-language Keywords ========
const LANG_KEYWORDS = {
  'airpods pro': ['airpods pro', 'airpods', '苹果耳机', '无线耳机', '降噪耳机', 'аирподс', '에어팟', 'エアポッズ'],
  'ps5': ['ps5', 'playstation 5', 'playstation', '游戏机', '索尼游戏机', 'пс5', '플레이스테이션', 'プレステ'],
  'sony headphones': ['sony', 'wh-1000xm5', 'sony headphones', '索尼耳机', '头戴式耳机', 'наушники', '소니 헤드폰', 'ソニーヘッドホン'],
  'iphone 15': ['iphone 15', 'iphone', '苹果手机', 'iphone15', 'аифон', '아이폰', 'アイフォン'],
  'samsung tv': ['samsung tv', 'samsung', '三星电视', 'oled电视', 'самсунг', '삼성 티비', 'サムスンテレビ'],
  'macbook pro': ['macbook pro', 'macbook', '苹果笔记本', '笔记本', 'макбук', '맥북', 'マックブック'],
  'nintendo switch': ['nintendo switch', 'switch', '任天堂', '游戏机', 'свитч', '닌텐도', 'ニンテンドースイッチ'],
  'google pixel': ['google pixel', 'pixel 8', '谷歌手机', 'пиксель', '구글 픽셀', 'グーグルピクセル']
};

// ======== Popular Products Pool (60 items, refresh picks 40) ========
const POPULAR_POOL = [
  { name: 'Apple iPhone 16 Pro Max', price: 299 },
  { name: 'Samsung Galaxy S25 Ultra', price: 299 },
  { name: 'Google Pixel 9 Pro', price: 199 },
  { name: 'Apple iPhone 16', price: 59 },
  { name: 'Samsung Galaxy S25', price: 199 },
  { name: 'MacBook Air M4', price: 59 },
  { name: 'Apple iPhone 17', price: 999 },
  { name: 'AirPods Pro 3', price: 199 },
  { name: 'AirPods 4', price: 99 },
  { name: 'Sony WH-1000XM6 Headphones', price: 59 },
  { name: 'Apple Watch Ultra 3', price: 299 },
  { name: 'Apple Watch Series 10', price: 199 },
  { name: 'PlayStation 5 Slim', price: 59 },
  { name: 'Xbox Series X 2TB', price: 59 },
  { name: 'Nintendo Switch 2', price: 59 },
  { name: 'Nike Air Max 2025', price: 199 },
  { name: 'Adidas Ultraboost Light', price: 299 },
  { name: 'New Balance 990v6', price: 59 },
  { name: 'Nike Air Force 1', price: 59 },
  { name: 'Crocs Classic Clogs', price: 59 },
  { name: 'UGG Classic Boots', price: 59 },
  { name: 'Levi 501 Original Jeans', price: 199 },
  { name: 'Champion Hoodie', price: 59 },
  { name: 'Instant Pot Duo Plus', price: 59 },
  { name: 'KitchenAid Stand Mixer', price: 59 },
  { name: 'Dyson V15 Detect', price: 59 },
  { name: 'Ninja Creami Deluxe', price: 59 },
  { name: 'Keurig K-Elite Coffee', price: 59 },
  { name: 'Peloton Bike+', price: 299 },
  { name: 'Bowflex Adjustable Dumbbells', price: 59 },
  { name: 'Apple AirTag 4 Pack', price: 59 },
  { name: 'Women Summer Dress', price: 39 },
  { name: 'Women Yoga Leggings', price: 39 },
  { name: 'Women Denim Jacket', price: 99 },
  { name: 'Cashmere Sweater Women', price: 39 },
  { name: 'Silk Blouse Women', price: 39 },
  { name: 'High Waist Leggings', price: 39 },
  { name: 'Women Winter Coat', price: 299 },
  { name: 'Floral Maxi Dress', price: 199 },
  { name: 'Women Running Shoes', price: 59 },
  { name: 'Fleece Pullover', price: 39 },
  { name: 'Vitamix Blender', price: 299 },
  { name: 'Breville Espresso Machine', price: 299 },
  { name: 'iRobot Roomba Vacuum', price: 199 },
  { name: 'Air Fryer Oven', price: 99 },
  { name: 'Le Creuset Dutch Oven', price: 299 },
  { name: 'LED Strip Lights', price: 39 },
  { name: 'Canvas Wall Art Set', price: 39 },
  { name: 'Artificial Plants Decor', price: 39 },
  { name: 'Throw Pillow Covers Set', price: 39 },
  { name: 'Scented Candles Gift Set', price: 39 },
  { name: 'Standing Desk Adjustable', price: 299 },
  { name: 'Office Ergonomic Chair', price: 299 },
  { name: 'Bookshelf 5 Tier', price: 99 },
  { name: 'Storage Cabinet', price: 59 },
  { name: 'Floor Lamp Modern', price: 59 },
  { name: 'Samsung 65 Inch OLED TV', price: 299 },
  { name: 'Portable Air Conditioner', price: 99 },
  { name: 'Smart Air Purifier', price: 39 },
  { name: 'Robot Vacuum Mop Combo', price: 59 },
  { name: 'Mini Dehumidifier', price: 99 },
  { name: 'Men Casual Shirt', price: 29 },
  { name: 'Men Winter Jacket', price: 99 },
  { name: 'Men Running Sneakers', price: 59 },
  { name: 'Men Slim Jeans', price: 29 },
  { name: 'Men Leather Watch', price: 199 },
  { name: 'Camping Tent 4 Person', price: 99 },
  { name: 'Hiking Backpack 40L', price: 99 },
  { name: 'Insulated Water Bottle', price: 59 },
  { name: 'Portable Camping Hammock', price: 59 },
  { name: 'Outdoor Propane Grill', price: 199 },
  { name: 'Wireless Phone Charger', price: 29 },
  { name: 'Smart WiFi Light Bulb', price: 39 },
  { name: 'Electric Kettle Stainless', price: 99 },
  { name: 'Yoga Mat Non Slip', price: 39 },
  { name: 'Resistance Bands Set', price: 39 },
  { name: 'Car Phone Mount', price: 29 },
  { name: 'Vitamin D3 Supplement', price: 29 },
  { name: 'Organic Protein Powder', price: 199 },
  { name: 'Cat Food Dispenser', price: 29 },
];
let currentPopular = [];

const MOCK_COUPONS = {
  Amazon: [
    { code: 'SAVE10', desc: '10% off electronics', expiry: '2026-06-30' },
    { code: 'FREESHIP', desc: 'Free shipping on orders $25+', expiry: '2026-12-31' }
  ],
  Walmart: [
    { code: 'WALMART5', desc: '$5 off orders $50+', expiry: '2026-06-15' }
  ],
  'Best Buy': [
    { code: 'BESTBUY20', desc: '20% off select items', expiry: '2026-06-01' }
  ],
  Target: [
    { code: 'TARGET15', desc: '15% off one item', expiry: '2026-07-01' }
  ],
  eBay: [
    { code: 'EBAY5OFF', desc: '5% off when you buy 2+', expiry: '2026-06-20' }
  ]
};


function generatePriceHistory(basePrice, days = 90) {
  const data = [];
  const now = Date.now();
  let price = basePrice;
  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 86400000);
    const change = (Math.random() - 0.48) * basePrice * 0.03;
    price = Math.max(basePrice * 0.75, Math.min(basePrice * 1.25, price + change));
    data.push({ date: date.toISOString().slice(0, 10), price: Math.round(price * 100) / 100 });
  }
  return data;
}

const PRICE_HISTORY_CACHE = {};

let uploadedPhotos = [];
let currentProduct = null;
let currentUser = null;
let currentPage = 1;
const ITEMS_PER_PAGE = 40;
let paginatedStores = [];
let priceChartInstance = null;
let currentHistoryProduct = null;
let currentHistoryStore = null;
let currentHistoryImage = '';

// ======== Auth (Server-side via Cloudflare Workers + KV) ========
let localUserData = null;

function getSession() {
  try { return JSON.parse(sessionStorage.getItem('sr_session') || 'null'); } catch { return null; }
}
function setSession(token, email) {
  if (token) sessionStorage.setItem('sr_session', JSON.stringify({ token, email }));
  else sessionStorage.removeItem('sr_session');
}

async function syncUserData() {
  const s = getSession();
  if (!s) { localUserData = null; return; }
  try {
    const res = await fetch('/api/userdata', { headers: { 'Authorization': `Bearer ${s.token}` } });
    if (res.ok) localUserData = await res.json();
  } catch { localUserData = { favorites: [], alerts: [] }; }
}

async function persistUserData() {
  const s = getSession();
  if (!s || !localUserData) return;
  fetch('/api/userdata', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${s.token}` },
    body: JSON.stringify(localUserData),
  });
}

async function register(email, password) {
  try {
    const res = await fetch('/api/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.ok) {
      if (data.needVerify) return { needVerify: true, email: data.email };
      setSession(data.session, data.email); await syncUserData(); return { ok: true };
    }
    return { ok: false, error: data.error };
  } catch { return { ok: false, error: 'Network error' }; }
}

async function login(email, password) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.ok) { setSession(data.session, data.email); await syncUserData(); return { ok: true }; }
    return { ok: false, error: data.error };
  } catch { return { ok: false, error: 'Network error' }; }
}

async function logout() {
  const s = getSession();
  if (s) fetch('/api/logout', { method: 'POST', headers: { 'Authorization': `Bearer ${s.token}` } }).catch(() => {});
  setSession(null);
  currentUser = null;
  localUserData = null;
  updateUIForAuth();
}

function getFavorites() { return localUserData?.favorites || []; }
function getAlerts() { return localUserData?.alerts || []; }

function addFavorite(item) {
  if (!localUserData) return;
  if (!localUserData.favorites.some(f => f.productName === item.productName && f.store === item.store)) {
    localUserData.favorites.push({ ...item, addedAt: new Date().toISOString() });
    persistUserData();
  }
}
function removeFavorite(productName, store) {
  if (!localUserData) return;
  localUserData.favorites = localUserData.favorites.filter(f => !(f.productName === productName && f.store === store));
  persistUserData();
}
function isFavorited(productName, store) {
  return localUserData?.favorites?.some(f => f.productName === productName && f.store === store) || false;
}

function addAlert(alert) {
  if (!localUserData) return;
  localUserData.alerts.push({ ...alert, createdAt: new Date().toISOString(), id: Date.now().toString(36) });
  persistUserData();
}
function removeAlert(id) {
  if (!localUserData) return;
  localUserData.alerts = localUserData.alerts.filter(a => a.id !== id);
  persistUserData();
}

// ======== UI: Auth Modal ========
function showAuthModal(tab = 'login') {
  document.getElementById('authModal').classList.add('active');
  renderAuthForm(tab);
}
function hideAuthModal() { document.getElementById('authModal').classList.remove('active'); }

function renderAuthForm(tab) {
  const container = document.getElementById('authFormContainer');
  const googleBtn = `<button class="btn-google" onclick="window.location.href='/api/auth/google'"><svg viewBox="0 0 48 48" width="18" height="18"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.48 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.82.87 7.44 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg> Sign in with Google</button>`;
  if (tab === 'login') {
    container.innerHTML = `
      <h2>Welcome back</h2>
      <p class="sub">Sign in to track prices & save favorites</p>
      ${googleBtn}
      <div class="auth-divider"><span>or continue with email</span></div>
      <div class="auth-error" id="authError"></div>
      <div class="form-group"><label>Email</label><input type="email" id="loginEmail" placeholder="you@example.com"></div>
      <div class="form-group"><label>Password</label><div style="position:relative"><input type="password" id="loginPassword" placeholder="Enter your password" style="padding-right:40px"><span class="pw-toggle" data-for="loginPassword" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:18px;user-select:none">👁️</span></div></div>
      <div style="text-align:right;margin:-4px 0 8px"><a id="forgotPwLink" style="font-size:13px;color:var(--primary);cursor:pointer">Forgot password?</a></div>
      <div class="form-row">
        <label class="checkbox-label"><input type="checkbox" id="rememberPw"> Remember password</label>
        <label class="checkbox-label"><input type="checkbox" id="autoLogin"> Auto login</label>
      </div>
      <button class="btn-primary" id="loginSubmitBtn">Sign In</button>
      <div class="auth-toggle">Don't have an account? <a id="authSwitchToRegister">Create one</a></div>
    `;
    document.getElementById('loginSubmitBtn').addEventListener('click', handleLogin);
    document.getElementById('loginPassword').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin(); });
    document.getElementById('authSwitchToRegister').addEventListener('click', () => renderAuthForm('register'));
    document.getElementById('forgotPwLink').addEventListener('click', showForgotPasswordForm);
    initLoginPwToggle();

				const prefs = loadLoginPrefs();
				if (prefs.remember) {
				  document.getElementById('loginEmail').value = prefs.email || '';
				  document.getElementById('rememberPw').checked = true;
				  if (prefs.password) document.getElementById('loginPassword').value = decodeURIComponent(atob(prefs.password));
				  if (prefs.autoLogin) document.getElementById('autoLogin').checked = true;
				}
  } else {
    container.innerHTML = `
      <h2>Create account</h2>
      <p class="sub">Save favorites, set price alerts</p>
      ${googleBtn}
      <div class="auth-divider"><span>or continue with email</span></div>
      <div class="auth-error" id="authError"></div>
      <div class="form-group"><label>Email</label><input type="email" id="regEmail" placeholder="you@example.com"></div>
      <div class="form-group">
        <label>Password</label>
        <div style="position:relative">
          <input type="password" id="regPassword" placeholder="At least 6 characters" style="padding-right:40px">
          <span id="pwToggle" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:18px;user-select:none">👁️</span>
        </div>
      </div>
      <div class="form-group">
        <label>Enter the numbers below</label>
        <div style="display:flex;gap:8px;align-items:center">
          <span id="captchaDisplay" style="font-size:20px;font-weight:800;letter-spacing:4px;background:var(--gray-100);padding:8px 16px;border-radius:8px;font-family:monospace"></span>
          <input type="text" id="captchaInput" placeholder="0000" maxlength="4" style="width:90px;text-align:center;font-size:18px;letter-spacing:3px;font-family:monospace">
          <button id="refreshCaptcha" style="background:none;border:none;cursor:pointer;font-size:18px">🔄</button>
        </div>
      </div>
      <div class="form-group" id="verifyCodeGroup" style="display:none">
        <label>Verification code</label>
        <div style="display:flex;gap:8px">
          <input type="text" id="regCodeInput" placeholder="000000" maxlength="6" style="flex:1;text-align:center;font-size:18px;letter-spacing:4px;font-weight:700;font-family:monospace">
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-direction:column">
        <button class="btn-primary" id="sendCodeBtn">Send verification code</button>
        <button class="btn-primary" id="createAccountBtn" style="display:none">Create Account</button>
      </div>
      <div class="auth-toggle">Already have an account? <a id="authSwitchToLogin">Sign in</a></div>
    `;
    document.getElementById('sendCodeBtn').addEventListener('click', handleSendCode);
    document.getElementById('createAccountBtn').addEventListener('click', handleRegister);
    document.getElementById('regPassword').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSendCode(); });
    document.getElementById('regCodeInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleRegister(); });
    document.getElementById('authSwitchToLogin').addEventListener('click', () => renderAuthForm('login'));
    initRegisterCaptcha();
    initPwToggle();
  }
}

function initPwToggle() {
  const toggle = document.getElementById('pwToggle');
  const input = document.getElementById('regPassword');
  if (!toggle || !input) return;
  toggle.addEventListener('click', () => {
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    toggle.textContent = isPw ? '🙈' : '👁️';
  });
}

function initLoginPwToggle() {
  const toggle = document.querySelector('.pw-toggle[data-for="loginPassword"]');
  const input = document.getElementById('loginPassword');
  if (!toggle || !input) return;
  toggle.addEventListener('click', () => {
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    toggle.textContent = isPw ? '🙈' : '👁️';
  });
}

function initRegisterCaptcha() {
  const display = document.getElementById('captchaDisplay');
  const input = document.getElementById('captchaInput');
  const refresh = document.getElementById('refreshCaptcha');
  if (!display) return;
  const code = String(Math.floor(1000 + Math.random() * 9000));
  display.textContent = code;
  display.dataset.code = code;
  if (input) input.value = '';
  if (refresh) {
    const clone = refresh.cloneNode(true);
    refresh.parentNode.replaceChild(clone, refresh);
    clone.addEventListener('click', () => {
      const newCode = String(Math.floor(1000 + Math.random() * 9000));
      display.textContent = newCode;
      display.dataset.code = newCode;
      if (input) input.value = '';
    });
  }
}

function isCaptchaValid() {
  const display = document.getElementById('captchaDisplay');
  const input = document.getElementById('captchaInput');
  return input?.value.trim() === display?.dataset.code;
}

async function handleSendCode() {
  const email = document.getElementById('regEmail').value.trim();
  const pw = document.getElementById('regPassword').value;
  const err = document.getElementById('authError');
  if (!email || !pw) { err.textContent = 'Please fill in all fields'; err.classList.add('show'); return; }
  if (pw.length < 6) { err.textContent = 'Password must be at least 6 characters'; err.classList.add('show'); return; }
  if (!isCaptchaValid()) { err.textContent = 'Please enter the correct code shown above'; err.classList.add('show'); return; }
  const btn = document.getElementById('sendCodeBtn');
  btn.disabled = true; btn.textContent = 'Sending...';
  const result = await register(email, pw);
  btn.disabled = false; btn.textContent = 'Send verification code';
  if (result.needVerify) {
    document.getElementById('verifyCodeGroup').style.display = 'block';
    document.getElementById('sendCodeBtn').style.display = 'none';
    document.getElementById('createAccountBtn').style.display = 'block';
    window._pendingEmail = email;
    window._pendingPassword = pw;
    err.classList.remove('show');
  } else {
    if (result.error === 'Daily registration limit reached. Please try again tomorrow.') {
      btn.disabled = true;
      btn.textContent = "🚫 Today's limit reached";
      btn.style.background = 'var(--gray-400)';
      btn.style.cursor = 'not-allowed';
      document.getElementById('regEmail').disabled = true;
      document.getElementById('regPassword').disabled = true;
    }
    err.textContent = result.error; err.classList.add('show');
  }
}

async function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPassword').value;
  const err = document.getElementById('authError');
  if (!email || !pw) { err.textContent = 'Please fill in all fields'; err.classList.add('show'); return; }
  const remember = document.getElementById('rememberPw')?.checked || false;
  const autoLogin = document.getElementById('autoLogin')?.checked || false;
  const btn = document.getElementById('loginSubmitBtn');
  btn.disabled = true; btn.textContent = 'Signing in...';
  const result = await login(email, pw);
  btn.disabled = false; btn.textContent = 'Sign In';
  if (result.ok) { hideAuthModal(); currentUser = getSession(); updateUIForAuth(); saveLoginPrefs(email, pw, remember, autoLogin); checkMembership(); }
  else { err.textContent = result.error; err.classList.add('show'); }
}

async function handleRegister() {
  const code = document.getElementById('regCodeInput').value.trim();
  const email = window._pendingEmail;
  const pw = window._pendingPassword;
  const err = document.getElementById('authError');
  if (!code || code.length !== 6) { err.textContent = 'Please enter the 6-digit verification code'; err.classList.add('show'); return; }
  if (!email || !pw) { err.textContent = 'Session expired. Please start over.'; err.classList.add('show'); return; }
  const btn = document.getElementById('createAccountBtn');
  btn.disabled = true; btn.textContent = 'Creating account...';
  try {
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (data.ok) {
      setSession(data.session, data.email);
      currentUser = getSession(); updateUIForAuth(); saveLoginPrefs(email, pw); checkMembership();

      const container = document.getElementById('authFormContainer');
      container.innerHTML = `
        <div style="text-align:center;padding:20px 8px">
          <div style="font-size:48px;margin-bottom:12px">🎉</div>
          <h2 style="margin-bottom:8px">Registration successful!</h2>
          <p class="sub" style="font-size:14px;color:var(--gray-500);margin-bottom:20px">Welcome to SnappRice! Start searching and saving today.</p>
          <button class="btn-primary" id="successCloseBtn" style="width:100%">Start searching</button>
        </div>
      `;
      document.getElementById('successCloseBtn').addEventListener('click', hideAuthModal);
    } else {
      btn.disabled = false; btn.textContent = 'Create Account';
      err.textContent = data.error || 'Verification failed'; err.classList.add('show');
    }
  } catch (e) {
    btn.disabled = false; btn.textContent = 'Create Account';
    err.textContent = 'Network error. Please try again.'; err.classList.add('show');
  }
}

function showVerifyForm(email, password) {
  const container = document.getElementById('authFormContainer');
  container.innerHTML = `
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:40px;margin-bottom:12px">✉️</div>
      <h2>Check your email</h2>
      <p class="sub" style="font-size:14px;color:var(--gray-500);margin-bottom:16px">We sent a verification code to <strong>${email}</strong></p>
      <div class="auth-error" id="authError"></div>
      <div class="form-group">
        <label>Verification Code</label>
        <input type="text" id="verifyCodeInput" placeholder="000000" maxlength="6" style="font-size:24px;letter-spacing:6px;text-align:center;font-weight:700">
      </div>
      <button class="btn-primary" id="verifyCodeBtn" style="width:100%">Verify Email</button>
      <div style="margin-top:12px;font-size:13px;color:var(--gray-500)">
        Didn't get it? <a id="resendCodeLink" style="color:var(--primary);cursor:pointer">Resend code</a>
        <span id="resendTimer" style="display:none;color:var(--gray-400)"></span>
      </div>
    </div>
  `;
  document.getElementById('verifyCodeBtn').addEventListener('click', () => handleVerifyCode(email));
  document.getElementById('verifyCodeInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleVerifyCode(email); });
  document.getElementById('verifyCodeInput').focus();
  document.getElementById('resendCodeLink').addEventListener('click', () => resendCode(email, password));
  window._pendingPassword = password;
}

async function handleVerifyCode(email) {
  const code = document.getElementById('verifyCodeInput').value.trim();
  const err = document.getElementById('authError');
  if (!code || code.length !== 6) { err.textContent = 'Please enter the 6-digit verification code'; err.classList.add('show'); return; }
  const btn = document.getElementById('verifyCodeBtn');
  btn.disabled = true; btn.textContent = 'Verifying...';
  try {
    const res = await fetch('/api/verify-code', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (data.ok) {
      setSession(data.session, data.email);
      currentUser = getSession();
      await syncUserData();
      hideAuthModal();
      updateUIForAuth();
      saveLoginPrefs(email, window._pendingPassword || '');
      if (getSession()) checkMembership();
      window._pendingPassword = null;
    } else {
      btn.disabled = false; btn.textContent = 'Verify Email';
      err.textContent = data.error || 'Invalid code'; err.classList.add('show');
    }
  } catch {
    btn.disabled = false; btn.textContent = 'Verify Email';
    err.textContent = 'Network error'; err.classList.add('show');
  }
}

async function resendCode(email, password) {
  const link = document.getElementById('resendCodeLink');
  const timer = document.getElementById('resendTimer');
  link.style.display = 'none';
  timer.style.display = 'inline';
  let seconds = 30;
  timer.textContent = `Resend in ${seconds}s`;
  const interval = setInterval(() => {
    seconds--;
    if (seconds <= 0) { clearInterval(interval); link.style.display = 'inline'; timer.style.display = 'none'; }
    else timer.textContent = `Resend in ${seconds}s`;
  }, 1000);

  fetch('/api/register', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).catch(() => {});
}

// ======== Forgot Password ========
function showForgotPasswordForm() {
  const container = document.getElementById('authFormContainer');
  container.innerHTML = `
    <div style="text-align:center;padding:8px 0">
      <h2>Reset password</h2>
      <p class="sub" style="font-size:14px;color:var(--gray-500);margin-bottom:16px">Enter your email and we'll send you a reset code</p>
      <div class="auth-error" id="authError"></div>
      <div class="form-group"><label>Email</label><input type="email" id="resetEmailInput" placeholder="you@example.com"></div>
      <button class="btn-primary" id="sendResetCodeBtn" style="width:100%">Send reset code</button>
      <div class="auth-toggle" style="margin-top:12px"><a id="backToLoginLink" style="cursor:pointer">← Back to sign in</a></div>
    </div>
  `;
  document.getElementById('sendResetCodeBtn').addEventListener('click', handleSendResetCode);
  document.getElementById('resetEmailInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSendResetCode(); });
  document.getElementById('backToLoginLink').addEventListener('click', () => renderAuthForm('login'));
  document.getElementById('resetEmailInput').focus();
}

async function handleSendResetCode() {
  const email = document.getElementById('resetEmailInput').value.trim();
  const err = document.getElementById('authError');
  if (!email) { err.textContent = 'Please enter your email'; err.classList.add('show'); return; }
  const btn = document.getElementById('sendResetCodeBtn');
  btn.disabled = true; btn.textContent = 'Sending...';
  try {
    const res = await fetch('/api/forgot-password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.ok) {
      showResetPasswordForm(email);
    } else {
      btn.disabled = false; btn.textContent = 'Send reset code';
      err.textContent = data.error || 'Failed to send'; err.classList.add('show');
    }
  } catch {
    btn.disabled = false; btn.textContent = 'Send reset code';
    err.textContent = 'Network error'; err.classList.add('show');
  }
}

function showResetPasswordForm(email) {
  const container = document.getElementById('authFormContainer');
  container.innerHTML = `
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:40px;margin-bottom:12px">✉️</div>
      <h2>Check your email</h2>
      <p class="sub" style="font-size:14px;color:var(--gray-500);margin-bottom:16px">We sent a reset code to <strong>${email}</strong></p>
      <div class="auth-error" id="authError"></div>
      <div class="form-group"><label>Reset code</label><input type="text" id="resetCodeInput" placeholder="000000" maxlength="6" style="font-size:20px;text-align:center;letter-spacing:4px;font-weight:700"></div>
      <div class="form-group"><label>New password</label><input type="password" id="resetNewPassword" placeholder="At least 6 characters"></div>
      <button class="btn-primary" id="resetPasswordBtn" style="width:100%">Reset password</button>
      <div class="auth-toggle" style="margin-top:12px"><a id="backToLoginLink2" style="cursor:pointer">← Back to sign in</a></div>
    </div>
  `;
  document.getElementById('resetPasswordBtn').addEventListener('click', () => handlePasswordReset(email));
  document.getElementById('resetCodeInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') handlePasswordReset(email); });
  document.getElementById('backToLoginLink2').addEventListener('click', () => renderAuthForm('login'));
  document.getElementById('resetCodeInput').focus();
}

async function handlePasswordReset(email) {
  const code = document.getElementById('resetCodeInput').value.trim();
  const password = document.getElementById('resetNewPassword').value;
  const err = document.getElementById('authError');
  if (!code || code.length !== 6) { err.textContent = 'Please enter the 6-digit reset code'; err.classList.add('show'); return; }
  if (!password || password.length < 6) { err.textContent = 'Password must be at least 6 characters'; err.classList.add('show'); return; }
  const btn = document.getElementById('resetPasswordBtn');
  btn.disabled = true; btn.textContent = 'Resetting...';
  try {
    const res = await fetch('/api/reset-password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, password }),
    });
    const data = await res.json();
    if (data.ok) {
      alert('Password reset successfully! You can now sign in with your new password.');
      renderAuthForm('login');
    } else {
      btn.disabled = false; btn.textContent = 'Reset password';
      err.textContent = data.error || 'Failed to reset'; err.classList.add('show');
    }
  } catch {
    btn.disabled = false; btn.textContent = 'Reset password';
    err.textContent = 'Network error'; err.classList.add('show');
  }
}

// ======== UI: Auth State ========
function saveLoginPrefs(email, pw, remember, autoLogin) {
  const prefs = {
    remember: remember || false,
    autoLogin: autoLogin || false,
    email: email || '',
    password: (remember || autoLogin) && pw ? btoa(encodeURIComponent(pw)) : ''
  };
  localStorage.setItem('sr_login_prefs', JSON.stringify(prefs));
}

function loadLoginPrefs() {
  try {
    const raw = localStorage.getItem('sr_login_prefs');
    return raw ? JSON.parse(raw) : { remember: false, autoLogin: false, email: '', password: '' };
  } catch { return { remember: false, autoLogin: false, email: '', password: '' }; }
}

async function tryAutoLogin() {
  const prefs = loadLoginPrefs();
  if (!prefs.autoLogin || !prefs.email || !prefs.password || getSession()) return;
  let pw;
  try { pw = decodeURIComponent(atob(prefs.password)); } catch { return; }
  const result = await login(prefs.email, pw);
  if (result.ok) {
    currentUser = getSession();
    updateUIForAuth();
    if (getSession()) syncUserData();
  }
}

function updateUIForAuth() {
  const actions = document.getElementById('headerActions');
  const user = getSession();
  currentUser = user;

  if (user) {
    const initial = user.email[0].toUpperCase();
    const premiumBtnText = membershipData && isPremium() ? 'Premium' : 'Go Premium';
    const premiumBtn = `<button class="btn-premium" id="pricingNavBtn">${premiumBtnText}</button>`;
    const expiryHtml = isPremium() && membershipData?.expiresAt
      ? `<div class="membership-expiry">Premium &middot; ${formatDate(membershipData.expiresAt)}</div>`
      : '';
    actions.innerHTML = `
        ${premiumBtn}
      <div class="desktop-header-actions">
        <button class="btn-ghost desktop-only" id="couponsNavBtn">Coupons</button><button class="btn-ghost desktop-only" id="favoritesBtn">Favorites</button>
        
        <div class="history-wrap desktop-only">
          <button class="btn-ghost" id="historyNavBtn">History</button>
          <div class="history-dropdown" id="historyDropdown">
            <div class="history-dropdown-header">
              <span>Recent Searches</span>
              <button id="historyClearBtn">Clear</button>
            </div>
            <div class="history-dropdown-list" id="historyList"></div>
          </div>
        </div>
        <div class="user-menu">
        <button class="user-menu-trigger" id="userMenuTrigger">
          <span class="user-avatar">${initial}</span>
          <span class="user-menu-info">
            <span class="user-menu-email">${user.email}</span>
            ${expiryHtml}
          </span>
        </button>
        <div class="user-dropdown" id="userDropdown">
          <a id="dropdownCoupons">Coupons</a>
          <a id="dropdownFavorites">Favorites</a>
          <a id="dropdownAlerts">Price Alerts</a>
          
<a id="dropdownHistory">History</a>
          
          ${user.email === '1067678960@qq.com' ? '<a id="dropdownAdmin">Admin Panel</a>' : ''}
          <div class="divider"></div>
          <a href="/account" style="text-decoration:none;display:block;font-weight:600;padding:8px 16px;font-size:13px;color:var(--primary)">My Account</a>
          <button class="danger" id="logoutBtn">Sign Out</button>
        </div>
      </div>
    `;
    document.getElementById('userMenuTrigger')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('userDropdown')?.classList.toggle('active');
    });

    if (!window._dropdownListener) {
      document.addEventListener('click', () => {
        const dd = document.getElementById('userDropdown');
        if (dd) dd.classList.remove('active');
      });
      window._dropdownListener = true;
    }
    document.getElementById('pricingNavBtn')?.addEventListener('click', showPricingModal);
    document.getElementById('favoritesBtn')?.addEventListener('click', () => { if (!getSession()) { showAuthModal('login'); return; } window.location.href = '/account'; });
        document.getElementById('dropdownFavorites')?.addEventListener('click', () => { window.location.href = '/account#favorites'; });
    document.getElementById('dropdownAlerts')?.addEventListener('click', () => { window.location.href = '/account#alerts'; });
    document.getElementById('dropdownHistory')?.addEventListener('click', () => { if (!getSession()) { showAuthModal('login'); return; } window.location.href = '/account#history'; });
    document.getElementById('dropdownCoupons')?.addEventListener('click', () => { window.location.href = '/account#coupons'; });
    document.getElementById('dropdownAdmin')?.addEventListener('click', () => { window.location.href = '/account#admin'; });
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    document.getElementById('historyNavBtn')?.addEventListener('click', (e) => { e.stopPropagation(); if (!getSession()) { showAuthModal('login'); return; } toggleSearchHistory(); });
    document.getElementById('historyClearBtn')?.addEventListener('click', () => { localStorage.removeItem('sr_history'); renderSearchHistory(); });
    document.getElementById('couponsNavBtn')?.addEventListener('click', () => { window.location.href = '/account'; });
  } else {
    actions.innerHTML = `
						<button class="btn-ghost desktop-only" id="couponsNavBtn">Coupons</button>
      <button class="btn-ghost desktop-only" id="favoritesBtn2">Favorites</button>
						<div class="history-wrap desktop-only">
							<button class="btn-ghost" id="historyNavBtn">History</button>
							<div class="history-dropdown" id="historyDropdown">
								<div class="history-dropdown-header">
									<span>Recent Searches</span>
									<button id="historyClearBtn">Clear</button>
								</div>
								<div class="history-dropdown-list" id="historyList"></div>
							</div>
						</div>
      <button class="btn-premium" id="pricingNavBtn">Go Premium</button>
      <button class="btn-outline" id="loginBtn">Sign In</button>
    `;
    document.getElementById('loginBtn')?.addEventListener('click', () => showAuthModal('login'));
    document.getElementById('pricingNavBtn')?.addEventListener('click', showPricingModal);
    document.getElementById('favoritesBtn2')?.addEventListener('click', () => { if (!getSession()) { showAuthModal('login'); return; } window.location.href = '/account'; });
    document.getElementById('couponsNavBtn')?.addEventListener('click', () => { window.location.href = '/account'; });
				document.getElementById('historyNavBtn')?.addEventListener('click', (e) => { e.stopPropagation(); if (!getSession()) { showAuthModal('login'); return; } toggleSearchHistory(); });
  }
}

// ======== Dashboard ========
function showDashboard() {
  if (!currentUser) { showAuthModal('login'); return; }
  document.getElementById('resultsSection').classList.remove('active');
  document.getElementById('dashboardSection').classList.add('active');
  document.getElementById('dashboardUserEmail').textContent = currentUser.email;
  switchDashboardTab('favorites');
}

function switchDashboardTab(tab) {
  document.querySelectorAll('.dashboard-tabs button').forEach(b => b.classList.remove('active'));
  document.querySelector(`.dashboard-tabs button[data-tab="${tab}"]`)?.classList.add('active');
  if (tab === 'favorites') renderDashboardFavorites();
  else if (tab === 'history') renderDashboardHistory();
  else if (tab === 'alerts') renderDashboardAlerts();
  else if (tab === 'coupons') renderDashboardCoupons();
}



function showAccountDashboard() {
  if (!currentUser) { showAuthModal('login'); return; }
  document.getElementById('sidebarEmail').textContent = currentUser.email;
  switchAccountTab('favorites');
}

function switchAccountTab(tab) {
  document.querySelectorAll('#sidebarNav button').forEach(function(b) { b.classList.remove('active'); });
  var btn = null;
  document.querySelectorAll('#sidebarNav button').forEach(function(b) {
    if (b.getAttribute('data-tab') === tab) btn = b;
  });
  if (btn) btn.classList.add('active');
  var container = document.getElementById('accountContent');
  if (!container) return;
  switch (tab) {
    case 'favorites': renderDashboardFavorites(container); break;
    case 'history': renderDashboardHistory(container); break;
    case 'alerts': renderDashboardAlerts(container); break;
    case 'coupons': renderDashboardCoupons(container); break;
    case 'settings': renderAccountSettings(container); break;
  }
}

function renderAccountSettings(container) {
  var user = currentUser || {};
  container.innerHTML = '<div style="max-width:500px">' +
    '<h3 style="font-size:22px;margin-bottom:20px;font-weight:700">Account Settings</h3>' +
    '<div style="background:var(--white);border:1px solid var(--gray-200);border-radius:12px;padding:24px">' +
      '<div style="margin-bottom:16px"><label style="font-size:13px;color:var(--gray-500);display:block;margin-bottom:4px">Email</label><div style="font-size:16px;font-weight:500">' + (user.email || '') + '</div></div>' +
      '<div style="margin-bottom:16px"><label style="font-size:13px;color:var(--gray-500);display:block;margin-bottom:4px">Membership</label><div style="font-size:16px;font-weight:500">' + (isPremium() ? 'Premium' : 'Free') + '</div></div>' +
    '</div>' +
    '<div style="margin-top:20px"><a href="/" style="padding:10px 24px;background:var(--primary);color:white;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Back to Search</a></div>' +
  '</div>';
}

function renderDashboardFavorites(contOverride) {
  const container = contOverride || document.getElementById('dashboardContent');
  const favs = getFavorites();
  if (!favs.length) {
    container.innerHTML = `<div class="dashboard-empty"><span>❤️</span><h3>No favorites yet</h3><p>Search for products and heart them to save here.</p></div>`;
    return;
  }
  container.innerHTML = `<div class="popular-grid">${favs.map(f => {
    const img = f.image || '';
    const buyUrl = getStoreUrl(f.store, f.productName, f.price);
    const pn = (f.productName || '').replace(/'/g, "\\'");
    return `<div class="popular-card" style="padding:10px">
      <img class="popular-card-img" src="${proxyImg(img)}" alt="${f.productName}" loading="lazy" onerror="this.parentElement.classList.add('img-failed')">
      <div style="font-size:11px;color:var(--gray-400);margin-bottom:2px">${f.store}</div>
      <div class="popular-card-name" style="font-size:13px;-webkit-line-clamp:2;line-height:1.3;margin-bottom:4px">${f.productName}</div>
      <div style="font-size:18px;font-weight:700;color:var(--primary);margin-bottom:6px">$${(f.price||0).toFixed(2)}</div>
      <div style="display:flex;gap:6px">
        <a href="${buyUrl}" target="_blank" rel="noopener" class="buy-btn" onclick="saveClickedProduct('${pn}','${f.store}',${f.price},'${img.replace(/'/g, "\\'")}')" style="font-size:13px;padding:8px 12px">Buy Now</a>
        <button class="icon-btn" style="width:36px;height:36px;font-size:13px;color:#ef4444" onclick="removeFavAndRefresh('${pn}','${f.store}')" title="Remove">✕</button>
      </div>
    </div>`;
  }).join('')}</div>`;
}

async function renderDashboardHistory(contOverride) {
  const container = contOverride || document.getElementById('dashboardContent');
  container.innerHTML = '<div style="text-align:center;padding:40px"><div class="loading-spinner"></div></div>';

  const s = getSession();
  if (!s) { container.innerHTML = '<div class="dashboard-empty"><span>🕐</span><h3>Sign in to see your search history</h3></div>'; return; }

  try {
    const res = await fetch('/api/user-search', {
      headers: { 'Authorization': `Bearer ${s.token}` }
    });
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    const history = data.history || [];

    if (!history.length) {
      container.innerHTML = '<div class="dashboard-empty"><span>🕐</span><h3>No search history yet</h3><p>Your searches will appear here.</p></div>';
      return;
    }

    container.innerHTML = `<div class="popular-grid">${history.map(h => {
      const img = h.image || '';
      const q = (h.query || '').replace(/'/g, "\\'");
      const name = h.name || h.query || '';
      return `<div class="popular-card" onclick="searchProduct('${q}')" style="cursor:pointer">
        <img class="popular-card-img" src="${proxyImg(img)}" alt="${name}" loading="lazy" onerror="this.parentElement.classList.add('img-failed')">
        <div class="popular-card-name">${name}</div>
        <div style="font-size:10px;color:var(--gray-400);margin-top:2px">${timeAgo(h.time)}</div>
      </div>`;
    }).join('')}</div>`;
  } catch {
    container.innerHTML = '<div class="dashboard-empty"><span>🕐</span><h3>Could not load search history</h3></div>';
  }
}

function removeFavAndRefresh(productName, store) {
  removeFavorite(productName, store);
  renderDashboardFavorites();
}

function renderDashboardAlerts(contOverride) {
  const container = document.getElementById('dashboardContent');
  const alerts = getAlerts();
  if (!alerts.length) {
    container.innerHTML = `<div class="dashboard-empty"><span>🔔</span><h3>No price alerts</h3><p>Set price alerts to get notified when prices drop.</p></div>`;
    return;
  }
  container.innerHTML = alerts.map(a => `
    <div class="dashboard-item">
      ${a.image ? '<img src="' + proxyImg(a.image) + '" alt="" style="width:40px;height:40px;object-fit:contain;border-radius:6px;flex-shrink:0" onerror="this.style.display=\'none\'">' : ''}
      <div class="dashboard-item-info">
        <h4>${a.productName}</h4>
        <p>${a.store} — Target: <strong>$${a.targetPrice.toFixed(2)}</strong> &nbsp;·&nbsp; Current: $${a.currentPrice.toFixed(2)}</p>
      </div>
      <button class="btn-sm btn-sm-outline" onclick="removeAlertAndRefresh('${a.id}')">Remove</button>
    </div>`).join('');
}

function removeAlertAndRefresh(id) {
  removeAlert(id);
  renderDashboardAlerts();
}

function renderDashboardCoupons(contOverride) {
  const container = document.getElementById('dashboardContent');
  let html = '<div class="coupons-grid">';
  for (const [store, coupons] of Object.entries(MOCK_COUPONS)) {
    coupons.forEach(c => {
      html += `<div class="coupon-card">
        <span class="store-tag" style="background:${STORE_CONFIG[store]?.bg||'#666'};color:white">${store}</span>
        <h4>${c.desc}</h4>
        <p>Expires: ${c.expiry}</p>
        <div class="coupon-large-code" onclick="copyCoupon('${c.code}')">${c.code} 📋</div>
      </div>`;
    });
  }
  html += '</div>';
  container.innerHTML = html;
}

function copyCoupon(code) {
  navigator.clipboard?.writeText(code).then(() => {
    const el = document.activeElement;
    if (el) { el.textContent = 'Copied! ✓'; setTimeout(() => { el.textContent = `${code} 📋`; }, 1500); }
  }).catch(() => {});
}

async function searchProduct(name) {
  document.getElementById('dashboardSection').classList.remove('active');
  document.getElementById('popularSection')?.classList.add('hidden');
  const loading = document.getElementById('loading');
  if (loading) loading.classList.add('active');
  const query = name.toLowerCase();

  let firstResult = true;

  const apiProduct = await searchViaAPI(query, (data) => {
    currentPage = 1;
    currentProduct = { name: data.name, image: data.image, stores: data.stores };

    if (firstResult) {
      firstResult = false;
      document.getElementById('loading').classList.remove('active');
      document.getElementById('resultsSection').classList.add('active');
      const header = document.getElementById('productHeader');
      header.innerHTML = `
        <div class="product-thumbs">${data.image ? `<img src="${proxyImg(data.image)}" alt="${data.name}" onerror="this.style.display='none'">` : ''}</div>
        <div class="product-meta">
          <h2>${data.name}</h2>
          <p>${data.stores.length} stores compared — find the best deal</p>
        </div>`;
    } else {
      const meta = document.querySelector('.product-meta p');
      if (meta) meta.textContent = `${data.stores.length} stores compared — find the best deal`;
    }

    renderSortedStores(data.stores, 'featured');
    document.getElementById('loadingMore').style.display = data.done ? 'none' : 'flex';
  });

  if (!apiProduct) {
    if (firstResult) {
      if (loading) loading.classList.remove('active');
      renderResults(query);
    }
  }
}

// ======== Price History ========
function openPriceHistory(productName, storeName, currentPrice, productImage) {
  const cacheKey = `${productName}_${storeName}`;
  if (!PRICE_HISTORY_CACHE[cacheKey]) {
    PRICE_HISTORY_CACHE[cacheKey] = generatePriceHistory(currentPrice, 90);
  }
  currentHistoryProduct = productName;
  currentHistoryStore = storeName;
  currentHistoryImage = productImage || '';
  document.getElementById('historyProductName').textContent = productName;
  document.getElementById('historyStoreName').textContent = storeName;
  document.getElementById('historyCurrentPrice').textContent = `Current: $${currentPrice.toFixed(2)}`;
  document.getElementById('historyModal').classList.add('active');
  updateAlertRemaining();

  const defaultDays = isPremium() ? 30 : 7;
  document.querySelectorAll('#historyControls button').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.range) === defaultDays);
  });
  renderPriceChart(defaultDays);
}

function loadChartJS() {
  if (window._chartLoading) return window._chartLoading;
  window._chartLoading = new Promise(function(resolve, reject) {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
  return window._chartLoading;
}

async function renderPriceChart(days) {
  if (typeof Chart === 'undefined') { try { await loadChartJS(); } catch { return; } }
  const data = PRICE_HISTORY_CACHE[`${currentHistoryProduct}_${currentHistoryStore}`];
  if (!data) return;
  const sliced = data.slice(-days);
  const prices = sliced.map(d => d.price);
  const labels = sliced.map(d => {
    const parts = d.date.split('-');
    return `${parts[1]}/${parts[2]}`;
  });
  const lowest = Math.min(...prices);
  document.getElementById('historyLowestPrice').textContent = `Lowest (${days}d): $${lowest.toFixed(2)}`;

  const ctx = document.getElementById('priceChart').getContext('2d');
  if (priceChartInstance) priceChartInstance.destroy();

  priceChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: prices,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.08)',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 5,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { maxTicksLimit: 10, font: { size: 10 } }, grid: { display: false } },
        y: {
          ticks: { font: { size: 10 }, callback: v => '$' + v.toFixed(0) },
          grid: { color: '#f1f5f9' }
        }
      },
      interaction: { intersect: false, mode: 'index' }
    }
  });
}

// ======== Popular Products 实时价格 ========
const POPULAR_CACHE_KEY = 'sr_popular_cache_v3';
const POPULAR_CACHE_TTL = 6 * 60 * 60 * 1000; // 6小时

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickPopularBatch() {
  currentPopular = shuffleArray(POPULAR_POOL).slice(0, 40);
}

function getLocalPriceCache() {
  try {
    const d = JSON.parse(localStorage.getItem(POPULAR_CACHE_KEY));
    return (d && Date.now() - d.t < POPULAR_CACHE_TTL) ? d.p : null;
  } catch { return null; }
}

function renderPopularProducts() {
  const grid = document.getElementById('popularGrid');
  if (!grid) return;
  if (currentPopular.length === 0) pickPopularBatch();

  const localCache = getLocalPriceCache();

  grid.innerHTML = currentPopular.map(p => {
    const q = p.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const safeName = p.name.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const real = localCache?.[p.name];
    const imgUrl = real?.image || p.img || '';
    return `
      <div class="popular-card" onclick="quickSearch('${q}','${safeName}')" data-popular="${safeName}">
        <img class="popular-card-img" src="${proxyImg(imgUrl)}" alt="${safeName}" loading="lazy" onerror="this.parentElement.classList.add('img-failed')">
        <div class="popular-card-name">${p.name}</div>
        ${real ? `<span class="popular-store">${real.store}</span>` : ''}
        <div class="popular-card-price" data-mock="${p.price}">${real ? '$' + real.price.toFixed(2) : '$' + p.price.toFixed(2)}</div>
      </div>`;
  }).join('');

  // 没有本地缓存或缓存过期 → 调后端 API 获取
  if (!localCache) fetchPopularPrices();
}

async function fetchPopularPrices() {
  try {
    const res = await fetch('/api/popular-prices');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.prices || Object.keys(data.prices).length === 0) { if (typeof retries === 'number' && retries < 6) setTimeout(() => fetchPopularPrices(retries+1), 10000); return; }

    // 本地缓存一份（减少重复请求）
    try { localStorage.setItem(POPULAR_CACHE_KEY, JSON.stringify({ p: data.prices, t: Date.now() })); } catch {}

    // 更新 DOM
    Object.entries(data.prices).forEach(([name, info]) => {
      const escapedName = name.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      const card = document.querySelector(`.popular-card[data-popular="${escapedName}"]`);
      if (!card) return;
      const priceEl = card.querySelector('.popular-card-price');
      if (priceEl) priceEl.textContent = '$' + info.price.toFixed(2);
      let storeEl = card.querySelector('.popular-store');
      if (!storeEl) {
        storeEl = document.createElement('span');
        storeEl.className = 'popular-store';
        card.querySelector('.popular-card-name')?.after(storeEl);
      }
      storeEl.textContent = info.store;
      // 更新图片（如果有真实商品图）
      if (info.image) {
        const imgEl = card.querySelector('.popular-card-img');
        if (imgEl) {
          imgEl.src = proxyImg(info.image);
          imgEl.classList.remove('img-failed');
        }
      }
    });
  } catch (e) { console.warn('获取实时价格失败:', e); }
}

function refreshPopular() {
  const btn = document.getElementById('refreshPopularBtn');
  if (!btn) return;
  btn.disabled = true;
  btn.textContent = '🔄 Refreshing...';
  const grid = document.getElementById('popularGrid');
  if (grid) grid.style.opacity = '0.3';
  pickPopularBatch();
  try { localStorage.removeItem(POPULAR_CACHE_KEY); } catch {}
  renderPopularProducts();
  setTimeout(() => {
    if (grid) grid.style.opacity = '1';
    btn.disabled = false;
    btn.textContent = 'Refresh';
  }, 300);
}

function quickSearch(query, safeName) {
  const input = document.getElementById('searchInput');
  if (input) input.value = query;
  // 同步浮动搜索栏
  const floatInput = document.getElementById('floatSearchInput');
  if (floatInput) floatInput.value = query;
  // 清除其他卡片的高亮
  document.querySelectorAll('.popular-card.selected').forEach(c => c.classList.remove('selected'));
  // 高亮当前点击的卡片
  if (safeName) {
    const card = document.querySelector(`.popular-card[data-popular="${safeName}"]`);
    if (card) card.classList.add('selected');
  }
  // 聚焦输入框但不自动搜索，用户可修改后点搜索按钮
  // 不聚焦输入框，防止页面滚动
}

// ======== Search History ========
function saveSearchHistory(product) {
  if (!product || !product.name) return;
  let history = JSON.parse(localStorage.getItem('sr_history') || '[]');
  history = history.filter(h => h.name !== product.name);
  history.unshift({
    name: product.name,
    image: product.image || '',
    query: product.query || product.name,
    time: Date.now()
  });
  if (history.length > 20) history = history.slice(0, 20);
  localStorage.setItem('sr_history', JSON.stringify(history));


  const s = getSession();
  if (s) {
    const query = product.query || product.name;
    fetch('/api/user-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${s.token}` },
      body: JSON.stringify({ query: query.toLowerCase(), name: product.name, image: product.image || '' }),
    }).catch(() => {});
  }
}

// ======== Clicked Products History (Buy Now tracking) ========
function saveClickedProduct(name, store, price, image) {
  if (!name) return;
  let clicked = JSON.parse(localStorage.getItem('sr_clicked') || '[]');
  clicked = clicked.filter(c => !(c.name === name && c.store === store));
  clicked.unshift({ name, store, price, image: image || '', time: Date.now() });
  if (clicked.length > 50) clicked = clicked.slice(0, 50);
  localStorage.setItem('sr_clicked', JSON.stringify(clicked));
}

function getClickedProducts() {
  return JSON.parse(localStorage.getItem('sr_clicked') || '[]');
}

function renderSearchHistory() {
  const list = document.getElementById('historyList');
  const history = JSON.parse(localStorage.getItem('sr_history') || '[]');
  if (!history.length) {
    list.innerHTML = '<div class="history-empty">No search history yet</div>';
    return;
  }
  list.innerHTML = history.map(h => `
    <div class="history-item" onclick="searchHistoryItem('${h.query.replace(/'/g, "\\'")}')">
      <img class="history-item-img" src="${proxyImg(h.image)}" alt="" onerror="this.style.display='none'">
      <div class="history-item-info">
        <div class="history-item-name">${h.name}</div>
        <div class="history-item-time">${timeAgo(h.time)}</div>
      </div>
    </div>
  `).join('');
}

function searchHistoryItem(query) {
  document.getElementById('historyDropdown')?.classList.remove('active');
  document.getElementById('searchInput').value = query;
  performSearch();
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return mins + 'm ago';
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + 'h ago';
  const days = Math.floor(hours / 24);
  if (days < 7) return days + 'd ago';
  return new Date(ts).toLocaleDateString();
}

function toggleSearchHistory() {
  const dd = document.getElementById('historyDropdown');
  dd.classList.toggle('active');
  if (dd.classList.contains('active')) renderSearchHistory();
}

// ======== Init ========
document.addEventListener('DOMContentLoaded', () => {
  const isAccountPage = window.location.pathname.includes('/account');

  if (isAccountPage) {
    // 账户页：隐藏搜索区域，直接显示仪表盘
    document.querySelector('.hero')?.classList.add('hidden');
    document.querySelector('.hero')?.classList.add('hidden');
    document.querySelector('.main-section')?.classList.add('hidden');
    initModals();
    initPricingModal();
    initAdminPanel();
    initContactForm();
    updateUIForAuth();
    if (getSession()) syncUserData();
    if (getSession()) checkMembership();
        tryAutoLogin();
    document.querySelectorAll("#sidebarNav button").forEach(function(btn) {
      btn.addEventListener("click", function() { switchAccountTab(btn.dataset.tab); });
    });
    document.getElementById("sidebarLogoutBtn")?.addEventListener("click", logout);
    setTimeout(function() {
      if (getSession()) showAccountDashboard();
      else { showAuthModal("login"); }
    }, 300);
    return;n;
  }

  initSearch();
  initPhotoUpload();
  initSortFilter();
  initPagination();
  initModals();
  initPricingModal();
  initAdminPanel();
  initContactForm();
renderPopularProducts();
  updateUIForAuth();
  if (getSession()) syncUserData();
  if (getSession()) checkMembership();
  tryAutoLogin();

  document.getElementById('refreshPopularBtn')?.addEventListener('click', refreshPopular);
  document.getElementById('logoLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    goHome();
  });
  document.getElementById('historyNavBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!getSession()) { showAuthModal('login'); return; }
    toggleSearchHistory();
  });
  document.getElementById('historyClearBtn')?.addEventListener('click', () => {
    localStorage.removeItem('sr_history');
    renderSearchHistory();
  });
  document.addEventListener('click', (e) => {
    const dd = document.getElementById('historyDropdown');
    if (dd?.classList.contains('active') && !dd.contains(e.target) && e.target.id !== 'historyNavBtn') {
      dd.classList.remove('active');
    }
  });
});

// 浮动搜索栏（复制首页搜索框样式）
(function() {
  if (window.location.pathname.includes('/account')) return;
  const bar = document.createElement('div');
  bar.id = 'floatSearchBar';
  bar.innerHTML = '<div class="search-box" style="margin:0;box-shadow:0 4px 12px rgba(0,0,0,0.06)">' +
    '<input type="search" id="floatSearchInput" placeholder="Search any product... (e.g. AirPods, PS5, Nike Shoes, Coffee Maker)" autocomplete="off" spellcheck="false">' +
    '<div class="search-actions">' +
      '<button class="btn-voice" id="floatVoiceBtn" title="Voice search">🎤</button>' +
      '<button class="btn-camera" id="floatCameraBtn">📷 <span>Photo</span></button>' +
      '<button class="btn-search" id="floatSearchBtn">Search</button>' +
    '</div></div>';
  document.body.appendChild(bar);
  // 搜索
  const doSearch = () => {
    const q = document.getElementById('floatSearchInput').value.trim();
    if (q) { document.getElementById('searchInput').value = q; performSearch(); bar.classList.remove('show'); }
  };
  document.getElementById('floatSearchBtn')?.addEventListener('click', doSearch);
  document.getElementById('floatSearchInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
  // 关联语音按钮
  document.getElementById('floatVoiceBtn')?.addEventListener('click', () => { document.getElementById('voiceBtn')?.click(); });
  // 关联拍照按钮
  document.getElementById('floatCameraBtn')?.addEventListener('click', () => { document.getElementById('cameraBtn')?.click(); });
  // 下滑显示
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 200;
    bar.classList.toggle('show', window.scrollY > heroBottom);
  }, { passive: true });
})();

function initModals() {
  document.getElementById('authModalClose')?.addEventListener('click', hideAuthModal);

  document.getElementById('historyModalClose')?.addEventListener('click', () => {
    document.getElementById('historyModal').classList.remove('active');
    if (priceChartInstance) { priceChartInstance.destroy(); priceChartInstance = null; }
  });
  document.getElementById('historyModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('historyModal').classList.remove('active');
      if (priceChartInstance) { priceChartInstance.destroy(); priceChartInstance = null; }
    }
  });
  document.getElementById('dashboardCloseBtn')?.addEventListener('click', () => {
    window.location.href = '/';
  });
  document.querySelectorAll('.dashboard-tabs button').forEach(btn => {
    btn.addEventListener('click', () => switchDashboardTab(btn.dataset.tab));
  });
  document.getElementById('historyControls')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const days = parseInt(btn.dataset.range);

    if (days > 7 && !isPremium()) {
      showToast('📈 Price history beyond 7 days is a Premium feature. Upgrade for full access!');
      showPricingModal();
      return;
    }
    document.querySelectorAll('#historyControls button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPriceChart(days);
  });
  document.getElementById('alertSetBtn')?.addEventListener('click', () => {
    const input = document.getElementById('alertTargetPrice');
    const val = parseFloat(input.value);
    if (!val || val <= 0) { input.style.borderColor = '#ef4444'; setTimeout(() => input.style.borderColor = '', 800); return; }
    if (!currentUser) { document.getElementById('historyModal').classList.remove('active'); showAuthModal('login'); return; }
    if (!canAddAlert()) {
      showToast(`🔔 Free limit: ${membershipData?.alertsLimit || 6} alerts. Upgrade for unlimited!`);
      hidePricingModal();
      showPricingModal();
      return;
    }
    addAlert({ productName: currentHistoryProduct, store: currentHistoryStore, targetPrice: val, currentPrice: parseFloat(document.getElementById('historyCurrentPrice').textContent.replace(/[^0-9.]/g,'')), image: currentHistoryImage });
    updateAlertRemaining();
    const success = document.getElementById('alertSuccess');
    success.classList.add('show');
    input.value = '';
    setTimeout(() => success.classList.remove('show'), 3000);
  });
}

// ======== Existing: Search ========
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) searchBtn.addEventListener('click', performSearch);
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') performSearch(); });

    const unlock = () => { searchInput.removeAttribute('readonly'); searchInput.removeEventListener('focus', unlock); searchInput.removeEventListener('click', unlock); };
    searchInput.addEventListener('focus', unlock);
    searchInput.addEventListener('click', unlock);
  }
  initVoiceSearch();
}

// ======== Voice Search ========
function initVoiceSearch() {
  const btn = document.getElementById('voiceBtn');
  if (!btn) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    btn.addEventListener('click', () => {
      showToast('Voice search is not supported on this browser', 3000);
    });
    return;
  }

  let recognition = null;
  let isRecording = false;
  let recordingBadge = null;
  let recordingTimer = null;
  let startTimeout = null;

  function stopRecording() {
    isRecording = false;
    btn.classList.remove('recording');
    btn.innerHTML = '🎤';
    if (recordingBadge) { recordingBadge.remove(); recordingBadge = null; }
    document.removeEventListener('keydown', handleEscKey);
    if (recordingTimer) { clearTimeout(recordingTimer); recordingTimer = null; }
    if (startTimeout) { clearTimeout(startTimeout); startTimeout = null; }
  }

  function handleEscKey(e) {
    if (e.key === 'Escape' && isRecording) {
      recognition?.abort();
    }
  }

  function showRecordingBadge() {
    recordingBadge = document.createElement('div');
    recordingBadge.className = 'recording-badge';
    recordingBadge.innerHTML = `
      <span class="recording-badge-dot"></span>
      Speak now...
      <button class="recording-badge-close" id="recordingCloseBtn">✕</button>
    `;
    btn.parentElement.appendChild(recordingBadge);
    document.getElementById('recordingCloseBtn')?.addEventListener('click', () => {
      recognition?.stop();
    });
  }

  btn.addEventListener('click', () => {
    if (isRecording) {
      recognition?.stop();
      return;
    }


    if (recognition) {
      try { recognition.abort(); } catch {}
      recognition = null;
    }

    try {
      recognition = new SpeechRecognition();
    } catch {
      showToast('Voice search is not supported on this browser');
      return;
    }

    recognition.lang = navigator.language || 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;


    recordingTimer = setTimeout(() => {
      if (isRecording) { recognition?.stop(); }
    }, 10000);


    startTimeout = setTimeout(() => {
      if (!isRecording) {
        recognition?.abort();
        showToast('Voice search unavailable on this browser — try Chrome', 3000);
      }
    }, 2000);

    recognition.onstart = () => {
      if (startTimeout) { clearTimeout(startTimeout); startTimeout = null; }
      isRecording = true;
      btn.classList.add('recording');
      btn.innerHTML = '⏹ <span class="btn-voice-label">Stop</span>';
      showRecordingBadge();
      document.addEventListener('keydown', handleEscKey);
    };

    recognition.onresult = (event) => {
      const last = event.results[event.results.length - 1];
      if (last && last[0]) {
        const input = document.getElementById('searchInput');
        if (input) {
          input.value = last[0].transcript;
        }
      }
    };

    recognition.onerror = (e) => {
      const ERR_MSGS = {
        'not-allowed': 'Microphone access denied — allow in browser settings',
        'no-speech': 'No speech detected — try again',
        'audio-capture': 'No microphone found on this device',
        'network': 'Network error — check your connection',
        'service-not-allowed': 'Voice service not allowed on this browser',
      };
      if (e.error !== 'aborted') {
        showToast(ERR_MSGS[e.error] || 'Voice search not available on this browser', 3000);
      }
      stopRecording();
    };

    recognition.onend = () => {
      stopRecording();
    };

    try { recognition.start(); } catch { showToast('Voice search is not supported on this browser'); stopRecording(); }
  });
}

async function performSearch() {
  const input = document.getElementById('searchInput');
  const query = (input?.value || '').trim().toLowerCase();
  if (!query && uploadedPhotos.length === 0) {
    input?.focus();
    input ? input.style.borderColor = '#ef4444' : null;
    setTimeout(() => { if(input) input.style.borderColor = ''; }, 800);
    return;
  }
  const loading = document.getElementById('loading');
  const results = document.getElementById('resultsSection');
  if (loading) loading.classList.add('active');
  if (results) results.classList.remove('active');
  document.getElementById('popularSection')?.classList.add('hidden');
  document.getElementById('dashboardSection')?.classList.remove('active');
  document.getElementById('sortSelect').value = 'featured';
  document.getElementById('storeFilter').value = 'all';

  let firstResult = true;

  const apiProduct = await searchViaAPI(query, (data) => {
    currentPage = 1;
    currentProduct = { name: data.name, image: data.image, stores: data.stores };

    if (firstResult) {
      firstResult = false;
      document.getElementById('loading').classList.remove('active');
      results.classList.add('active');
      saveSearchHistory(currentProduct);
      const header = document.getElementById('productHeader');
      const thumbs = uploadedPhotos.length > 0
        ? uploadedPhotos.map(s => `<img src="${s}" alt="upload">`).join('')
        : (data.image ? `<img src="${proxyImg(data.image)}" alt="${data.name}" onerror="this.style.display='none'">` : '');
      header.innerHTML = `
        <div class="product-thumbs">${thumbs}</div>
        <div class="product-meta">
          <h2>${data.name}</h2>
          <p>${data.stores.length} stores compared — find the best deal</p>
        </div>`;
    } else {
      const meta = document.querySelector('.product-meta p');
      if (meta) meta.textContent = `${data.stores.length} stores compared — find the best deal`;
    }

    renderSortedStores(data.stores, 'featured');
    document.getElementById('loadingMore').style.display = data.done ? 'none' : 'flex';
  });

  if (!apiProduct) {
    if (loading) loading.classList.remove('active');
    if (firstResult) {
      setTimeout(() => { renderResults(query); }, 400);
    }
  }
}

async function searchViaAPI(query, onProgress) {
  // 检查缓存（10分钟内有效）
  try {
    const cached = localStorage.getItem('sr_cache_' + query);
    if (cached) {
      const c = JSON.parse(cached);
      if (Date.now() - c.t < 600000) {
        onProgress?.({ stores: c.stores, name: c.name, image: c.image, done: true, cached: true });
        return { name: c.name, image: c.image, stores: c.stores };
      }
    }
  } catch {}

  try {
    // 三个请求同时发起
    const serpP = fetch(`/api/search?q=${encodeURIComponent(query)}`).catch(() => null);
    const ebayP = fetch(`/api/ebay?q=${encodeURIComponent(query)}`).catch(() => null);
    const amazonP = fetch(`/api/amazon?q=${encodeURIComponent(query)}`).catch(() => null);

    let allStores = [];
    let productName = query.charAt(0).toUpperCase() + query.slice(1);
    let productImage = '';
    let reported = false;

    // 处理 Serper（最快+结果最多）
    const serpRes = await serpP;
    if (serpRes && serpRes.ok) {
      const data = await serpRes.json();
      if (data.results && data.results.length > 0) {
        productName = data.results[0].title || productName;
        productImage = data.results[0].image || '';
        allStores = data.results
          .filter(item => item.store !== 'eBay')
          .map(item => ({
          store: item.store,
          price: item.price,
          rating: item.rating,
          reviews: item.reviews,
          shipDays: item.shipping && item.shipping.toLowerCase().includes('free') ? 3 : 5,
          reputation: item.rating > 0 ? Math.round((item.rating / 5) * 100) : 85,
          url: item.url || '#'
        }));
        reported = true;
        onProgress?.({ stores: [...allStores], name: productName, image: productImage, done: false });
      }
    }

    // 处理 Amazon（已同时在请求中）
    const amazonRes = await amazonP;
    if (amazonRes && amazonRes.ok) {
      const amazonData = await amazonRes.json();
      if (amazonData.results && amazonData.results.length > 0) {
        allStores = allStores.concat(amazonData.results.map(item => ({
          store: 'Amazon',
          price: item.price,
          rating: item.rating || 0,
          reviews: item.reviews || 0,
          shipDays: item.shipping && item.shipping.toLowerCase().includes('free') ? 3 : 5,
          reputation: item.rating > 0 ? Math.round((item.rating / 5) * 100) : 85,
          url: item.url || '#'
        })));
        if (!productImage) productImage = amazonData.results[0].image || '';
        reported = true;
        onProgress?.({ stores: [...allStores], name: productName, image: productImage, done: false });
      }
    }

    // 处理 eBay
    const ebayRes = await ebayP;
    if (ebayRes && ebayRes.ok) {
      const ebayData = await ebayRes.json();
      if (ebayData.results && ebayData.results.length > 0) {
        allStores = allStores.concat(ebayData.results.map(item => ({
          store: 'eBay',
          price: item.price,
          rating: item.rating,
          reviews: item.reviews,
          shipDays: 5,
          reputation: item.rating > 0 ? Math.round((item.rating / 5) * 100) : 85,
          url: item.url || '#'
        })));
        if (!productImage) productImage = ebayData.results[0].image || '';
      }
    }

    if (allStores.length === 0) throw new Error('No results from any source');

    // 写入缓存
    try {
      localStorage.setItem('sr_cache_' + query, JSON.stringify({ stores: allStores, name: productName, image: productImage, t: Date.now() }));
    } catch {}

    onProgress?.({ stores: allStores, name: productName, image: productImage, done: true });
    return { name: productName, image: productImage, stores: allStores };
  } catch (e) {
    console.warn('API search failed, using mock:', e.message);
    return null;
  }
}

function findProduct(query) {

  for (const [key, product] of Object.entries(MOCK_PRODUCTS)) {
    if (key.includes(query) || query.includes(key)) return product;
  }

  for (const product of Object.values(MOCK_PRODUCTS)) {
    if (product.name.toLowerCase().includes(query)) return product;
  }

  for (const [key, keywords] of Object.entries(LANG_KEYWORDS)) {
    if (keywords.some(kw => query.includes(kw) || kw.includes(query))) return MOCK_PRODUCTS[key];
  }
  return MOCK_PRODUCTS['airpods pro'];
}

function renderResults(query) {
  const product = findProduct(query);
  document.getElementById('popularSection')?.classList.add('hidden');
  if (!product) {
    document.getElementById('resultsSection')?.classList.add('active');
    document.getElementById('priceGrid').innerHTML = `<div class="no-results"><h3>No matches found</h3><p>Try a different search term or upload a photo.</p></div>`;
    return;
  }
  currentProduct = product;
  currentPage = 1;
  saveSearchHistory(product);
  document.getElementById('resultsSection').classList.add('active');
  const header = document.getElementById('productHeader');
  const thumbs = uploadedPhotos.length > 0
    ? uploadedPhotos.map(s => `<img src="${s}" alt="upload">`).join('')
    : `<img src="${proxyImg(product.image)}" alt="${product.name}" onerror="this.style.display='none'">`;
  header.innerHTML = `
    <div class="product-thumbs">${thumbs}</div>
    <div class="product-meta">
      <h2>${product.name}</h2>
      <p>${product.stores.length} stores compared — find the best deal</p>
    </div>`;
  renderSortedStores(product.stores, 'featured');
}

// ======== Sort & Filter ========
function initSortFilter() {
  const sortSelect = document.getElementById('sortSelect');
  const storeFilter = document.getElementById('storeFilter');
  if (sortSelect) sortSelect.addEventListener('change', applySort);
  if (storeFilter) storeFilter.addEventListener('change', applySort);
}

function applySort() {
  if (!currentProduct) return;
  currentPage = 1;
  const sortBy = document.getElementById('sortSelect')?.value || 'featured';
  const storeFilter = document.getElementById('storeFilter')?.value || 'all';
  let stores = [...currentProduct.stores];
  if (storeFilter !== 'all') stores = stores.filter(s => s.store === storeFilter);
  renderSortedStores(stores, sortBy);
}

function renderSortedStores(stores, sortBy) {
  const grid = document.getElementById('priceGrid');
  if (!grid) return;
  switch (sortBy) {
    case 'featured': stores.sort((a,b) => a.price - b.price); break;
    case 'price': stores.sort((a,b) => a.price - b.price); break;
    case 'price-desc': stores.sort((a,b) => b.price - a.price); break;
    case 'rating': stores.sort((a,b) => b.rating - a.rating); break;
    case 'newest': break;
    case 'bestsellers': break;
  }
  paginatedStores = stores;
  renderPage(currentPage);
}

function renderPage(page) {
  const grid = document.getElementById('priceGrid');
  if (!grid) return;

  const totalPages = Math.max(1, Math.ceil(paginatedStores.length / ITEMS_PER_PAGE));
  currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = paginatedStores.slice(start, end);

  const bestPrice = Math.min(...paginatedStores.filter(s => s.price).map(s => s.price));
  const user = getSession();

  grid.innerHTML = pageItems.map(s => {
    const isBest = s.price === bestPrice;
    const buyUrl = getStoreUrl(s.store, currentProduct.name, s.price);
    const faved = user ? isFavorited(currentProduct.name, s.store) : false;
    const storeColor = STORE_CONFIG[s.store]?.bg || '#666';

    return `
      <div class="popular-card" style="padding:10px">
        <img class="popular-card-img" src="${proxyImg(currentProduct.image)}" alt="${currentProduct.name}" loading="lazy" onerror="this.parentElement.classList.add('img-failed')">
        <div style="font-size:11px;color:var(--gray-400);margin-bottom:2px">${s.store}</div>
        <div class="popular-card-name" style="font-size:13px;-webkit-line-clamp:2;line-height:1.3;margin-bottom:4px">${currentProduct.name}</div>
        <div style="font-size:18px;font-weight:700;color:var(--primary);margin-bottom:6px">$${s.price.toFixed(2)} ${isBest ? '<span style="font-size:11px;color:#16a34a;font-weight:600">Best</span>' : ''}</div>
        <div style="display:flex;gap:6px;margin-top:4px">
          <a href="${buyUrl}" target="_blank" rel="noopener" class="buy-btn" style="font-size:13px;padding:8px 12px" onclick="saveClickedProduct('${currentProduct.name.replace(/'/g, "\\'")}','${s.store}',${s.price},'${(currentProduct.image || '').replace(/'/g, "\\'")}')">Buy Now</a>
          <button class="icon-btn heart-btn ${faved ? 'favorited' : ''}" style="width:36px;height:36px;font-size:15px" onclick="toggleFavorite(event,'${currentProduct.name.replace(/'/g, "\\'")}','${s.store}',${s.price},'${(currentProduct.image || '').replace(/'/g, "\\'")}')">${faved ? '❤️' : '🤍'}</button>
          <button class="icon-btn" style="width:36px;height:36px;font-size:15px" onclick="openPriceHistory('${currentProduct.name.replace(/'/g, "\\'")}','${s.store}',${s.price},'${(currentProduct.image || '').replace(/'/g, "\\'")}')" title="Price history">📈</button>
        </div>
      </div>`;
  }).join('');

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const bar = document.getElementById('paginationBar');
  const numbers = document.getElementById('pageNumbers');
  const totalInfo = document.getElementById('pageTotalInfo');
  if (!bar || !numbers) return;

  if (totalPages <= 1) {
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  totalInfo.textContent = `${paginatedStores.length} items`;

  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  if (prevBtn) prevBtn.disabled = currentPage <= 1;
  if (nextBtn) nextBtn.disabled = currentPage >= totalPages;

  // Build page number buttons (show first, last, and ±2 around current)
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  numbers.innerHTML = pages.map(p => {
    if (p === '...') return '<span class="page-dots">...</span>';
    return `<button class="page-num ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
  }).join('');
}

function goToPage(page) {
  if (page < 1 || page > Math.ceil(paginatedStores.length / ITEMS_PER_PAGE)) return;
  currentPage = page;
  renderPage(page);
  window.scrollTo({ top: document.getElementById('resultsSection').offsetTop - 80, behavior: 'smooth' });
}

function initPagination() {
  document.getElementById('prevPageBtn')?.addEventListener('click', () => goToPage(currentPage - 1));
  document.getElementById('nextPageBtn')?.addEventListener('click', () => goToPage(currentPage + 1));
  document.getElementById('pageNumbers')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.page-num');
    if (btn) goToPage(parseInt(btn.dataset.page));
  });
}

function goHome() {
  document.getElementById('popularSection')?.classList.remove('hidden');
  document.getElementById('resultsSection')?.classList.remove('active');
  document.getElementById('dashboardSection')?.classList.remove('active');
  document.getElementById('adminSection')?.classList.remove('active');
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.getElementById('searchInput').value = '';
  currentProduct = null;
  paginatedStores = [];
  renderPopularProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ======== Coupon Popup ========
function showCouponPopup(event, el, store) {
  event.stopPropagation();
  document.querySelectorAll('.coupon-popup').forEach(p => p.remove());
  const coupons = MOCK_COUPONS[store] || [];
  if (!coupons.length) return;
  const popup = document.createElement('div');
  popup.className = 'coupon-popup active';
  popup.style.position = 'absolute';
  popup.innerHTML = `<h5>${store} Coupons</h5>${coupons.map(c => `
    <div class="coupon-item"><span>${c.desc}</span><span class="coupon-code" onclick="copyCoupon('${c.code}')">${c.code}<span class="coupon-arrow">📋</span></span></div>`).join('')}`;
  el.style.position = 'relative';
  el.appendChild(popup);
  const closePopup = (e2) => { if (!popup.contains(e2.target) && e2.target !== el) { popup.remove(); document.removeEventListener('click', closePopup); }};
  setTimeout(() => document.addEventListener('click', closePopup), 10);
}

// ======== Favorites Toggle ========
function toggleFavorite(event, productName, store, price, image) {
  event.stopPropagation();
  if (!currentUser) { showAuthModal('login'); return; }
  const btn = event.currentTarget;
  if (isFavorited(productName, store)) {
    removeFavorite(productName, store);
    btn.classList.remove('favorited');
    btn.textContent = '🤍';
  } else {
    addFavorite({ productName, store, price, image: image || '' });
    btn.classList.add('favorited');
    btn.textContent = '❤️';
  }
}

// ======== Photo Upload ========
function initPhotoUpload() {
  const cameraBtn = document.getElementById('cameraBtn');
  const galleryInput = document.getElementById('galleryInput');
  const searchBox = document.querySelector('.search-box');
  if (!cameraBtn) return;

  cameraBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (uploadedPhotos.length >= 6) {
      showToast('Maximum 6 photos — remove some first');
      return;
    }
    if (currentUser && !canUploadPhoto()) {
      showToast(`📷 Free limit: ${membershipData?.photoLimit || 5} photos/month. Upgrade for unlimited!`);
      showPricingModal();
      return;
    }
    galleryInput.click();
  });


  galleryInput.addEventListener('change', (e) => {
    handleFiles(Array.from(e.target.files));
    e.target.value = '';
  });


  document.body.addEventListener('dragover', (e) => { e.preventDefault(); searchBox?.style.setProperty('border-color', '#16a34a', 'important'); });
  document.body.addEventListener('dragleave', (e) => { if (!e.currentTarget.contains(e.relatedTarget)) searchBox?.style.removeProperty('border-color'); });
  document.body.addEventListener('drop', (e) => {
    e.preventDefault(); searchBox?.style.removeProperty('border-color');
    if (uploadedPhotos.length >= 6) {
      showToast('Maximum 6 photos — remove some first');
      return;
    }
    if (currentUser && !canUploadPhoto()) {
      showToast(`📷 Free limit: ${membershipData?.photoLimit || 5} photos/month. Upgrade for unlimited!`);
      showPricingModal();
      return;
    }
    const files = Array.from(e.dataTransfer?.files || []);
    handleFiles(files.filter(f => f.type.startsWith('image/')));
  });
}

function handleFiles(files) {
  const imageFiles = files.filter(f => f.type.startsWith('image/'));
  if (imageFiles.length === 0) return;

  const remaining = 6 - uploadedPhotos.length;
  if (remaining <= 0) {
    showToast('Maximum 6 photos — remove some first');
    return;
  }

  const toAdd = imageFiles.slice(0, remaining);
  const skipped = imageFiles.length - toAdd.length;

  Promise.all(toAdd.map(file => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (ev) => resolve(ev.target.result);
    reader.readAsDataURL(file);
  }))).then(results => {
    uploadedPhotos.push(...results);
    renderPhotoBar();
    if (currentUser) trackPhotoUsage();
    if (skipped > 0) {
      showToast(`Added ${results.length}, max 6 reached`);
    }
  });
}

function showToast(msg, duration = 2000) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = msg;
  document.body.appendChild(el);
  el.classList.add('active');
  setTimeout(() => { el.classList.remove('active'); setTimeout(() => el.remove(), 300); }, duration);
}

function renderPhotoBar() {
  const bar = document.getElementById('photoBar');
  if (!bar) return;

  if (uploadedPhotos.length === 0) {
    bar.classList.remove('active');
    bar.innerHTML = '';
    return;
  }

  bar.classList.add('active');
  const remaining = currentUser ? getPhotoRemaining() : 999;
  const limitHint = (!isPremium() && currentUser)
    ? `<span class="photo-bar-limit">${remaining} photo searches left this month</span>`
    : '';
  bar.innerHTML = uploadedPhotos.map((src, i) => `
    <div class="photo-bar-item">
      <img src="${src}" alt="Photo ${i+1}">
      <button class="remove-btn" onclick="removePhoto(${i})">×</button>
    </div>`).join('') +
    `<span class="photo-bar-count">${uploadedPhotos.length}/6</span>` +
    limitHint;
}

function removePhoto(index) {
  uploadedPhotos.splice(index, 1);
  renderPhotoBar();
}

// ======== Membership System ========
let membershipData = null;

async function checkMembership() {
  const s = getSession();
  if (!s) { membershipData = null; return; }
  try {
    const res = await fetch('/api/membership', { headers: { 'Authorization': `Bearer ${s.token}` } });
    if (res.ok) membershipData = await res.json();
    updateUIForAuth();
    if (isPremium()) {
      showPremiumWelcome(s.email);
    }
  } catch { membershipData = null; }
}

async function trackPhotoUsage() {
  const s = getSession();
  if (!s) return;
  try {
    const res = await fetch('/api/membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${s.token}` },
      body: JSON.stringify({ trackPhoto: true }),
    });
    if (res.ok) {
      const data = await res.json();
      if (membershipData) membershipData.photoUsage = data.photoUsage;
    }
  } catch {}
}

function isPremium() {
  return membershipData?.tier === 'premium';
}

function showPremiumWelcome(email) {
  // 一天只显示一次
  const today = new Date().toDateString();
  const lastShown = localStorage.getItem('sr_premium_welcome');
  if (lastShown === today) return;
  localStorage.setItem('sr_premium_welcome', today);

  const overlay = document.createElement('div');
  overlay.id = 'premiumWelcome';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none';


  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:absolute;inset:0';
  overlay.appendChild(canvas);


  const name = email.split('@')[0];
  const textGroup = document.createElement('div');
  textGroup.style.cssText = 'position:absolute;left:50%;top:22vh;transform:translateX(-50%);z-index:1;text-align:center';
  const text = document.createElement('div');
  text.textContent = '✨ Welcome back, ' + name + ' ✨';
  text.style.cssText = 'font-size:52px;font-weight:900;color:#FFD700;text-shadow:0 0 30px rgba(255,215,0,0.6),0 0 60px rgba(255,215,0,0.3),0 4px 12px rgba(0,0,0,0.3);animation:premiumFadeIn 0.6s ease-out;letter-spacing:2px';
  textGroup.appendChild(text);

  const sub = document.createElement('div');
  sub.textContent = 'Premium Member';
  sub.style.cssText = 'font-size:34px;font-weight:700;color:#FFC107;text-shadow:0 0 20px rgba(255,193,7,0.5),0 2px 8px rgba(0,0,0,0.2);margin-top:10px;animation:premiumFadeIn 0.8s ease-out;letter-spacing:1px';
  textGroup.appendChild(sub);
  overlay.appendChild(textGroup);

  document.body.appendChild(overlay);


  if (!document.getElementById('premiumKeyframes')) {
    const style = document.createElement('style');
    style.id = 'premiumKeyframes';
    style.textContent = '@keyframes premiumFadeIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}';
    document.head.appendChild(style);
  }


  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#FFD700','#FFC107','#FFB300','#FFA000','#FF8F00','#FF6F00','#FFD54F','#FFE082','#FFECB3','#FFFFFF'];

  function createBurst(x, y) {
    const count = 40 + Math.floor(Math.random() * 40);
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 3 + Math.random() * 4;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, decay: 0.008 + Math.random() * 0.012, size: 2 + Math.random() * 3, color,
        tail: [{ x, y }]
      });
    }
  }


  for (let i = 0; i < 5; i++) {
    setTimeout(() => createBurst(
      canvas.width * (0.15 + Math.random() * 0.7),
      canvas.height * (0.15 + Math.random() * 0.6)
    ), i * 300);
  }

  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createBurst(
        canvas.width * (0.15 + Math.random() * 0.7),
        canvas.height * (0.15 + Math.random() * 0.6)
      ), i * 400);
    }
  }, 2000);

  let frame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.04;
      p.vx *= 0.99;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();

      p.tail.push({ x: p.x, y: p.y });
      if (p.tail.length > 8) p.tail.shift();
      for (let t = 1; t < p.tail.length; t++) {
        ctx.globalAlpha = (t / p.tail.length) * p.life * 0.5;
        ctx.beginPath();
        ctx.arc(p.tail[t].x, p.tail[t].y, p.size * (t / p.tail.length) * p.life * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (Math.random() < 0.08 && particles.length < 200) {
      createBurst(
        canvas.width * (0.1 + Math.random() * 0.8),
        canvas.height * (0.1 + Math.random() * 0.7)
      );
    }
    ctx.globalAlpha = 1;
    frame = requestAnimationFrame(animate);
  }
  animate();


  setTimeout(() => {
    cancelAnimationFrame(frame);
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 500);
  }, 4000);
}

function formatDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function showPricingModal() {
  document.getElementById('pricingModal').classList.add('active');
}

function hidePricingModal() {
  document.getElementById('pricingModal').classList.remove('active');
}

function initPricingToggle(syncingRef) {
  document.querySelectorAll('.toggle-label').forEach(label => {
    label.addEventListener('click', () => {
      if (syncingRef && syncingRef.current) return;
      document.querySelectorAll('.toggle-label').forEach(l => l.classList.remove('active'));
      label.classList.add('active');
      const period = label.dataset.period;

      // Desktop/landscape: toggle premium card pricing
      const monthlyRow = document.querySelector('#premiumPriceBlock .price-row:first-child');
      const yearlyRow = document.getElementById('yearlyDeal');
      if (monthlyRow && yearlyRow) {
        if (period === 'year') {
          monthlyRow.style.display = 'none';
          yearlyRow.style.display = 'flex';
        } else {
          monthlyRow.style.display = 'flex';
          yearlyRow.style.display = 'none';
        }
      }

      // Mobile portrait: scroll to corresponding premium card
      const isMobilePortrait = window.innerWidth <= 600 && window.innerHeight > window.innerWidth;
      if (isMobilePortrait) {
        const cards = document.querySelectorAll('.pricing-card');
        const idx = period === 'year' ? 2 : 1;
        if (cards[idx]) {
          if (syncingRef) syncingRef.current = true;
          cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          setTimeout(() => { if (syncingRef) syncingRef.current = false; }, 400);
        }
      }
    });
  });
}

function initPricingModal() {
  const _syncing = { current: false };

  document.getElementById('pricingModalClose')?.addEventListener('click', hidePricingModal);
  document.getElementById('pricingModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hidePricingModal();
  });
  initPricingToggle(_syncing);

  document.getElementById('upgradeBtn')?.addEventListener('click', () => {
    showToast('💳 Payment coming soon — stay tuned!');
  });
  document.getElementById('upgradeBtnYearly')?.addEventListener('click', () => {
    showToast('💳 Payment coming soon — stay tuned!');
  });

  // Mobile portrait: sync swipe dots + toggle with scroll position
  const pg = document.querySelector('.pricing-grid');
  const dots = document.querySelectorAll('.pricing-dots .dot');
  if (pg && dots.length > 1) {
    let ticking = false;
    pg.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cw = pg.querySelector('.pricing-card')?.offsetWidth || 1;
          const idx = Math.round(pg.scrollLeft / (cw + 24));
          // Update dots
          dots.forEach((d, i) => d.classList.toggle('active', i === idx));
          // Sync toggle on mobile portrait (only if not triggered by toggle click)
          if (!_syncing.current && window.innerWidth <= 600 && window.innerHeight > window.innerWidth) {
            const labels = document.querySelectorAll('.toggle-label');
            if (idx === 1) {
              labels.forEach(l => l.classList.toggle('active', l.dataset.period === 'month'));
            } else if (idx === 2) {
              labels.forEach(l => l.classList.toggle('active', l.dataset.period === 'year'));
            } else if (idx === 0) {
              // Free page: reset toggle to Monthly
              labels.forEach(l => l.classList.toggle('active', l.dataset.period === 'month'));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    });
    dots.forEach(d => {
      d.addEventListener('click', () => {
        const card = pg.querySelectorAll('.pricing-card')[parseInt(d.dataset.index)];
        if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }
}

function initContactForm() {
  document.getElementById('contactBtn')?.addEventListener('click', () => {
    document.getElementById('contactModal').classList.add('active');
  });
  document.getElementById('contactModalClose')?.addEventListener('click', () => {
    document.getElementById('contactModal').classList.remove('active');
  });
  document.getElementById('contactModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) document.getElementById('contactModal').classList.remove('active');
  });
  document.getElementById('contactSubmitBtn')?.addEventListener('click', handleContactSubmit);

  // Auto-open contact modal when URL hash is #contact (e.g. from privacy page link)
  if (location.hash === '#contact') {
    document.getElementById('contactModal')?.classList.add('active');
  }
  window.addEventListener('hashchange', () => {
    if (location.hash === '#contact') {
      document.getElementById('contactModal')?.classList.add('active');
    }
  });
}

async function handleContactSubmit() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const err = document.getElementById('contactError');
  const success = document.getElementById('contactSuccess');
  err.classList.remove('show');
  success.style.display = 'none';

  if (!name || !email || !subject || !message) {
    err.textContent = 'Please fill in all fields';
    err.classList.add('show');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err.textContent = 'Please enter a valid email';
    err.classList.add('show');
    return;
  }

  const btn = document.getElementById('contactSubmitBtn');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });
    const data = await res.json();
    if (data.ok) {
      success.style.display = 'block';
      document.getElementById('contactName').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactSubject').value = '';
      document.getElementById('contactMessage').value = '';
    } else {
      err.textContent = data.error || 'Failed to send message';
      err.classList.add('show');
    }
  } catch {
    err.textContent = 'Network error. Please try again.';
    err.classList.add('show');
  }
  btn.disabled = false;
  btn.textContent = 'Send Message';
}


function canUploadPhoto() {
  if (!currentUser) return true;
  if (isPremium()) return true;
  return (membershipData?.photoUsage || 0) < (membershipData?.photoLimit || 5);
}

function getPhotoRemaining() {
  if (!currentUser || isPremium()) return 999;
  return (membershipData?.photoLimit || 5) - (membershipData?.photoUsage || 0);
}


function canAddAlert() {
  if (!currentUser) return true;
  if (isPremium()) return true;
  const alertCount = localUserData?.alerts?.length || 0;
  return alertCount < (membershipData?.alertsLimit || 6);
}
function updateAlertRemaining() {
  const el = document.getElementById('alertRemaining');
  if (!el) return;
  if (!currentUser || isPremium()) { el.textContent = ''; return; }
  const remaining = (membershipData?.alertsLimit || 6) - (localUserData?.alerts?.length || 0);
  el.textContent = `${remaining} of 6 left`;
  el.style.display = remaining <= 0 ? 'none' : '';
}
function getAlertRemaining() {
  if (!currentUser || isPremium()) return 999;
  return (membershipData?.alertsLimit || 6) - (localUserData?.alerts?.length || 0);
}

// ======== Admin Panel ========
let adminToken = sessionStorage.getItem('sr_admin_token') || null;
let adminUsers = [];
let adminSelectedEmail = null;

function showAdmin() {
  document.getElementById('resultsSection')?.classList.remove('active');
  document.getElementById('dashboardSection')?.classList.remove('active');
  document.getElementById('popularSection')?.classList.add('hidden');
  if (adminToken) {
    document.getElementById('adminSection').classList.add('active');
    document.getElementById('adminContent').innerHTML = '<div style="text-align:center;padding:40px"><div class="loading-spinner"></div><p style="margin-top:12px">Loading users...</p></div>';
    fetchAdminUsers();
  } else {
    document.getElementById('adminLoginModal').classList.add('active');
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('adminLoginError').classList.remove('show');
  }
}

function hideAdmin() {
  document.getElementById('adminSection').classList.remove('active');
  document.getElementById('adminLoginModal').classList.remove('active');
  document.getElementById('adminConfirmModal').classList.remove('active');
  adminSelectedEmail = null;
}

async function adminLogin() {
  const pw = document.getElementById('adminPasswordInput').value;
  const err = document.getElementById('adminLoginError');
  if (!pw) { err.textContent = 'Password required'; err.classList.add('show'); return; }
  try {
    const res = await fetch('/api/admin?action=login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    const data = await res.json();
    if (data.ok) {
      adminToken = data.token;
      sessionStorage.setItem('sr_admin_token', data.token);
      document.getElementById('adminLoginModal').classList.remove('active');
      document.getElementById('adminSection').classList.add('active');
      document.getElementById('adminContent').innerHTML = '<div style="text-align:center;padding:40px"><div class="loading-spinner"></div><p style="margin-top:12px">Loading users...</p></div>';
      fetchAdminUsers();
    } else {
      err.textContent = data.error || 'Login failed';
      err.classList.add('show');
    }
  } catch { err.textContent = 'Network error'; err.classList.add('show'); }
}

function adminLogout() {
  adminToken = null;
  sessionStorage.removeItem('sr_admin_token');
  hideAdmin();
  document.getElementById('popularSection')?.classList.remove('hidden');
}

async function fetchAdminUsers() {
  const content = document.getElementById('adminContent');
  try {
    const res = await fetch('/api/admin?action=users', {
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });
    if (res.status === 401) { adminToken = null; sessionStorage.removeItem('sr_admin_token'); showAdmin(); return; }
    const data = await res.json();
    adminUsers = data.users || [];
    renderAdminUserList();
  } catch {
    content.innerHTML = '<div style="text-align:center;padding:40px;color:var(--red)">Failed to load users. <button class="btn-ghost" onclick="fetchAdminUsers()">Retry</button></div>';
  }
}

function renderAdminUserList() {
  const content = document.getElementById('adminContent');
  document.getElementById('adminStatus').textContent = `${adminUsers.length} users`;
  if (!adminUsers.length) {
    content.innerHTML = '<div style="text-align:center;padding:40px;color:var(--gray-500)">No users registered yet.</div>';
    return;
  }
  let html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px">' +
    '<thead><tr style="background:var(--gray-100);text-align:left">' +
    '<th style="padding:10px 12px">Email</th>' +
    '<th style="padding:10px 12px">Registered</th>' +
    '<th style="padding:10px 12px">Tier</th>' +
    '<th style="padding:10px 12px">Membership Expiry</th>' +
    '</tr></thead><tbody>';
  for (const u of adminUsers) {
    const regDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '—';
    const expDate = u.expiresAt ? new Date(u.expiresAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '—';
    const tierBadge = u.tier === 'premium'
      ? '<span style="background:#fffbeb;color:#d97706;padding:2px 10px;border-radius:100px;font-size:12px;font-weight:700">Premium</span>'
      : '<span style="color:var(--gray-500);font-size:13px">Free</span>';
    html += '<tr class="admin-user-row" data-email="' + u.email + '" style="border-bottom:1px solid var(--gray-100);cursor:pointer">' +
      '<td style="padding:10px 12px;color:var(--primary);font-weight:500">' + u.email + '</td>' +
      '<td style="padding:10px 12px;color:var(--gray-500)">' + regDate + '</td>' +
      '<td style="padding:10px 12px">' + tierBadge + '</td>' +
      '<td style="padding:10px 12px;color:var(--gray-500)">' + expDate + '</td></tr>';
  }
  html += '</tbody></table></div>';
  content.innerHTML = html;
  content.querySelectorAll('.admin-user-row').forEach(row => {
    row.addEventListener('click', () => {
      adminSelectedEmail = row.dataset.email;
      showAdminUserDetail(adminSelectedEmail);
    });
  });
}

async function showAdminUserDetail(email) {
  const content = document.getElementById('adminContent');
  content.innerHTML = '<div style="text-align:center;padding:40px"><div class="loading-spinner"></div></div>';
  document.getElementById('adminStatus').textContent = email;
  try {
    const res = await fetch('/api/admin?action=user', {
      headers: { 'Authorization': `Bearer ${adminToken}`, 'X-Admin-User-Email': email },
    });
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    renderAdminUserDetail(data);
  } catch {
    content.innerHTML = '<div style="text-align:center;padding:40px;color:var(--red)">Failed to load user data.</div>';
  }
}

function renderAdminUserDetail(data) {
  const content = document.getElementById('adminContent');
  const regDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) : '—';
  const expDate = data.membership.expiresAt ? new Date(data.membership.expiresAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) : '—';
  const isPremium = data.membership.tier === 'premium';

  let html = '' +
    '<div style="background:var(--white);border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid var(--gray-200)">' +
      '<h3 style="font-size:20px;margin-bottom:4px">' + data.email + '</h3>' +
      '<p style="font-size:13px;color:var(--gray-500)">Registered: ' + regDate + '</p>' +
      '<p style="font-size:13px;color:var(--gray-500);margin-top:2px">Membership: ' + (isPremium ? 'Premium — Expires ' + expDate : 'Free') + '</p>' +
    '</div>' +

    '<div style="background:var(--white);border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid var(--gray-200)">' +
      '<h4 style="margin-bottom:12px;font-size:15px">Modify Membership</h4>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">' +
        '<select id="adminMemberAction" style="padding:8px 12px;border:1px solid var(--gray-300);border-radius:8px;font-size:13px">' +
          '<option value="add">Add time</option>' +
          '<option value="remove">Remove time</option>' +
        '</select>' +
        '<input type="number" id="adminMemberAmount" value="1" min="1" style="width:70px;padding:8px 12px;border:1px solid var(--gray-300);border-radius:8px;font-size:13px">' +
        '<span style="font-size:13px;color:var(--gray-600);margin-right:4px">Days</span>' +
        '<button class="btn-primary" id="adminMemberSubmitBtn" style="padding:8px 20px;font-size:13px">Apply</button>' +
      '</div>' +
      '<div id="adminMemberResult" style="margin-top:8px;font-size:13px"></div>' +
    '</div>' +

    '<div style="background:var(--white);border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid var(--gray-200)">' +
      '<h4 style="margin-bottom:12px;font-size:15px">Favorites (' + data.favorites.length + ')</h4>' +
      (data.favorites.length ? data.favorites.map(function(f) {
        return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--gray-100)">' +
          '<img src="' + (f.image || '') + '" alt="" style="width:36px;height:36px;object-fit:contain;border-radius:4px" onerror="this.style.display=\'none\'">' +
          '<div style="flex:1"><div style="font-size:13px;font-weight:500">' + (f.name || f.productName || '') + '</div><div style="font-size:11px;color:var(--gray-400)">' + (f.store || '') + ' · $' + (f.price || f.targetPrice || 0) + '</div></div>' +
        '</div>';
      }).join('') : '<p style="font-size:13px;color:var(--gray-400)">No favorites</p>') +
    '</div>' +

    '<div style="background:var(--white);border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid var(--gray-200)">' +
      '<h4 style="margin-bottom:12px;font-size:15px">Search History (' + data.searchHistory.length + ')</h4>' +
      (data.searchHistory.length ? data.searchHistory.map(function(h) {
        return '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--gray-50)">' +
          '<span style="font-size:14px">🔍</span>' +
          '<span style="font-size:13px">' + h.query + '</span>' +
          '<span style="font-size:11px;color:var(--gray-400);margin-left:auto">' + timeAgo(h.time) + '</span>' +
        '</div>';
      }).join('') : '<p style="font-size:13px;color:var(--gray-400)">No search history</p>') +
    '</div>' +

    '<div style="background:var(--white);border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid var(--gray-200)">' +
      '<h4 style="margin-bottom:12px;font-size:15px">Price Alerts (' + data.alerts.length + ')</h4>' +
      (data.alerts.length ? data.alerts.map(function(a) {
        const st = a.triggered ? '🔔 Triggered' : '⏳ Waiting';
        return '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--gray-50)">' +
          '<span style="font-size:14px">🔔</span>' +
          '<div style="flex:1;font-size:13px">' + (a.productName || '') + ' @ ' + (a.store || '') + '</div>' +
          '<span style="font-size:12px;font-weight:600">$' + (a.targetPrice || 0) + '</span>' +
          '<span style="font-size:11px;color:var(--gray-400)">' + st + '</span>' +
        '</div>';
      }).join('') : '<p style="font-size:13px;color:var(--gray-400)">No alerts set</p>') +
    '</div>';

  content.innerHTML = html;

  document.getElementById('adminMemberSubmitBtn').addEventListener('click', function() {
    document.getElementById('adminConfirmModal').classList.add('active');
    document.getElementById('adminConfirmInput').value = '';
    document.getElementById('adminConfirmError').classList.remove('show');
  });


  window._pendingMembershipEmail = data.email;
}

async function adminConfirmMembership() {
  const pw = document.getElementById('adminConfirmInput').value;
  const err = document.getElementById('adminConfirmError');
  if (!pw) { err.textContent = 'Password required'; err.classList.add('show'); return; }

  const email = window._pendingMembershipEmail;
  const action = document.getElementById('adminMemberAction').value;
  const amount = document.getElementById('adminMemberAmount').value || 1;

  try {
    const res = await fetch('/api/admin?action=membership', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, adminPassword: pw, action, amount: parseInt(amount) }),
    });
    const data = await res.json();
    if (data.ok) {
      document.getElementById('adminConfirmModal').classList.remove('active');
      const result = document.getElementById('adminMemberResult');
      const newExp = data.membership.expiresAt
        ? new Date(data.membership.expiresAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
        : '—';
      result.innerHTML = data.membership.tier === 'free'
        ? '<span style="color:var(--green)">✅ Premium removed</span>'
        : '<span style="color:var(--green)">✅ Updated — expires ' + newExp + '</span>';
    } else {
      err.textContent = data.error || 'Failed';
      err.classList.add('show');
    }
  } catch { err.textContent = 'Network error'; err.classList.add('show'); }
}

function initAdminPanel() {

  document.getElementById('adminLoginBtn')?.addEventListener('click', adminLogin);
  document.getElementById('adminPasswordInput')?.addEventListener('keydown', function(e) { if (e.key === 'Enter') adminLogin(); });
  document.getElementById('adminLoginClose')?.addEventListener('click', function() {
    document.getElementById('adminLoginModal').classList.remove('active');
  });
  document.getElementById('adminLoginModal')?.addEventListener('click', function(e) {
    if (e.target === e.currentTarget) document.getElementById('adminLoginModal').classList.remove('active');
  });


  document.getElementById('adminConfirmBtn')?.addEventListener('click', adminConfirmMembership);
  document.getElementById('adminConfirmInput')?.addEventListener('keydown', function(e) { if (e.key === 'Enter') adminConfirmMembership(); });
  document.getElementById('adminConfirmClose')?.addEventListener('click', function() {
    document.getElementById('adminConfirmModal').classList.remove('active');
  });
  document.getElementById('adminConfirmModal')?.addEventListener('click', function(e) {
    if (e.target === e.currentTarget) document.getElementById('adminConfirmModal').classList.remove('active');
  });


  document.getElementById('adminBackBtn')?.addEventListener('click', function() {
    window.location.href = '/account';
  });
  document.getElementById('adminLogoutBtn')?.addEventListener('click', adminLogout);


  if (window.location.hash === '#admin') {
    window.location.hash = '';
    showAdmin();
  }
}


window.showPricingModal = showPricingModal;
window.adminLogin = adminLogin;
window.adminConfirmMembership = adminConfirmMembership;

// Back to top button
(function() {
  var btt = document.getElementById('backToTop');
  if (!btt) return;
  window.addEventListener('scroll', function(){ btt.classList.toggle('visible', window.scrollY > 300); });
  btt.addEventListener('click', function(){ window.scrollTo({ top:0, behavior:'smooth' }); });
})();







