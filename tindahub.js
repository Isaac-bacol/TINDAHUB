'use strict';

var SUPABASE_URL = 'https://qojnmnplzoybzwhxgryq.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvam5tbnBsem95Ynp3aHhncnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MjkxMjAsImV4cCI6MjA5NDQwNTEyMH0.wLmLr45Zj5QG9kawhbKWhKLdIkwJX924dR0AQDqc2E8';
var _supabaseReady = false;

window.addEventListener('error', function(e) {
  console.warn('GLOBAL ERROR:', e.error ? e.error.stack : e.message);
  if (e.message && e.message.indexOf('clipboard') >= 0) {
    toast('Browser extension conflict. Please disable extensions and reload.');
  }
});

function sb() {
  return window.supabaseClient;
}

function initSupabase() {
  try {
    if (!window.supabase || !window.supabase.createClient) {
      console.warn('supabase-js not loaded');
      _supabaseReady = false;
      return;
    }
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false, flowType: 'implicit' },
      realtime: { params: { eventsPerSecond: 10 } }
    });
    _supabaseReady = true;
    console.log('Supabase client initialized, ready:', _supabaseReady);
  } catch (e) {
    console.warn('Supabase init failed:', e);
    _supabaseReady = false;
  }
}

var STALLS_DATA = [
  { id: 1, name: "Manong Bert's Fish Stall", description: 'Fresh seafood from Bohol Strait', area: 'Causeway Seafood Market', category: 'Fish' },
  { id: 2, name: "Aling Nena's Veggies", description: 'Farm-fresh vegetables daily', area: 'Cogon', category: 'Vegetables' },
  { id: 3, name: "Kuya Jun's Meat Shop", description: 'Freshly butchered pork and chicken', area: 'Manga', category: 'Meat' },
  { id: 4, name: 'NFA Rice Station Tagbilaran', description: 'Affordable rice for everyone', area: 'Poblacion', category: 'Rice' },
  { id: 5, name: "Inday's Kakanin", description: 'Traditional Bohol rice cakes and sweets', area: 'Tagbilaran City Central Public Market', category: 'Kakanin' }
];

var PRODUCTS_DATA = [
  { id: 1, stall_id: 1, name: 'Bangus', category: 'Fish', price: 160, unit: 'kg', freshness_score: 95, stock_qty: 50, is_featured: true, rating_avg: 4.8, total_reviews: 220 },
  { id: 2, stall_id: 1, name: 'Tilapia', category: 'Fish', price: 120, unit: 'kg', freshness_score: 90, stock_qty: 30, is_featured: true, rating_avg: 4.8, total_reviews: 220 },
  { id: 3, stall_id: 1, name: 'Galunggong', category: 'Fish', price: 200, unit: 'kg', freshness_score: 88, stock_qty: 20, is_featured: false, rating_avg: 4.8, total_reviews: 220 },
  { id: 4, stall_id: 1, name: 'Hipon', category: 'Fish', price: 320, unit: 'kg', freshness_score: 93, stock_qty: 12, is_featured: true, rating_avg: 4.8, total_reviews: 220 },
  { id: 5, stall_id: 2, name: 'Pechay Tagalog', category: 'Vegetables', price: 35, unit: 'bundle', freshness_score: 92, stock_qty: 250, is_featured: true, rating_avg: 4.6, total_reviews: 180 },
  { id: 6, stall_id: 2, name: 'Kamatis', category: 'Vegetables', price: 60, unit: 'kg', freshness_score: 85, stock_qty: 160, is_featured: false, rating_avg: 4.6, total_reviews: 180 },
  { id: 7, stall_id: 2, name: 'Talbos ng Kamote', category: 'Vegetables', price: 20, unit: 'bundle', freshness_score: 91, stock_qty: 220, is_featured: true, rating_avg: 4.6, total_reviews: 180 },
  { id: 8, stall_id: 2, name: 'Sitaw', category: 'Vegetables', price: 40, unit: 'bundle', freshness_score: 89, stock_qty: 120, is_featured: false, rating_avg: 4.6, total_reviews: 180 },
  { id: 9, stall_id: 3, name: 'Pork Liempo', category: 'Meat', price: 280, unit: 'kg', freshness_score: 80, stock_qty: 45, is_featured: true, rating_avg: 4.7, total_reviews: 155 },
  { id: 10, stall_id: 3, name: 'Chicken Wings', category: 'Meat', price: 180, unit: 'kg', freshness_score: 85, stock_qty: 60, is_featured: false, rating_avg: 4.7, total_reviews: 155 },
  { id: 11, stall_id: 4, name: 'Sinandomeng Rice', category: 'Rice', price: 52, unit: 'kg', freshness_score: 75, stock_qty: 340, is_featured: true, rating_avg: 4.5, total_reviews: 200 },
  { id: 12, stall_id: 4, name: 'Dinorado Rice', category: 'Rice', price: 58, unit: 'kg', freshness_score: 75, stock_qty: 200, is_featured: false, rating_avg: 4.5, total_reviews: 200 },
  { id: 13, stall_id: 5, name: 'Native Eggs', category: 'Eggs', price: 8, unit: 'pc', freshness_score: 82, stock_qty: 200, is_featured: false, rating_avg: 4.9, total_reviews: 95 },
  { id: 14, stall_id: 5, name: 'Native Banana', category: 'Fruits', price: 30, unit: 'kop', freshness_score: 88, stock_qty: 315, is_featured: false, rating_avg: 4.9, total_reviews: 95 },
  { id: 15, stall_id: 5, name: 'Bibingka', category: 'Kakanin', price: 35, unit: 'pc', freshness_score: 90, stock_qty: 80, is_featured: true, rating_avg: 4.9, total_reviews: 95 },
  { id: 16, stall_id: 5, name: 'Puto', category: 'Kakanin', price: 25, unit: 'pc', freshness_score: 92, stock_qty: 120, is_featured: false, rating_avg: 4.9, total_reviews: 95 },
  { id: 17, stall_id: 1, name: 'Squid', category: 'Fish', price: 240, unit: 'kg', freshness_score: 87, stock_qty: 25, is_featured: false, rating_avg: 4.8, total_reviews: 220 },
  { id: 18, stall_id: 3, name: 'Pork Tadyang', category: 'Meat', price: 310, unit: 'kg', freshness_score: 82, stock_qty: 30, is_featured: false, rating_avg: 4.7, total_reviews: 155 },
  { id: 19, stall_id: 2, name: 'Sayote', category: 'Vegetables', price: 25, unit: 'kg', freshness_score: 90, stock_qty: 180, is_featured: false, rating_avg: 4.6, total_reviews: 180 },
  { id: 20, stall_id: 5, name: 'Cassava Cake', category: 'Kakanin', price: 40, unit: 'pc', freshness_score: 88, stock_qty: 60, is_featured: true, rating_avg: 4.9, total_reviews: 95 }
];

var TICKER_DATA = [
  'Fresh Bangus at P160/kg \u00b7 Manong Bert\'s Stall, Causeway Seafood Market',
  'Pechay Tagalog at P35/bundle \u00b7 Aling Nena\'s Veggies, Cogon',
  'Fast delivery within Tagbilaran City \u00b7 Order now!',
  'Sinandomeng Rice at P52/kg \u00b7 NFA Rice Station',
  'Pork Liempo at P280/kg \u00b7 Kuya Jun\'s Meat Shop, Dampas',
  'New products added daily \u00b7 Check Fresh Picks!',
  'Booy Night Market now open \u00b7 New stalls available!',
  'Cassava Cake at P40/pc \u00b7 Inday\'s Kakanin, Tagbilaran City Central Public Market',
  'Free pickup for all orders at Tagbilaran Public Market'
];

var LOCATIONS = [
  'Tagbilaran City','Rajah Sikatuna Ave Cor H Zamora St, Cor Alfonso L. Uy St, Dampas Dist, Tagbilaran City, 6300 Bohol','Cogon, Tagbilaran',
  'Dampas, Tagbilaran','Manga, Tagbilaran','Poblacion I, Tagbilaran',
  'Poblacion II, Tagbilaran','Dao, Tagbilaran','Booy, Tagbilaran'
];

var TAGBILARAN_MARKETS = [
  { name:'Tagbilaran City Central Public Market', address:'Rajah Sikatuna Ave Cor H Zamora St, Cor Alfonso L. Uy St, Dampas Dist, Tagbilaran City, 6300 Bohol', area:'Dampas Dist', lat:9.655835657832577, lng:123.87160362427683, type:'Main Market', stalls:20, distance:'0.2 km', img:'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFIP6mCizKtI01FAx1BPdepBrdLOIXAHcGw1HH4vUjOI_Cmrr_26V5YJoYs3ukntj9gkTEY3pDcYfuBHafR6lFp5eIse4acfVgZ0rzMLFh5-hna0jIWcO7e2e59fvXie4uvg0gVLmL_YDdW=s680-w680-h510-rw', accent:'#1a5c2a', desc:'Tagbilaran\'s largest market - fish, meat, vegetables, rice & dry goods all under one roof.', badge:'Main Market' },
  { name:'Causeway Seafood Market', address:'Causeway Rd, Tagbilaran City', area:'Bool', lat:9.637142814124452, lng:123.85403921960126, type:'Fish & Seafood', stalls:25, distance:'0.8 km', img:'https://media.philstar.com/photos/2024/07/02/8-2_2024-07-02_21-34-33.jpg', accent:'#0e5a8c', desc:'Fresh bangus, tilapia, hipon, and squid straight from Bohol Strait - restocked every morning.', badge:'Seafood Hub' },
  { name:'Cogon Market', address:'Cogon, Tagbilaran City', area:'Cogon', lat:9.652687137057288, lng:123.85233732242513, type:'Vegetables', stalls:24, distance:'1.2 km', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WMtWBSbJo-L-phSRvMmxljfSOYNtYYrOUQ&s', accent:'#226622', desc:'The go-to spot for farm-fresh pechay, sitaw, kamatis, and seasonal Bohol vegetables.', badge:'Vegetables' },
  { name:'Manga Public Market', address:'Manga, Tagbilaran City', area:'Manga', lat:9.693612354899944, lng:123.86350449140498, type:'Night Market', stalls:26, distance:'2.1 km', img:'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGGfo2r1BFF5Shy_Dq6YMNnzi6nApfWuwpi25GW1vYGZDiD7ZEAiGRwHZiLzWeNvjffGOOfia0GaW-39DXKEl4r0lEaKHP7vicM1xW08x2vJlUQ0x-tQeaal-q5wpSsi3B1yKXn=s680-w680-h510-rw', accent:'#2a1a5c', desc:'Tagbilaran\'s most popular evening market - street food, kakanin, snacks & local delicacies.', badge:'Night Market' }
];

var CATEGORY_IMAGE_MAP = {
  fish: 'https://www.mosaicnorthafrica.com/wp-content/uploads/2022/09/IMG_2030-scaled-e1664370188241.jpg',
  vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
  rice: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=85',
  meat: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85',
  Eggs: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=85',
  kakanin: 'https://cdn.sanity.io/images/f3knbc2s/production/08253a025ac131d304f32ead20e90560bee717d8-2500x1600.jpg?auto=format',
  fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85',
  market: 'https://www.trvst.world/wp-content/uploads/2023/04/egg-farming-production.jpg'
};

var CATEGORY_META = {
  Fish: { label:'Fresh Fish & Seafood', desc:'Straight from Tagbilaran port - bangus, tilapia, hipon & more', color:'rgba(14,90,140,.55)' },
  Vegetables: { label:'Fresh Vegetables', desc:'Farm-fresh pechay, kamatis, sitaw & seasonal greens', color:'rgba(22,100,40,.55)' },
  Rice: { label:'Rice & Grains', desc:'Sinandomeng, Dinorado & premium rice varieties', color:'rgba(120,80,20,.55)' },
  Meat: { label:'Fresh Meat & Chicken', desc:'Pork, chicken & beef - freshly butchered daily', color:'rgba(140,30,30,.55)' },
  Eggs: { label:'Eggs', desc:'Native eggs, banana chips & local Bohol favorites', color:'rgba(160,90,10,.55)' },
  Kakanin: { label:'Kakanin & Rice Cakes', desc:'Bibingka, puto, cassava cake & traditional sweets', color:'rgba(100,40,100,.55)' },
  Fruits: { label:'Fresh Fruits', desc:'Native bananas, mangoes & tropical fruits', color:'rgba(20,110,60,.55)' }
};

var PRODUCT_IMAGE_MAP = {
  bangus:'https://www.tasteatlas.com/images/ingredients/50bafe8df1934a449c24f8e973439249.jpg',
  tilapia:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBOQf6Y_BaBCoI3Px1qN2HjLUTLeL-LBvw&s',
  galunggong:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUk-FZJ7nr6JgPTPpbekTeeHWFOl2eDAgeQA&s',
  hipon:'https://ph-test-11.slatic.net/p/cb5193b13f712d6a1e00f23bbb2eec80.jpg',
  squid:'https://upload.wikimedia.org/wikipedia/commons/2/24/Jagalchi_Market_-_Squid_Stall.JPG',
  'pechay tagalog':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRilEJzu8ETL56dDbaGVFGLLwTM7EoKjpg9wQ&s',
  kamatis:'https://upload.wikimedia.org/wikipedia/bcl/1/14/Kamatis_.jpg',
  'talbos ng kamote':'https://pinoyhyper.com/cdn/shop/files/download_29_a05a7593-ddbd-4d08-92e1-413c75f1f1e5.png?v=1756155456',
  sitaw:'https://pindotlang.com/cdn/shop/products/vgm_sitaw_d043b225-c8ec-4d9f-b0ea-9cf22e245d1c.jpg?v=1666320216',
  sayote:'https://cdn.britannica.com/86/218886-050-3CFD0AC9/chayote-fruit-Sechium-edule.jpg',
  'pork liempo':'https://pacificbay.com.ph/cdn/shop/products/pork-belly-liempo-sliced-688862.jpg?v=1776301884',
  'chicken wings':'https://assets.tendercuts.in/product/C/H/ec648622-2e91-4a53-b22a-35c0900aca70.jpg',
  'pork tadyang':'https://deligoodph.com/cdn/shop/collections/DSC06525_1200x1200.jpg?v=1603524321',
  'sinandomeng rice':'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=85',
  'dinorado rice':'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=85',
  'native eggs':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS18D3WO5UHjrZghU2Zwdi3FcESe12x1-uCQ&s',
  'native banana':'https://gcp-na-images.contentstack.com/v3/assets/bltea6093859af6183b/blt9892cb9ad84d55e0/6998c90ca97fc076cca7498b/banana.jpg?branch=production&width=3840&quality=75&auto=webp&crop=3:2s',
  bibingka:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bibingka.jpg/250px-Bibingka.jpg',
  puto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPQib70h_7hgA_4x0oKwcrC5Btd5hYt2Whw&s',
  'cassava cake':'https://bakeandsavor.com/wp-content/uploads/2025/05/Homemade-Cassava-Cake-Recipe.jpg'
};

var SELLER_CATEGORY_MAP = { 'Manong Bert': 'fish', 'Aling Nena': 'vegetables', 'Kuya Jun': 'meat', "Inday's Kakanin": 'kakanin' };

var allProducts = [], selectedProduct = null, qty = 1, activeCategory = 'all';
var cartItems = [], cartCount = 0, user = null, userProfile = null;
var toastTimer = null, progressTimer = null, searchDebounce = null;
var deliveryMode = 'pickup', activePage = 'home';
var sellerMode = false;
var activeChat = null, chatUnsub = null, _nextOrderId = 1, _nextConvId = 1, _nextMsgId = 1;

function normalizeCategoryKey(c) { return String(c).toLowerCase().trim(); }
function normalizeProductKey(n) { return String(n).toLowerCase().trim(); }
function getCategoryImage(c) { return CATEGORY_IMAGE_MAP[normalizeCategoryKey(c)] || CATEGORY_IMAGE_MAP.market; }
function getProductImage(p) { return PRODUCT_IMAGE_MAP[normalizeProductKey(p.name || p.product_name)] || getCategoryImage(p.category); }
function getSellerImage(s) {
  var keys = Object.keys(SELLER_CATEGORY_MAP);
  for (var i = 0; i < keys.length; i++) {
    if (s.indexOf(keys[i]) >= 0) return getCategoryImage(SELLER_CATEGORY_MAP[keys[i]]);
  }
  return getCategoryImage('market');
}

function progressStart() {
  var bar = document.getElementById('progressBar');
  bar.style.width = '0';
  bar.classList.add('running');
  var w = 0;
  progressTimer = setInterval(function() {
    w = Math.min(w + Math.random() * 12, 85);
    bar.style.width = w + '%';
  }, 120);
}
function progressDone() {
  clearInterval(progressTimer);
  var bar = document.getElementById('progressBar');
  bar.style.width = '100%';
  setTimeout(function() { bar.classList.remove('running'); bar.style.width = '0'; }, 400);
}
function btnLoad(btn, label) {
  if (!label) label = '';
  if (!btn) return;
  btn._orig = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span> ' + label;
  btn.disabled = true;
}
function btnRestore(btn) {
  if (!btn || !btn._orig) return;
  btn.innerHTML = btn._orig;
  btn.disabled = false;
}
function toast(msg, duration) {
  if (!duration) duration = 2500;
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { el.classList.remove('show'); }, duration);
}
function stars(val) {
  val = Math.round(val);
  return '\u2605'.repeat(val) + '\u2606'.repeat(5 - val);
}
function animCount(el, target) {
  var cur = 0;
  var step = Math.ceil(target / 20);
  var t = setInterval(function() {
    cur = Math.min(cur + step, target);
    el.textContent = cur;
    if (cur >= target) clearInterval(t);
  }, 40);
}

function switchPage(page, navEl) {
  activePage = page;
  var tnavs = document.querySelectorAll('.tnav');
  for (var i = 0; i < tnavs.length; i++) tnavs[i].classList.remove('active');
  if (navEl) { navEl.classList.add('active'); }
  else { var e = document.getElementById('tnav-' + page); if (e) e.classList.add('active'); }
  var pvs = document.querySelectorAll('.page-view');
  for (var j = 0; j < pvs.length; j++) pvs[j].classList.remove('active');
  var t = document.getElementById('page-' + page);
  if (t) t.classList.add('active');
  var rp = document.getElementById('rightPanel');
  if (rp) rp.style.display = (page === 'home') ? 'block' : 'none';
  if (page === 'orders') renderOrdersPage();
  if (page === 'chat') renderChatPage();
  if (page === 'account') renderAccountPage();
}

function setGreeting() {
  var h = new Date().getHours();
  var g = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  var el = document.getElementById('heroTitle');
  if (el) el.textContent = g + '! What do you need from palengke today?';
}

function loadProducts() {
  progressStart();
  document.getElementById('freshGrid').innerHTML = '<div class="skeleton sk-card"></div><div class="skeleton sk-card"></div>';
  document.getElementById('deliveryGrid').innerHTML = '<div class="skeleton sk-row"></div><div class="skeleton sk-row"></div><div class="skeleton sk-row"></div><div class="skeleton sk-row"></div>';
  allProducts = PRODUCTS_DATA.map(function(p) {
    var stall = null;
    for (var i = 0; i < STALLS_DATA.length; i++) {
      if (STALLS_DATA[i].id === p.stall_id) { stall = STALLS_DATA[i]; break; }
    }
    return {
      product_id: p.id, product_name: p.name, category: p.category,
      price: p.price, unit: p.unit, freshness_score: p.freshness_score,
      stock_qty: p.stock_qty, is_featured: p.is_featured ? 1 : 0,
      emoji: '', stall_name: (stall && stall.name) || '', stall_id: p.stall_id,
      rating_avg: p.rating_avg, total_reviews: p.total_reviews,
      area: (stall && stall.area) || ''
    };
  });
  progressDone();
  var stallCount = 0;
  var seen = {};
  for (var i = 0; i < allProducts.length; i++) {
    if (!seen[allProducts[i].stall_id]) { seen[allProducts[i].stall_id] = true; stallCount++; }
  }
  var sEl = document.getElementById('sStalls');
  var pEl = document.getElementById('sProducts');
  if (sEl) animCount(sEl, stallCount);
  if (pEl) animCount(pEl, allProducts.length);
  renderFresh(allProducts);
  renderDelivery(allProducts);
  if (allProducts.length > 0) loadSelectedProduct(allProducts[0]);
}

function renderFresh(products) {
  var featured = [];
  for (var i = 0; i < products.length; i++) {
    if (products[i].is_featured == 1) featured.push(products[i]);
  }
  var top2 = featured.length >= 2 ? featured.slice(0, 2) : products.slice(0, 2);
  var html = '';
  for (var j = 0; j < top2.length; j++) {
    var p = top2[j];
    html += '<div class="fc" onclick="loadSelectedProduct(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')" style="animation-delay:' + (j * 0.07) + 's">';
    html += '<div class="fc-img"><img class="fc-image" src="' + getProductImage(p) + '" alt="' + p.product_name + '">';
    html += (p.is_featured == 1 ? '<div class="fc-tag">Top Rated</div>' : '');
    html += '</div><div class="fc-body">';
    html += '<div class="fc-name">' + p.stall_name + '</div>';
    html += '<div class="fc-stars">' + stars(p.rating_avg || 4.5) + '</div>';
    html += '<div class="fc-rating">' + (p.rating_avg || 4.5).toFixed(1) + ' \u00b7 ' + (p.total_reviews || 0) + '+ ratings</div>';
    html += '<div class="fc-bot"><div class="fc-loc">\ud83d\udccd ' + (p.area || 'Tagbilaran') + '</div>';
    html += '<button class="btn-add" onclick="event.stopPropagation(); addToCart(' + p.product_id + ', this)">+ADD</button>';
    html += '</div></div></div>';
  }
  document.getElementById('freshGrid').innerHTML = html;
}

function renderDelivery(products) {
  var slice = products.slice(0, 4);
  var html = '';
  for (var i = 0; i < slice.length; i++) {
    var p = slice[i];
    html += '<div class="dc" onclick="loadSelectedProduct(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">';
    html += '<img class="dc-thumb" src="' + getProductImage(p) + '" alt="' + p.product_name + '">';
    html += '<div class="dc-body">';
    html += '<div class="dc-price">\u20b1' + p.price + '/' + p.unit + '</div>';
    html += '<div class="dc-name">' + p.product_name + '</div>';
    html += '<div class="dc-stars">' + stars(p.rating_avg || 4.5) + ' <span class="dc-rating-num">' + (p.rating_avg || 4.5).toFixed(1) + '</span></div>';
    html += '<div class="freshbar"><div class="freshbar-fill" style="width:' + p.freshness_score + '%"></div></div>';
    html += '<div class="dc-stock">\u2705 ' + p.stock_qty + ' ' + (p.unit === 'kg' ? 'fresh' : p.unit) + '</div>';
    html += '</div>';
    html += '<button class="btn-dadd" onclick="event.stopPropagation(); addToCart(' + p.product_id + ', this)">ADD</button>';
    html += '</div>';
  }
  document.getElementById('deliveryGrid').innerHTML = html;
}

function getLocalReviews(productId) {
  var all = JSON.parse(localStorage.getItem('th_reviews') || '[]');
  return all.filter(function(r) { return r.product_id === productId; }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
}

async function loadSelectedProduct(p) {
  if (typeof p === 'string') { try { p = JSON.parse(p); } catch (e) { return; } }
  if (!p) return;
  selectedProduct = p;
  qty = 1;
  document.getElementById('rpContent').innerHTML =
    '<div class="rp-skeleton">' +
    '<div class="skeleton" style="height:185px;border-radius:14px"></div>' +
    '<div class="skeleton" style="height:22px;width:58%;margin-top:12px"></div>' +
    '<div class="skeleton" style="height:30px;width:44%;margin-top:8px"></div>' +
    '<div class="skeleton" style="height:62px;margin-top:10px"></div>' +
    '<div class="skeleton" style="height:74px;margin-top:8px"></div>' +
    '<div class="skeleton" style="height:44px;margin-top:8px"></div></div>';
  setTimeout(async function() {
    var reviews = [];
    if (_supabaseReady && window.supabaseClient) {
      try {
        var rres = await sb().from('reviews').select('*, profiles!inner(full_name)').eq('product_id', p.product_id).order('created_at', { ascending: false }).limit(10);
        if (rres.data) {
          reviews = rres.data.map(function(r) {
            return {
              full_name: r.profiles ? r.profiles.full_name : 'Guest',
              rating: r.rating,
              comment: r.comment || '',
              time: r.created_at ? new Date(r.created_at).toLocaleDateString() : ''
            };
          });
        }
      } catch (e) { console.warn('Supabase reviews failed:', e); }
    }
    if (reviews.length === 0) {
      var localReviews = getLocalReviews(p.product_id);
      reviews = localReviews.map(function(r) {
        return {
          full_name: r.full_name || 'Guest',
          rating: r.rating,
          comment: r.comment || '',
          time: r.created_at ? new Date(r.created_at).toLocaleDateString() : ''
        };
      });
    }
    var nearby = [];
    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].stall_id == p.stall_id && allProducts[i].product_id != p.product_id) nearby.push(allProducts[i]);
    }
    renderProductDetail(p, nearby.slice(0, 3), reviews);
  }, 380);
}

function renderProductDetail(p, nearby, reviews) {
  if (!nearby) nearby = [];
  if (!reviews) reviews = [];
  var ratingVal = parseFloat(p.rating_avg || 4.5);
  var dots = '';
  for (var i = 1; i <= 3; i++) dots += '<span class="dot' + (i > qty ? ' e' : '') + '"></span>';
  var nearbyHtml = '';
  if (nearby.length > 0) {
    nearbyHtml += '<div class="nearby-title">More from this Stall</div>';
    for (var j = 0; j < nearby.length; j++) {
      var n = nearby[j];
      nearbyHtml += '<div class="nearby-item" onclick="loadSelectedProduct(' + JSON.stringify(n).replace(/"/g, '&quot;') + ')">';
      nearbyHtml += '<img class="nearby-thumb" src="' + getProductImage(n) + '" alt="' + n.product_name + '">';
      nearbyHtml += '<div class="nearby-info"><div class="nearby-name">' + n.product_name + '</div>';
      nearbyHtml += '<div class="nearby-price">\u20b1' + n.price + '/' + n.unit + '</div>';
      nearbyHtml += '<div class="freshbar" style="margin:3px 0"><div class="freshbar-fill" style="width:' + n.freshness_score + '%"></div></div>';
      nearbyHtml += '<div class="nearby-stock">\u2705 ' + n.stock_qty + ' ' + n.unit + '</div></div>';
      nearbyHtml += '<button class="btn-nb" onclick="event.stopPropagation(); addToCart(' + n.product_id + ', this)">ADD</button></div>';
    }
  }
  var reviewsHtml = '';
  for (var k = 0; k < reviews.length; k++) {
    var r = reviews[k];
    reviewsHtml += '<div class="review-item">';
    reviewsHtml += '<div class="rv-head"><div class="rv-avatar">' + (r.full_name || 'A')[0] + '</div>';
    reviewsHtml += '<div class="rv-meta"><span class="rv-name">' + r.full_name + '</span><span class="rv-time">' + (r.time || '') + '</span></div>';
    reviewsHtml += '<span class="rv-stars">' + '\u2605'.repeat(r.rating || 5) + '\u2606'.repeat(5 - (r.rating || 5)) + '</span></div>';
    reviewsHtml += '<div class="rv-comment">' + (r.comment || '') + '</div></div>';
  }
  var starsHtml = '';
  for (var s = 1; s <= 5; s++) starsHtml += '<span class="rv-star-opt" data-val="' + s + '" onclick="setRvStar(' + p.product_id + ',' + s + ')">\u2605</span>';

  document.getElementById('rpContent').innerHTML =
    '<div style="animation:fadeUp .3s ease both">' +
    '<div class="pd-img"><img class="pd-image" src="' + getProductImage(p) + '" alt="' + p.product_name + '"></div>' +
    '<div class="pd-title">' + p.product_name + '</div>' +
    '<div class="pd-price">\u20b1' + p.price + '<small>/' + p.unit + '</small></div>' +
    '<div class="seller-row">' +
    '<div class="seller-avi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>' +
    '<div><div class="seller-name">' + p.stall_name + '</div>' +
    '<div class="seller-stars">' + stars(ratingVal) + '</div>' +
    '<div class="seller-rev">' + (p.total_reviews || 0) + '+ reviews \u00b7 ' + (p.area || 'Tagbilaran') + '</div></div></div>' +
    '<div class="fresh-card">' +
    '<div class="fresh-top"><span class="fresh-score">' + p.freshness_score + '</span><span class="fresh-label">Very Fresh</span>' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07"/><path d="M12 8v4l3 3"/></svg></div>' +
    '<div class="fresh-bar"><div class="fresh-bar-fill" style="width:' + p.freshness_score + '%"></div></div>' +
    '<div class="fresh-meta"><span>' + p.stock_qty + ' ' + p.unit + ' available</span><span>Restocked 2h ago</span></div></div>' +
    '<div class="qty-section">' +
    '<div class="qty-header"><span>Quantity</span><span style="color:var(--text-muted)">' + qty + ' ' + p.unit + '</span></div>' +
    '<div class="qty-row">' +
    '<button class="qty-btn" onclick="changeQty(-1)">\u2212</button>' +
    '<span class="qty-num" id="pdQty">' + qty + '</span>' +
    '<div class="qty-dots" id="pdDots">' + dots + '</div>' +
    '<span class="qty-unit">' + p.unit + '</span>' +
    '<button class="qty-btn" onclick="changeQty(1)">+</button></div></div>' +
    '<div class="action-row">' +
    '<button class="btn-chat" onclick="openChatWithSeller(\'' + p.stall_name.replace(/'/g, "\\'") + '\', ' + p.stall_id + ')">' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px;vertical-align:middle"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Chat Seller</button>' +
    '<button class="btn-cart-add" id="pdCartBtn" onclick="addToCartFromPanel()">Add to Cart \u20b1<span id="pdTotal">' + p.price + '</span></button></div>' +
    nearbyHtml +
    '<div class="rv-section">' +
    '<div class="rv-section-head"><span class="nearby-title" style="margin:0">Reviews</span><span class="rv-count">' + reviews.length + ' review' + (reviews.length !== 1 ? 's' : '') + '</span></div>' +
    reviewsHtml +
    '<div class="rv-write-box" id="rvWriteBox_' + p.product_id + '">' +
    '<div class="rv-write-title">Leave a Review</div>' +
    '<div class="rv-star-pick" id="rvStars_' + p.product_id + '">' + starsHtml + '</div>' +
    '<textarea class="rv-textarea" id="rvText_' + p.product_id + '" placeholder="Share your experience with this product..." rows="3"></textarea>' +
    '<button class="rv-submit-btn" onclick="submitReview(' + p.product_id + ')">Post Review</button></div></div></div>';
}

var _rvRatings = {};
function setRvStar(pid, val) {
  _rvRatings[pid] = val;
  var c = document.getElementById('rvStars_' + pid);
  if (!c) return;
  var stars = c.querySelectorAll('.rv-star-opt');
  for (var i = 0; i < stars.length; i++) {
    stars[i].classList.toggle('selected', parseInt(stars[i].dataset.val) <= val);
  }
}

async function submitReview(pid) {
  var rating = _rvRatings[pid] || 0;
  var textEl = document.getElementById('rvText_' + pid);
  var text = textEl ? textEl.value.trim() : '';
  if (!rating) { toast('Please pick a star rating first!'); return; }
  if (!text) { toast('Please write a comment before posting.'); return; }
  if (!user) { toast('Please login to post a review.'); openLogin(); return; }
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        var result = await sb().from('reviews').insert({ product_id: pid, user_id: uid, rating: rating, comment: text });
        if (!result.error) {
          toast('Review posted! Thank you!');
          if (selectedProduct && selectedProduct.product_id == pid) {
            loadSelectedProduct(selectedProduct);
          }
          return;
        }
        console.warn('Supabase review error:', result.error);
      }
    } catch (e) { console.warn('Supabase review failed:', e); }
  }
  var reviews = JSON.parse(localStorage.getItem('th_reviews') || '[]');
  reviews.unshift({
    product_id: pid,
    user_id: user.id || 'local',
    full_name: userProfile ? userProfile.full_name : (user.email ? user.email.split('@')[0] : 'Guest'),
    rating: rating,
    comment: text,
    created_at: new Date().toISOString()
  });
  localStorage.setItem('th_reviews', JSON.stringify(reviews));
  toast('Review posted! Thank you!');
  if (selectedProduct && selectedProduct.product_id == pid) {
    var nearby = [];
    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].stall_id == selectedProduct.stall_id && allProducts[i].product_id != selectedProduct.product_id) nearby.push(allProducts[i]);
    }
    var newR = getLocalReviews(pid);
    var nrv = newR.map(function(r) {
      return { full_name: r.full_name || 'Guest', rating: r.rating, comment: r.comment || '', time: 'Just now' };
    });
    renderProductDetail(selectedProduct, nearby.slice(0, 3), nrv);
  }
}

function changeQty(d) {
  qty = Math.max(1, Math.min(20, qty + d));
  var qEl = document.getElementById('pdQty');
  var tEl = document.getElementById('pdTotal');
  var dEl = document.getElementById('pdDots');
  if (qEl) qEl.textContent = qty;
  if (tEl && selectedProduct) tEl.textContent = (selectedProduct.price * qty).toFixed(0);
  if (dEl) {
    var html = '';
    for (var i = 1; i <= 3; i++) html += '<span class="dot' + (i > qty ? ' e' : '') + '"></span>';
    dEl.innerHTML = html;
  }
}

async function loadCart() {
  if (!user) { cartItems = []; cartCount = 0; updateCartBadge(0); return; }
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        var res = await sb().from('cart_items').select('*').eq('user_id', uid);
        if (res.data && res.data.length > 0) {
          cartItems = res.data.map(function(c) {
            return {
              product_id: c.product_id, product_name: c.product_name,
              price: parseFloat(c.price), unit: c.unit,
              stall_name: c.stall_name || '', stall_id: c.stall_id,
              quantity: c.quantity, emoji: ''
            };
          });
          cartCount = 0;
          for (var i = 0; i < cartItems.length; i++) cartCount += cartItems[i].quantity;
          updateCartBadge(cartCount);
          localStorage.setItem('th_cart_' + (user.id || 'local'), JSON.stringify(cartItems));
          return;
        }
        if (res.error) console.warn('Supabase loadCart error:', res.error);
      }
    } catch (e) { console.warn('Supabase loadCart failed:', e); }
  }
  var localData = JSON.parse(localStorage.getItem('th_cart_' + (user.id || 'local')) || '[]');
  if (localData.length > 0) {
    cartItems = localData;
    cartCount = 0;
    for (var i = 0; i < cartItems.length; i++) cartCount += cartItems[i].quantity;
    updateCartBadge(cartCount);
    return;
  }
  cartItems = []; cartCount = 0; updateCartBadge(0);
}

function updateCartBadge(n) {
  var badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = n;
}

async function addToCart(productId, btnEl) {
  if (!user) { toast('Please login to add items.'); openLogin(); return; }
  var p = null;
  for (var i = 0; i < allProducts.length; i++) { if (allProducts[i].product_id == productId) { p = allProducts[i]; break; } }
  if (!p) return;
  if (btnEl) btnLoad(btnEl);
  progressStart();
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        console.log('addToCart: uid=' + uid + ' productId=' + productId);
        var ex = null;
        for (var j = 0; j < cartItems.length; j++) { if (cartItems[j].product_id == productId) { ex = cartItems[j]; break; } }
        var r;
        if (ex) {
          r = await sb().from('cart_items').upsert({ user_id: uid, product_id: productId, product_name: p.product_name, price: p.price, unit: p.unit, stall_name: p.stall_name, stall_id: p.stall_id, quantity: ex.quantity + 1 }, { onConflict: 'user_id,product_id' });
        } else {
          r = await sb().from('cart_items').insert({ user_id: uid, product_id: productId, product_name: p.product_name, price: p.price, unit: p.unit, stall_name: p.stall_name, stall_id: p.stall_id, quantity: 1 });
        }
        if (r.error) { console.warn('Supabase cart error:', r.error.message, 'code:', r.error.code); } else { console.log('Supabase cart success:', r.data); }
      } else { console.log('addToCart: no Supabase session'); }
    } catch (e) { console.warn('Supabase addToCart failed:', e); }
  } else { console.log('addToCart: Supabase not ready, ready=' + _supabaseReady + ' client=' + !!window.supabaseClient); }
  var existing = null;
  for (var j = 0; j < cartItems.length; j++) { if (cartItems[j].product_id == productId) { existing = cartItems[j]; break; } }
  if (existing) {
    existing.quantity++;
  } else {
    cartItems.push({ product_id: p.product_id, product_name: p.product_name, price: p.price, unit: p.unit, stall_name: p.stall_name, stall_id: p.stall_id, quantity: 1, emoji: '' });
  }
  localStorage.setItem('th_cart_' + (user.id || 'local'), JSON.stringify(cartItems));
  cartCount = 0;
  for (var k = 0; k < cartItems.length; k++) cartCount += cartItems[k].quantity;
  updateCartBadge(cartCount);
  toast(p.product_name + ' added to cart!');
  renderCartBody();
  progressDone();
  if (btnEl) btnRestore(btnEl);
}

async function addToCartFromPanel() {
  if (!selectedProduct) return;
  if (!user) { toast('Please login to add items.'); openLogin(); return; }
  var btn = document.getElementById('pdCartBtn');
  btnLoad(btn, '');
  progressStart();
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        var r = await sb().from('cart_items').upsert({ user_id: uid, product_id: selectedProduct.product_id, product_name: selectedProduct.product_name, price: selectedProduct.price, unit: selectedProduct.unit, stall_name: selectedProduct.stall_name, stall_id: selectedProduct.stall_id, quantity: qty }, { onConflict: 'user_id,product_id' });
        if (r.error) console.warn('Supabase cart upsert error:', r.error);
      }
    } catch (e) { console.warn(e); }
  }
  var existing = null;
  for (var i = 0; i < cartItems.length; i++) { if (cartItems[i].product_id == selectedProduct.product_id) { existing = cartItems[i]; break; } }
  if (existing) existing.quantity += qty;
  else cartItems.push({ product_id: selectedProduct.product_id, product_name: selectedProduct.product_name, price: selectedProduct.price, unit: selectedProduct.unit, stall_name: selectedProduct.stall_name, stall_id: selectedProduct.stall_id, quantity: qty, emoji: '' });
  localStorage.setItem('th_cart_' + (user.id || 'local'), JSON.stringify(cartItems));
  cartCount = 0;
  for (var j = 0; j < cartItems.length; j++) cartCount += cartItems[j].quantity;
  updateCartBadge(cartCount);
  toast(selectedProduct.product_name + ' x ' + qty + ' added!');
  renderCartBody();
  progressDone();
  btnRestore(btn);
}

function openCart() {
  document.getElementById('cartBg').classList.add('open');
  document.getElementById('cartPanel').classList.add('open');
  renderCartBody();
}
function closeCart() {
  document.getElementById('cartBg').classList.remove('open');
  document.getElementById('cartPanel').classList.remove('open');
}
function renderCartBody() {
  var body = document.getElementById('cartBody');
  var foot = document.getElementById('cartFoot');
  if (!cartItems || !cartItems.length) {
    body.innerHTML = '<div class="empty-state"><span>\ud83d\uded2</span><p>Your cart is empty</p></div>';
    if (foot) foot.style.display = 'none';
    return;
  }
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) total += cartItems[i].price * cartItems[i].quantity;
  var html = '';
  for (var j = 0; j < cartItems.length; j++) {
    var item = cartItems[j];
    html += '<div class="cart-item" id="ci_' + item.product_id + '">';
    html += '<img class="ci-emoji" src="' + getProductImage(item) + '" alt="' + item.product_name + '">';
    html += '<div class="ci-info"><div class="ci-name">' + item.product_name + '</div><div class="ci-stall">\ud83d\udccd ' + item.stall_name + '</div>';
    html += '<div class="ci-price">\u20b1' + item.price + '/' + item.unit + '</div></div>';
    html += '<div class="ci-ctrl"><button class="ci-btn" onclick="updateCartQty(' + item.product_id + ',' + (item.quantity - 1) + ')">\u2212</button>';
    html += '<span class="ci-qty">' + item.quantity + '</span>';
    html += '<button class="ci-btn" onclick="updateCartQty(' + item.product_id + ',' + (item.quantity + 1) + ')">+</button></div>';
    html += '<span class="ci-total">\u20b1' + (item.price * item.quantity).toFixed(2) + '</span>';
    html += '<button class="ci-rm" onclick="removeFromCart(' + item.product_id + ')" title="Remove">\u2715</button></div>';
  }
  body.innerHTML = html;
  var totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = '\u20b1' + total.toFixed(2);
  if (foot) foot.style.display = 'block';
}

async function updateCartQty(pid, newQty) {
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        if (newQty <= 0) {
          var r = await sb().from('cart_items').delete().eq('user_id', uid).eq('product_id', pid);
          if (r.error) console.warn('Supabase cart delete error:', r.error);
        } else {
          var item = null;
          for (var i = 0; i < cartItems.length; i++) { if (cartItems[i].product_id == pid) { item = cartItems[i]; break; } }
          if (item) {
            var r = await sb().from('cart_items').upsert({ user_id: uid, product_id: pid, product_name: item.product_name, price: item.price, unit: item.unit, stall_name: item.stall_name, stall_id: item.stall_id, quantity: newQty }, { onConflict: 'user_id,product_id' });
            if (r.error) console.warn('Supabase cart upsert error:', r.error);
          }
        }
      }
    } catch (e) { console.warn(e); }
  }
  if (newQty <= 0) {
    cartItems = cartItems.filter(function(i) { return i.product_id != pid; });
  } else {
    for (var i = 0; i < cartItems.length; i++) { if (cartItems[i].product_id == pid) { cartItems[i].quantity = newQty; break; } }
  }
  localStorage.setItem('th_cart_' + (user.id || 'local'), JSON.stringify(cartItems));
  cartCount = 0;
  for (var j = 0; j < cartItems.length; j++) cartCount += cartItems[j].quantity;
  updateCartBadge(cartCount);
  renderCartBody();
}

async function removeFromCart(pid) {
  var el = document.getElementById('ci_' + pid);
  if (el) { el.style.opacity = '.4'; el.style.transition = '.2s'; }
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        var r = await sb().from('cart_items').delete().eq('user_id', uid).eq('product_id', pid);
        if (r.error) console.warn('Supabase cart delete error:', r.error);
      }
    } catch (e) {}
  }
  cartItems = cartItems.filter(function(i) { return i.product_id != pid; });
  localStorage.setItem('th_cart_' + (user.id || 'local'), JSON.stringify(cartItems));
  cartCount = 0;
  for (var i = 0; i < cartItems.length; i++) cartCount += cartItems[i].quantity;
  updateCartBadge(cartCount);
  renderCartBody();
  toast('Item removed from cart.');
}

function openCheckout() {
  if (!cartItems.length) { toast('Cart is empty!'); return; }
  if (!user) { closeCart(); openLogin(); toast('Please login to checkout.'); return; }
  deliveryMode = 'pickup';
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) total += cartItems[i].price * cartItems[i].quantity;
  var itemsHtml = '';
  for (var j = 0; j < cartItems.length; j++) {
    var i2 = cartItems[j];
    itemsHtml += '<div class="co-item-row"><span><img class="co-thumb" src="' + getProductImage(i2) + '" alt="' + i2.product_name + '"> ' + i2.product_name + ' x ' + i2.quantity + '</span><span>\u20b1' + (i2.price * i2.quantity).toFixed(2) + '</span></div>';
  }
  document.getElementById('coBody').innerHTML =
    '<div class="co-grid">' +
    '<div class="co-opt selected" id="co_pickup" onclick="setDelivery(\'pickup\')"><div class="co-icon">\ud83c\udfaa</div><strong>Pick-up</strong><small>Get at the stall</small></div>' +
    '<div class="co-opt" id="co_delivery" onclick="setDelivery(\'delivery\')"><div class="co-icon">\ud83d\udef5</div><strong>Delivery</strong><small>+\u20b140 flat fee</small></div></div>' +
    '<div id="addrWrap" style="display:none"><div class="field"><label>Delivery Address *</label><input type="text" id="coAddr" placeholder="Enter your address in Tagbilaran..." autocomplete="off" data-1p-ignore></div></div>' +
    '<div class="field"><label>Order Notes <small>(optional)</small></label><input type="text" id="coNotes" placeholder="e.g. Please slice the fish" autocomplete="off"></div>' +
    '<div class="co-items">' + itemsHtml + '</div>' +
    '<div class="co-total"><span>Total <span id="coFeeNote">(free pickup)</span></span><span id="coTotal">\u20b1' + total.toFixed(2) + '</span></div>' +
    '<button class="btn-place" id="placeBtn" onclick="placeOrder()">\ud83c\udf89 Place Order</button>';
  document.getElementById('coBg').classList.add('open');
  document.getElementById('coModal').classList.add('open');
}
function setDelivery(mode) {
  deliveryMode = mode;
  document.getElementById('co_pickup').classList.toggle('selected', mode === 'pickup');
  document.getElementById('co_delivery').classList.toggle('selected', mode === 'delivery');
  document.getElementById('addrWrap').style.display = mode === 'delivery' ? 'block' : 'none';
  var base = 0;
  for (var i = 0; i < cartItems.length; i++) base += cartItems[i].price * cartItems[i].quantity;
  var fee = mode === 'delivery' ? 40 : 0;
  var tEl = document.getElementById('coTotal');
  var nEl = document.getElementById('coFeeNote');
  if (tEl) tEl.textContent = '\u20b1' + (base + fee).toFixed(2);
  if (nEl) nEl.textContent = mode === 'delivery' ? '(+\u20b140 delivery)' : '(free pickup)';
}

function donePlacing(btn) {
  progressDone();
  btnRestore(btn);
}

async function placeOrder() {
  var btn = document.getElementById('placeBtn');
  var addrEl = document.getElementById('coAddr');
  var addr = addrEl ? addrEl.value.trim() : '';
  var notesEl = document.getElementById('coNotes');
  var notes = notesEl ? notesEl.value.trim() : '';
  if (deliveryMode === 'delivery' && !addr) { toast('Please enter a delivery address.'); return; }
  btnLoad(btn, 'Placing order...');
  progressStart();
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) total += cartItems[i].price * cartItems[i].quantity;
  if (deliveryMode === 'delivery') total += 40;
  var stallId = cartItems[0] ? cartItems[0].stall_id : null;
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (!uid) { donePlacing(btn); toast('Please login first.'); return; }
      var result = await sb().from('orders').insert({
        user_id: uid,
        buyer_name: (userProfile && userProfile.full_name) || (user && user.email) || 'Unknown',
        buyer_email: (user && user.email) || null,
        stall_id: stallId, mode: deliveryMode,
        delivery_address: addr || null, notes: notes || null,
        total: total, status: 'placed', track_step: 1
      }).select('id').single();
      if (!result.error && result.data) {
        var orderItems = [];
        for (var j = 0; j < cartItems.length; j++) {
          orderItems.push({
            order_id: result.data.id, product_id: cartItems[j].product_id,
            product_name: cartItems[j].product_name,
            quantity: cartItems[j].quantity, price: cartItems[j].price
          });
        }
        try { await sb().from('order_items').insert(orderItems); } catch (e) { console.warn('order_items insert failed:', e); }
        try { await sb().from('cart_items').delete().eq('user_id', uid); } catch (e) { console.warn('cart cleanup failed:', e); }
        localStorage.removeItem('th_cart_' + (uid || 'local'));
        cartItems = []; cartCount = 0; updateCartBadge(0);
        closeCheckout(); closeCart();
        toast('Order placed! Check your orders.');
        setTimeout(function() { switchPage('orders', null); }, 1200);
        donePlacing(btn);
        return;
      }
      toast('Supabase unavailable — saving order locally.');
      console.warn('Supabase order error:', result.error);
    } catch (e) {
      console.warn('Supabase placeOrder failed:', e);
    }
  }
  var orders = JSON.parse(localStorage.getItem('th_orders_' + (user.id || 'local')) || '[]');
  var order = {
    id: _nextOrderId++,
    user_id: user.id || 'local',
    stall_id: stallId,
    mode: deliveryMode,
    delivery_address: addr || null,
    notes: notes || null,
    total: total,
    status: 'placed',
    track_step: 1,
    created_at: new Date().toISOString(),
    order_items: cartItems.map(function(c) {
      return { product_name: c.product_name, quantity: c.quantity, price: c.price };
    })
  };
  orders.unshift(order);
  localStorage.setItem('th_orders_' + (user.id || 'local'), JSON.stringify(orders));
  localStorage.removeItem('th_cart_' + (user.id || 'local'));
  cartItems = []; cartCount = 0; updateCartBadge(0);
  closeCheckout(); closeCart();
  toast('Order placed! Check your orders.');
  setTimeout(function() { switchPage('orders', null); }, 1200);
  donePlacing(btn);
}

function closeCheckout() {
  document.getElementById('coBg').classList.remove('open');
  document.getElementById('coModal').classList.remove('open');
}

var activeOrderFilter = 'all';
var liveOrders = [];

async function renderOrdersPage() {
  var container = document.getElementById('ordersContent');
  if (!user) {
    container.innerHTML = '<div style="padding:24px"><div class="acct-guest" style="padding:60px 20px"><div class="acct-guest-icon-wrap"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--brand-mid)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><div class="acct-guest-title">No orders yet</div><div class="acct-guest-sub">Login to view and track your orders from Tagbilaran markets.</div><button class="btn-login-big" onclick="openLogin()">Login / Register</button></div></div>';
    return;
  }
  var rawOrders = [];
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        var res = await sb().from('orders').select('*, order_items(*)').eq('user_id', uid).order('created_at', { ascending: false });
        if (res.data) {
          rawOrders = res.data.map(function(o) {
            var items = (o.order_items || []).map(function(i) { return { name: i.product_name, qty: i.quantity, price: parseFloat(i.price) }; });
            return {
              id: 'TH-' + o.id,
              date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              stall: '', status: o.status, items: items,
              total: parseFloat(o.total), mode: o.mode, trackStep: o.track_step
            };
          });
        }
      }
    } catch (e) { console.warn('Supabase orders failed:', e); }
  }
  if (rawOrders.length === 0) {
    var stored = JSON.parse(localStorage.getItem('th_orders_' + (user.id || 'local')) || '[]');
    rawOrders = stored.map(function(o) {
      var items = (o.order_items || []).map(function(i) { return { name: i.product_name, qty: i.quantity, price: parseFloat(i.price) }; });
      return {
        id: 'TH-' + o.id,
        date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        stall: '', status: o.status, items: items,
        total: parseFloat(o.total), mode: o.mode, trackStep: o.track_step
      };
    });
  }
  liveOrders = rawOrders;
  var filters = [
    {key:'all',label:'All Orders'}, {key:'placed',label:'Placed'},
    {key:'confirmed',label:'Confirmed'}, {key:'preparing',label:'Preparing'},
    {key:'delivered',label:'Delivered'}, {key:'cancelled',label:'Cancelled'}
  ];
  var filtered = activeOrderFilter === 'all' ? liveOrders : liveOrders.filter(function(o) { return o.status === activeOrderFilter; });
  var fHtml = '';
  for (var i = 0; i < filters.length; i++) {
    fHtml += '<button class="ofil-btn' + (filters[i].key === activeOrderFilter ? ' active' : '') + '" onclick="setOrderFilter(\'' + filters[i].key + '\')">' + filters[i].label + '</button>';
  }
  var oHtml = '';
  if (!filtered.length) {
    oHtml = '<div class="empty-state"><span>\ud83d\udced</span><p>No ' + (activeOrderFilter === 'all' ? '' : activeOrderFilter) + ' orders yet</p></div>';
  } else {
    for (var j = 0; j < filtered.length; j++) oHtml += renderOrderCard(filtered[j], j);
  }
  container.innerHTML = '<div class="orders-page">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">' +
    '<div><h2 class="ph-title">My Orders</h2><p class="ph-sub" style="margin-top:2px">Track your orders from Tagbilaran City markets</p></div>' +
    '<div style="display:flex;gap:8px">' +
    '<button class="btn-nb" onclick="switchPage(\'home\',null);filterCat(\'all\',null)" style="white-space:nowrap">+ New Order</button>' +
    '<button class="' + (sellerMode ? 'oc-btn oc-btn-solid' : 'oc-btn oc-btn-outline') + '" onclick="toggleSellerMode()" style="white-space:nowrap">' + (sellerMode ? '\ud83d\udd27 Seller Mode' : 'Seller Mode') + '</button></div></div>' +
    '<div class="orders-filters">' + fHtml + '</div>' + oHtml + '</div>';
}
function setOrderFilter(f) { activeOrderFilter = f; renderOrdersPage(); }

function toggleSellerMode() {
  sellerMode = !sellerMode;
  renderOrdersPage();
  toast(sellerMode ? 'Seller mode on — you can advance or cancel orders' : 'Seller mode off');
}

function nextStatus(s) {
  var m = { placed: 'Confirmed', confirmed: 'Preparing', preparing: 'Ready', ready: 'Delivered' };
  return m[s] || 'Delivered';
}

function nextStatusKey(s) {
  var m = { placed: 'confirmed', confirmed: 'preparing', preparing: 'ready', ready: 'delivered' };
  return m[s] || 'delivered';
}

async function advanceOrderStatus(orderId) {
  var rawId = parseInt(orderId.replace('TH-', ''), 10);
  if (!rawId) { toast('Invalid order ID'); return; }
  var nextSt = '';
  progressStart();
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        var cur = await sb().from('orders').select('status, track_step').eq('id', rawId).single();
        if (cur.data && !cur.error) {
          var nextStep = (cur.data.track_step || 1) + 1;
          nextSt = nextStatusKey(cur.data.status);
          if (nextStep > 5) { toast('Order already delivered!'); progressDone(); return; }
          var r = await sb().from('orders').update({ status: nextSt, track_step: nextStep }).eq('id', rawId);
          if (r.error) { console.warn('Supabase update error:', r.error); }
        }
      }
    } catch (e) { console.warn('Supabase advance failed:', e); }
  }
  var orders = JSON.parse(localStorage.getItem('th_orders_' + (user ? (user.id || 'local') : 'local')) || '[]');
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].id === rawId && orders[i].status !== 'delivered' && orders[i].status !== 'cancelled') {
      if (!nextSt) nextSt = nextStatusKey(orders[i].status);
      orders[i].status = nextSt;
      orders[i].track_step = (orders[i].track_step || 1) + 1;
      if (orders[i].track_step > 5) orders[i].track_step = 5;
      break;
    }
  }
  localStorage.setItem('th_orders_' + (user ? (user.id || 'local') : 'local'), JSON.stringify(orders));
  progressDone();
  renderOrdersPage();
  toast('Order ' + orderId + ' advanced to ' + (nextSt || 'next stage') + '!');
}

async function cancelOrder(orderId) {
  var rawId = parseInt(orderId.replace('TH-', ''), 10);
  if (!rawId) return;
  progressStart();
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        var r = await sb().from('orders').update({ status: 'cancelled', track_step: 0 }).eq('id', rawId);
        if (r.error) console.warn('Supabase cancel error:', r.error);
      }
    } catch (e) { console.warn('Supabase cancel failed:', e); }
  }
  var orders = JSON.parse(localStorage.getItem('th_orders_' + (user ? (user.id || 'local') : 'local')) || '[]');
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].id === rawId) { orders[i].status = 'cancelled'; orders[i].track_step = 0; break; }
  }
  localStorage.setItem('th_orders_' + (user ? (user.id || 'local') : 'local'), JSON.stringify(orders));
  progressDone();
  renderOrdersPage();
  toast('Order ' + orderId + ' cancelled');
}

function renderOrderCard(o, idx) {
  var statusColors = { pending:'status-pending', placed:'status-placed', confirmed:'status-confirmed', preparing:'status-preparing', ready:'status-ready', delivered:'status-delivered', cancelled:'status-cancelled' };
  var statusLabels = { pending:'Pending', placed:'Placed', confirmed:'Confirmed', preparing:'Preparing', ready:'Ready for Pickup', delivered:'Delivered', cancelled:'Cancelled' };
  var steps = ['Placed','Confirmed','Preparing','Ready','Delivered'];
  var trackHtml = '<div class="order-track">';
  for (var i = 0; i < steps.length; i++) {
    trackHtml += '<div class="ot-step"><div class="ot-dot' + (i < o.trackStep ? ' done' : (i === o.trackStep ? ' active' : '')) + '">' + (i < o.trackStep ? '\u2713' : (i + 1)) + '</div><div class="ot-label">' + steps[i] + '</div></div>';
  }
  trackHtml += '</div>';
  var itemsHtml = '';
  for (var j = 0; j < o.items.length; j++) itemsHtml += '<div class="oc-item-chip">' + o.items[j].name + ' x' + o.items[j].qty + '</div>';
  var totalStr = typeof o.total.toFixed === 'function' ? o.total.toFixed(2) : o.total;
  return '<div class="order-card" style="animation-delay:' + (idx * 0.06) + 's">' +
    '<div class="oc-top"><div><div class="oc-id">' + o.id + '</div><div class="oc-date">' + o.date + ' \u00b7 ' + (o.mode === 'delivery' ? 'Delivery' : 'Pickup') + '</div></div>' +
    '<span class="order-status ' + (statusColors[o.status] || 'status-placed') + '">' + (statusLabels[o.status] || o.status) + '</span></div>' +
    (o.status !== 'cancelled' && o.status !== 'delivered' ? trackHtml : '') +
    '<div class="oc-items">' + itemsHtml + '</div>' +
    '<div class="oc-footer"><div><div class="oc-total">\u20b1' + totalStr + '</div><div class="oc-stall">' + (o.stall || 'Tagbilaran Market') + '</div></div>' +
    '<div class="oc-actions">' +
    (o.status === 'delivered' ? '<button class="oc-btn oc-btn-outline" onclick="toast(\'Review coming soon!\')">Rate Order</button>' : '') +
    (o.status !== 'delivered' && o.status !== 'cancelled' ? '<button class="oc-btn oc-btn-outline" onclick="toast(\'Contacting seller...\')">Contact Seller</button>' : '') +
    (sellerMode && o.status !== 'delivered' && o.status !== 'cancelled' ?
      '<button class="oc-btn oc-btn-solid" onclick="advanceOrderStatus(\'' + o.id.replace(/'/g, "\\'") + '\')">Advance to ' + nextStatus(o.status) + '</button>' +
      '<button class="oc-btn oc-btn-outline" onclick="cancelOrder(\'' + o.id.replace(/'/g, "\\'") + '\')" style="color:var(--danger)">Cancel</button>' : '') +
    '</div></div></div>';
}

function renderChatPage() {
  document.getElementById('chatContent').innerHTML =
    '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:40px;color:var(--text-muted)">' +
    '<span style="font-size:48px;margin-bottom:12px">\ud83d\udcac</span>' +
    '<h3 style="font-family:Lora,serif;font-size:18px;color:var(--text-primary);margin-bottom:6px">Chat</h3>' +
    '<p style="font-size:14px;font-weight:600">This feature is coming soon, stay lang mo mga dawg!</p></div>';
}

async function loadConversations() {
  if (_supabaseReady && window.supabaseClient && user) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (!uid) return;
      var res = await sb().from('conversations').select('*').eq('buyer_id', uid).order('created_at', { ascending: false });
      if (res.data && res.data.length > 0) {
        activeChat = { id: res.data[0].id, seller: res.data[0].seller_name || 'Seller', area: '', online: true, unread: 0, messages: [], convId: res.data[0].id };
        document.getElementById('chatConvList').innerHTML = '<div class="chat-conv active" onclick="openChatConv(' + res.data[0].id + ')"><div class="cc-avi"><span class="cc-online"></span></div><div class="cc-info"><div class="cc-name">' + (res.data[0].seller_name || 'Seller') + '</div><div class="cc-last">Tap to view messages</div></div><div class="cc-meta"><span class="cc-time"></span></div></div>';
        openChatConv(res.data[0].id);
        return;
      }
    } catch (e) { console.warn('Supabase conversations failed:', e); }
  }
  var conversations = JSON.parse(localStorage.getItem('th_conversations_' + (user ? (user.id || 'local') : 'local')) || '[]');
  if (conversations.length > 0) {
    activeChat = { id: conversations[0].id, seller: 'Seller', area: '', online: true, unread: 0, messages: [], convId: conversations[0].id };
    document.getElementById('chatConvList').innerHTML = '<div class="chat-conv active" onclick="openChatConv(' + conversations[0].id + ')"><div class="cc-avi"><span class="cc-online"></span></div><div class="cc-info"><div class="cc-name">Seller</div><div class="cc-last">Tap to view messages</div></div><div class="cc-meta"><span class="cc-time"></span></div></div>';
    openChatConv(conversations[0].id);
  } else {
    document.getElementById('chatConvList').innerHTML = '<div class="empty-state" style="padding:30px"><p>No conversations yet</p></div>';
  }
}

async function openChatConv(convId) {
  if (chatUnsub) { chatUnsub(); chatUnsub = null; }
  if (_supabaseReady && window.supabaseClient && user) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      var mr = await sb().from('messages').select('*').eq('conversation_id', convId).order('created_at', { ascending: true });
      var msgs = (mr.data || []).map(function(m) {
        return { sender: m.sender_id === uid ? 'me' : 'seller', text: m.text, time: new Date(m.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) };
      });
      activeChat = { id: convId, seller: 'Seller', area: '', online: true, unread: 0, messages: msgs, convId: convId };
      document.getElementById('chatWindow').innerHTML = renderChatWindow(activeChat);
      scrollChatToBottom();
      if (_supabaseReady && window.supabaseClient) {
        chatUnsub = window.supabaseClient.channel('chat-' + convId)
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'conversation_id=eq.' + convId }, function(payload) {
            var m = payload.new;
            if (m.sender_id !== uid) {
              var el = document.getElementById('chatMsgs');
              if (!el) return;
              var d = document.createElement('div');
              d.className = 'chat-msg recv';
              d.style.animation = 'fadeUp .25s ease both';
              d.innerHTML = '<div class="msg-bubble">' + m.text + '</div><div class="msg-time">just now</div>';
              el.appendChild(d);
              scrollChatToBottom();
            }
          }).subscribe();
      }
      return;
    } catch (e) { console.warn('Supabase chat failed:', e); }
  }
  var allMsgs = JSON.parse(localStorage.getItem('th_messages_' + (user ? (user.id || 'local') : 'local')) || '[]');
  var convMsgs = allMsgs.filter(function(m) { return m.conversation_id === convId; }).sort(function(a, b) { return new Date(a.created_at) - new Date(b.created_at); });
  var msgs = convMsgs.map(function(m) {
    return { sender: m.sender_id === (user ? user.id : null) ? 'me' : 'seller', text: m.text, time: new Date(m.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) };
  });
  activeChat = { id: convId, seller: 'Seller', area: '', online: true, unread: 0, messages: msgs, convId: convId };
  document.getElementById('chatWindow').innerHTML = renderChatWindow(activeChat);
  scrollChatToBottom();
}

function renderChatWindow(conv) {
  var msgsHtml = '';
  for (var i = 0; i < conv.messages.length; i++) {
    var m = conv.messages[i];
    msgsHtml += '<div class="chat-msg ' + (m.sender === 'me' ? 'sent' : 'recv') + '"><div class="msg-bubble">' + m.text + '</div><div class="msg-time">' + m.time + '</div></div>';
  }
  return '<div class="chat-win-head"><div class="cw-avi"></div>' +
    '<div><div class="cw-name">Seller \u00b7 Tagbilaran</div><div class="cw-status"><span class="online-dot"></span>Online now</div></div>' +
    '<div class="cw-actions"><button class="cw-btn" title="Call seller" onclick="toast(\'Calling seller...\')">' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button></div></div>' +
    '<div class="chat-messages" id="chatMsgs"><div class="chat-date-div">Today</div>' + msgsHtml + '</div>' +
    '<div class="chat-input-area"><textarea class="chat-input" id="chatInput" placeholder="Type a message..." rows="1"' +
    ' onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();sendChatMsg()}"' +
    ' oninput="autoResizeChat(this)"></textarea>' +
    '<button class="chat-send" title="Send" onclick="sendChatMsg()">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>';
}
function autoResizeChat(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 100) + 'px'; }

async function sendChatMsg() {
  var input = document.getElementById('chatInput');
  var text = input ? input.value.trim() : '';
  if (!text || !activeChat || !activeChat.convId) return;
  var now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  input.value = ''; input.style.height = 'auto';
  var el = document.getElementById('chatMsgs');
  if (el) {
    var d = document.createElement('div');
    d.className = 'chat-msg sent';
    d.innerHTML = '<div class="msg-bubble">' + text + '</div><div class="msg-time">' + now + '</div>';
    el.appendChild(d);
    scrollChatToBottom();
  }
  if (_supabaseReady && window.supabaseClient && user) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (uid) {
        await sb().from('messages').insert({ conversation_id: activeChat.convId, sender_id: uid, text: text });
        return;
      }
    } catch (e) { console.warn('Supabase sendMsg failed:', e); }
  }
  var allMsgs = JSON.parse(localStorage.getItem('th_messages_' + (user ? (user.id || 'local') : 'local')) || '[]');
  allMsgs.push({ id: _nextMsgId++, conversation_id: activeChat.convId, sender_id: user ? user.id || 'local' : 'local', text: text, created_at: new Date().toISOString() });
  localStorage.setItem('th_messages_' + (user ? (user.id || 'local') : 'local'), JSON.stringify(allMsgs));
}
function scrollChatToBottom() { setTimeout(function() { var m = document.getElementById('chatMsgs'); if (m) m.scrollTop = m.scrollHeight; }, 60); }
function filterChats(q) {
  var el = document.getElementById('chatConvList');
  if (!el) return;
  el.innerHTML = activeChat
    ? '<div class="chat-conv active" onclick="openChatConv(' + activeChat.convId + ')"><div class="cc-avi"><span class="cc-online"></span></div><div class="cc-info"><div class="cc-name">Seller</div><div class="cc-last">Conversation</div></div></div>'
    : '<div class="empty-state" style="padding:30px"><p>No conversations</p></div>';
}

async function openChatWithSeller(stallName, stallId) {
  if (_supabaseReady && window.supabaseClient) {
    try {
      var session = await sb().auth.getSession();
      var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
      if (!uid) { openLogin(); return; }
      var res = await sb().from('conversations').select('id').eq('buyer_id', uid).eq('stall_id', stallId).maybeSingle();
      if (res.data) {
        if (chatUnsub) { chatUnsub(); chatUnsub = null; }
        activeChat = { convId: res.data.id };
        switchPage('chat', document.getElementById('tnav-chat'));
        setTimeout(function() { openChatConv(res.data.id); }, 200);
      } else {
        await sb().from('conversations').insert({ buyer_id: uid, seller_name: stallName, stall_id: stallId, stall_name: stallName });
        var convRes = await sb().from('conversations').select('id').eq('buyer_id', uid).eq('stall_id', stallId).maybeSingle();
        if (convRes.data) {
          activeChat = { convId: convRes.data.id };
        }
        toast('Starting new conversation...');
        switchPage('chat', document.getElementById('tnav-chat'));
      }
      return;
    } catch (e) { console.warn('Supabase chatWithSeller failed:', e); }
  }
  var conversations = JSON.parse(localStorage.getItem('th_conversations_' + (user.id || 'local')) || '[]');
  var existing = null;
  for (var i = 0; i < conversations.length; i++) {
    if (conversations[i].stall_id === stallId) { existing = conversations[i]; break; }
  }
  if (existing) {
    activeChat = { convId: existing.id };
    switchPage('chat', document.getElementById('tnav-chat'));
    setTimeout(function() { openChatConv(existing.id); }, 200);
  } else {
    var conv = { id: _nextConvId++, stall_id: stallId, created_at: new Date().toISOString() };
    conversations.push(conv);
    localStorage.setItem('th_conversations_' + (user.id || 'local'), JSON.stringify(conversations));
    activeChat = { convId: conv.id };
    toast('Starting new conversation...');
    switchPage('chat', document.getElementById('tnav-chat'));
  }
}

function renderAccountPage() {
  var container = document.getElementById('accountContent');
  if (!user) {
    container.innerHTML = '<div class="account-page"><div class="acct-guest">' +
      '<div class="acct-guest-icon-wrap"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--brand-mid)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>' +
      '<div class="acct-guest-title">Welcome to TindaHub!</div>' +
      '<div class="acct-guest-sub">Login or register to access your account, track orders, and chat with sellers in Tagbilaran City.</div>' +
      '<button class="btn-login-big" onclick="openLogin()">Login / Register</button></div>' +
      '<div class="acct-section"><div class="acct-sect-head"><svg class="ash-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span class="ash-title">About TindaHub</span></div>' +
      '<div class="acct-link"><svg class="acct-link-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
      '<div><div class="acct-link-text">Tagbilaran City, Bohol</div><div class="acct-link-sub">Serving local palengke buyers and sellers</div></div><span class="acct-link-arrow">\u203a</span></div>' +
      '<div class="acct-link" onclick="toast(\'Support: 0917-TINDAHUB\')"><svg class="acct-link-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
      '<div><div class="acct-link-text">Customer Support</div><div class="acct-link-sub">Available 6AM to 8PM daily</div></div><span class="acct-link-arrow">\u203a</span></div></div></div>';
    return;
  }
  var totalOrders = 0;
  var deliveredOrders = 0;
  var totalSpent = 0;
  var rawOrders = [];
  if (_supabaseReady && window.supabaseClient) {
    (async function() {
      try {
        var session = await sb().auth.getSession();
        var uid = session && session.data && session.data.session ? session.data.session.user.id : null;
        if (uid) {
          var res = await sb().from('orders').select('*').eq('user_id', uid);
          if (res.data) rawOrders = res.data;
        }
      } catch (e) {}
    })();
  }
  var stored = JSON.parse(localStorage.getItem('th_orders_' + (user.id || 'local')) || '[]');
  if (rawOrders.length === 0) rawOrders = stored;
  totalOrders = rawOrders.length;
  for (var i = 0; i < rawOrders.length; i++) { if (rawOrders[i].status === 'delivered') deliveredOrders++; }
  for (var j = 0; j < rawOrders.length; j++) totalSpent += parseFloat(rawOrders[j].total) || 0;
  var name = userProfile ? userProfile.full_name : (user.email ? user.email.split('@')[0] : 'User');
  container.innerHTML = '<div class="account-page">' +
    '<div class="acct-profile-card"><div class="apc-avatar"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>' +
    '<div class="apc-info"><div class="apc-name">' + name + '</div><div class="apc-role">' + user.email + '</div><div class="apc-email">Tagbilaran City, Bohol</div>' +
    '<span class="apc-badge">' + (userProfile && userProfile.role === 'seller' ? 'Seller Account' : 'Buyer Account') + '</span></div></div>' +
    '<div class="acct-stats-grid"><div class="astat-card"><div class="astat-val">' + totalOrders + '</div><div class="astat-lbl">Total Orders</div></div>' +
    '<div class="astat-card"><div class="astat-val">' + deliveredOrders + '</div><div class="astat-lbl">Delivered</div></div>' +
    '<div class="astat-card"><div class="astat-val">\u20b1' + totalSpent.toFixed(0) + '</div><div class="astat-lbl">Total Spent</div></div></div>' +
    '<div class="acct-section"><div class="acct-sect-head"><svg class="ash-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="ash-title">My Shopping</span></div>' +
    '<div class="acct-link" onclick="openCart()"><svg class="acct-link-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
    '<div><div class="acct-link-text">My Cart</div><div class="acct-link-sub">' + cartCount + ' item' + (cartCount !== 1 ? 's' : '') + ' in cart</div></div><span class="acct-link-arrow">\u203a</span></div>' +
    '<div class="acct-link" onclick="switchPage(\'orders\',document.getElementById(\'tnav-orders\'))"><svg class="acct-link-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' +
    '<div><div class="acct-link-text">My Orders</div><div class="acct-link-sub">' + totalOrders + ' orders</div></div><span class="acct-link-arrow">\u203a</span></div>' +
    '<div class="acct-link" onclick="toast(\'Reviews coming soon!\')"><svg class="acct-link-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
    '<div><div class="acct-link-text">My Reviews</div><div class="acct-link-sub">Rate your past orders</div></div><span class="acct-link-arrow">\u203a</span></div></div>' +
    '<div class="acct-section"><div class="acct-sect-head"><svg class="ash-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg><span class="ash-title">Account Settings</span></div>' +
    '<div class="acct-link danger" onclick="doLogout()"><svg class="acct-link-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
    '<div><div class="acct-link-text">Logout</div></div><span class="acct-link-arrow">\u203a</span></div></div></div>';
}

function openNotifs() {
  document.getElementById('notifBg').classList.add('open');
  document.getElementById('notifPanel').classList.add('open');
  document.getElementById('notifBadge').textContent = '0';
  document.getElementById('notifBody').innerHTML = '<div class="empty-state"><span>\ud83d\udd14</span><p>No notifications yet</p></div>';
}
function closeNotifs() {
  document.getElementById('notifBg').classList.remove('open');
  document.getElementById('notifPanel').classList.remove('open');
}

function openNearbyMap() {
  document.getElementById('mapBg').classList.add('open');
  document.getElementById('mapModal').classList.add('open');
  var mapBody = document.getElementById('mapBody');
  var marketsHtml = '';
  for (var i = 0; i < TAGBILARAN_MARKETS.length; i++) {
    var m = TAGBILARAN_MARKETS[i];
    marketsHtml += '<div class="market-card" onclick="filterBarangay(\'' + m.area.replace(/'/g, "\\'") + '\');closeNearbyMap()">' +
      '<div class="mc-img-wrap"><img class="mc-img" src="' + m.img + '" alt="' + m.name + '" onerror="this.nextElementSibling.style.display=\'flex\'">' +
      '<div class="mc-img-fallback" style="display:none;background:' + m.accent + '20">' +
      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="' + m.accent + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>' +
      '<div class="mc-overlay" style="background:linear-gradient(to top,' + m.accent + 'ee 0%,' + m.accent + '44 50%,transparent 100%)"></div>' +
      '<div class="mc-badge">' + m.badge + '</div></div>' +
      '<div class="mc-body"><div class="mc-name">' + m.name + '</div><div class="mc-addr">' + m.address + '</div><div class="mc-desc">' + m.desc + '</div>' +
      '<div class="mc-footer"><span class="mc-stalls">' + m.stalls + ' stalls</span><span class="mc-cta">Browse market \u203a</span></div></div></div>';
  }
  mapBody.innerHTML = '<div id="leafletMap" style="height:380px;width:100%;border-radius:var(--radius-lg);overflow:hidden"></div>' +
    '<div class="map-markets-list"><div class="mml-title">Tagbilaran City Markets</div><div class="market-cards-grid">' + marketsHtml + '</div></div>';
  if (typeof L !== 'undefined') {
    var map = L.map('leafletMap', { attributionControl: false }).setView([9.6598, 123.8604], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);
    for (var j = 0; j < TAGBILARAN_MARKETS.length; j++) {
      var mk = TAGBILARAN_MARKETS[j];
      var icon = L.divIcon({
        className: 'market-pin',
        html: '<div class="mpin" style="background:' + mk.accent + ';box-shadow:0 2px 8px ' + mk.accent + '88"><span>' + mk.name[0] + '</span></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker([mk.lat, mk.lng], { icon: icon })
        .addTo(map)
        .bindPopup('<div style="font-weight:800;font-size:13px;font-family:Nunito,sans-serif;color:#1a2e1a">' + mk.name + '</div><div style="font-size:11px;color:#555;font-family:Nunito,sans-serif">' + mk.address + '</div><div style="margin-top:4px"><span style="background:' + mk.accent + ';color:#fff;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;font-family:Nunito,sans-serif">' + mk.badge + '</span></div>');
    }
    setTimeout(function() { map.invalidateSize(); }, 300);
  }
}
function closeNearbyMap() {
  document.getElementById('mapBg').classList.remove('open');
  document.getElementById('mapModal').classList.remove('open');
}
function filterBarangay(area) {
  toast('Showing stalls in ' + area + ', Tagbilaran');
  var filtered = [];
  for (var i = 0; i < allProducts.length; i++) { if (allProducts[i].area === area) filtered.push(allProducts[i]); }
  if (filtered.length > 0) { renderFresh(filtered); renderDelivery(filtered); }
  switchPage('home', document.getElementById('tnav-home'));
}

function liveSearch(q) {
  clearTimeout(searchDebounce);
  var dd = document.getElementById('searchDrop');
  if (!q.trim()) { dd.classList.remove('open'); return; }
  searchDebounce = setTimeout(function() {
    var results = [];
    var ql = q.toLowerCase();
    for (var i = 0; i < allProducts.length && results.length < 8; i++) {
      var p = allProducts[i];
      if (p.product_name.toLowerCase().indexOf(ql) >= 0 || p.stall_name.toLowerCase().indexOf(ql) >= 0 || p.category.toLowerCase().indexOf(ql) >= 0 || ((p.area || '').toLowerCase().indexOf(ql) >= 0)) {
        results.push(p);
      }
    }
    var html = '';
    if (results.length > 0) {
      for (var j = 0; j < results.length; j++) {
        var r = results[j];
        html += '<div class="sd-item" onclick="searchPick(' + r.product_id + ')">' +
          '<img class="sd-emoji" src="' + getProductImage(r) + '" alt="' + r.product_name + '">' +
          '<div><div class="sd-name">' + r.product_name + '</div><div class="sd-meta">\u20b1' + r.price + '/' + r.unit + ' \u00b7 ' + r.stall_name + ' \u00b7 ' + (r.area || 'Tagbilaran') + '</div></div></div>';
      }
    } else {
      html = '<div class="sd-item" style="color:var(--text3);cursor:default">No results for "' + q + '"</div>';
    }
    dd.innerHTML = html;
    dd.classList.add('open');
  }, 200);
}
function searchPick(pid) {
  document.getElementById('searchDrop').classList.remove('open');
  document.getElementById('tbSearch').value = '';
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].product_id == pid) {
      switchPage('home', document.getElementById('tnav-home'));
      loadSelectedProduct(allProducts[i]);
      return;
    }
  }
}

function filterCat(cat, pillEl, sbEl) {
  activeCategory = cat;
  var pills = document.querySelectorAll('.pill');
  for (var i = 0; i < pills.length; i++) pills[i].classList.remove('active');
  if (pillEl) { pillEl.classList.add('active'); }
  else {
    var m = document.querySelector('.pill[data-cat="' + cat + '"]');
    if (m) m.classList.add('active');
    else { var f = document.querySelector('.pill[data-cat="all"]'); if (f) f.classList.add('active'); }
  }
  document.getElementById('freshGrid').innerHTML = '<div class="skeleton sk-card"></div><div class="skeleton sk-card"></div>';
  document.getElementById('deliveryGrid').innerHTML = '<div class="skeleton sk-row"></div><div class="skeleton sk-row"></div><div class="skeleton sk-row"></div><div class="skeleton sk-row"></div>';
  progressStart();
  setTimeout(function() {
    var filtered = cat === 'all' ? allProducts : [];
    if (cat !== 'all') { for (var i = 0; i < allProducts.length; i++) { if (allProducts[i].category === cat) filtered.push(allProducts[i]); } }
    var display = filtered.length > 0 ? filtered : allProducts;
    renderFresh(display);
    renderDelivery(display);
    var allSec = document.getElementById('allSection');
    var allGrid = document.getElementById('allGrid');
    if (cat !== 'all' && filtered.length > 0) {
      allSec.style.display = 'block';
      var meta = CATEGORY_META[cat] || { label: cat, desc: filtered.length + ' products available', color: 'rgba(14,60,30,.55)' };
      var imgUrl = getCategoryImage(cat);
      document.getElementById('allTitle').textContent = '';
      document.getElementById('allCount').textContent = '';
      var html = '<div class="cat-banner" style="background-image:url(\'' + imgUrl + '\')">' +
        '<div class="cat-banner-overlay" style="background:' + meta.color + '">' +
        '<div class="cat-banner-content"><h2 class="cat-banner-title">' + meta.label + '</h2>' +
        '<p class="cat-banner-desc">' + meta.desc + '</p>' +
        '<span class="cat-banner-count">' + filtered.length + ' products available</span></div></div></div>';
      for (var j = 0; j < filtered.length; j++) {
        var p = filtered[j];
        html += '<div class="all-card" onclick="loadSelectedProduct(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">' +
          '<img class="all-emoji" src="' + getProductImage(p) + '" alt="' + p.product_name + '" onerror="this.src=\'' + getCategoryImage(p.category) + '\'">' +
          '<div class="all-info"><div class="all-name">' + p.product_name + '</div><div class="all-price">\u20b1' + p.price + '/' + p.unit + '</div>' +
          '<div class="all-stall">\ud83d\udccd ' + p.stall_name + ' \u00b7 ' + (p.area || 'Tagbilaran') + '</div></div>' +
          '<button class="btn-nb" onclick="event.stopPropagation(); addToCart(' + p.product_id + ', this)">ADD</button></div>';
      }
      allGrid.innerHTML = html;
    } else {
      allSec.style.display = 'none';
    }
    progressDone();
    if (cat !== 'all') toast('Showing ' + cat + ' \u2014 ' + filtered.length + ' products');
  }, 460);
}

function sbNav(el, type) {
  var items = document.querySelectorAll('.sb-item');
  for (var i = 0; i < items.length; i++) items[i].classList.remove('active');
  el.classList.add('active');
  switchPage('home', document.getElementById('tnav-home'));
  if (type === 'fresh') filterCat('all', null);
  else if (type === 'toprated') { filterCat('all', null); toast('Showing top-rated stalls'); }
  else if (type === 'delivery') { filterCat('all', null); toast('Fast delivery stalls in Tagbilaran'); }
}

function showAllProducts() {
  activeCategory = 'all';
  var pills = document.querySelectorAll('.pill');
  for (var i = 0; i < pills.length; i++) pills[i].classList.remove('active');
  var m = document.querySelector('.pill[data-cat="all"]');
  if (m) m.classList.add('active');
  renderFresh(allProducts);
  renderDelivery(allProducts);
  var allSec = document.getElementById('allSection');
  var allGrid = document.getElementById('allGrid');
  allSec.style.display = 'block';
  document.getElementById('allTitle').textContent = 'All Products';
  document.getElementById('allCount').textContent = allProducts.length + ' items';
  var groups = {};
  for (var j = 0; j < allProducts.length; j++) {
    var area = allProducts[j].area || 'Tagbilaran';
    if (!groups[area]) groups[area] = [];
    groups[area].push(allProducts[j]);
  }
  var sortedAreas = Object.keys(groups).sort();
  var html = '';
  for (var a = 0; a < sortedAreas.length; a++) {
    var areaName = sortedAreas[a];
    var areaProducts = groups[areaName];
    html += '<div class="area-group"><div class="area-header"><span class="area-pin">\ud83d\udccd</span><span class="area-name">' + areaName + '</span><span class="area-count">' + areaProducts.length + ' product' + (areaProducts.length !== 1 ? 's' : '') + '</span></div>';
    for (var j = 0; j < areaProducts.length; j++) {
      var p = areaProducts[j];
      html += '<div class="all-card" onclick="loadSelectedProduct(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">' +
        '<img class="all-emoji" src="' + getProductImage(p) + '" alt="' + p.product_name + '" onerror="this.src=\'' + getCategoryImage(p.category) + '\'">' +
        '<div class="all-info"><div class="all-name">' + p.product_name + '</div><div class="all-price">\u20b1' + p.price + '/' + p.unit + '</div>' +
        '<div class="all-stall">' + p.stall_name + ' \u00b7 ' + (p.area || 'Tagbilaran') + '</div></div>' +
        '<button class="btn-nb" onclick="event.stopPropagation(); addToCart(' + p.product_id + ', this)">ADD</button></div>';
    }
    html += '</div>';
  }
  allGrid.innerHTML = html;
}

function openLocationModal() {
  var curLoc = document.getElementById('locLabel') ? document.getElementById('locLabel').textContent : '';
  var html = '<div class="loc-grid">';
  for (var i = 0; i < LOCATIONS.length; i++) {
    html += '<div class="loc-opt' + (LOCATIONS[i] === curLoc ? ' cur' : '') + '" onclick="setLocation(\'' + LOCATIONS[i].replace(/'/g, "\\'") + '\')">\ud83d\udccd ' + LOCATIONS[i] + '</div>';
  }
  html += '</div>';
  document.getElementById('locBody').innerHTML = html;
  document.getElementById('locBg').classList.add('open');
  document.getElementById('locModal').classList.add('open');
}
function closeLocationModal() {
  document.getElementById('locBg').classList.remove('open');
  document.getElementById('locModal').classList.remove('open');
}
function setLocation(loc) {
  document.getElementById('locLabel').textContent = loc;
  closeLocationModal();
  toast('Location set to ' + loc);
}

function loadTicker() {
  var doubled = TICKER_DATA.concat(TICKER_DATA);
  var html = '';
  for (var i = 0; i < doubled.length; i++) html += '<span>' + doubled[i] + '</span>';
  document.getElementById('tickerTrack').innerHTML = html;
}

function updateAvatarUI() {
  var el = document.getElementById('avatarName');
  if (!el) return;
  if (!user) { el.textContent = 'Guest'; return; }
  el.textContent = userProfile ? userProfile.full_name : (user.email ? user.email.split('@')[0] : 'User');
}

function openLogin() {
  document.getElementById('loginBg').classList.add('open');
  document.getElementById('loginModal').classList.add('open');
}
function closeLogin() {
  document.getElementById('loginBg').classList.remove('open');
  document.getElementById('loginModal').classList.remove('open');
  hideAuthAlert();
}
var authTab = 'login';
function switchAuthTab(tab) {
  authTab = tab;
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabReg').classList.toggle('active', tab === 'register');
  hideAuthAlert();
}
function showAuthAlert(msg, type) {
  if (!type) type = 'err';
  var el = document.getElementById('authAlert');
  el.textContent = msg;
  el.className = 'auth-alert ' + type;
  el.style.display = 'block';
}
function hideAuthAlert() { var el = document.getElementById('authAlert'); if (el) el.style.display = 'none'; }
function setRole(role) {
  document.getElementById('reg_role').value = role;
  document.getElementById('rp_buyer').classList.toggle('selected', role === 'buyer');
  document.getElementById('rp_seller').classList.toggle('selected', role === 'seller');
}

async function doLogin() {
  hideAuthAlert();
  var emailEl = document.getElementById('li_email');
  var email = emailEl ? emailEl.value.trim() : '';
  var passEl = document.getElementById('li_pass');
  var pass = passEl ? passEl.value : '';
  if (!email || !pass) { showAuthAlert('Please fill in all fields.'); return; }
  var btn = document.getElementById('loginBtn');
  btnLoad(btn, 'Logging in...');
  progressStart();
  if (_supabaseReady && window.supabaseClient) {
    try {
      var result = await sb().auth.signInWithPassword({ email: email, password: pass });
      if (result.error) { showAuthAlert(result.error.message); progressDone(); btnRestore(btn); return; }
      progressDone();
      btnRestore(btn);
      closeLogin();
      return;
    } catch (e) { showAuthAlert('Login failed.'); progressDone(); btnRestore(btn); return; }
  }
  var stored = JSON.parse(localStorage.getItem('th_user') || '{}');
  if (!stored.id) {
    stored = { id: 'local-' + Date.now(), email: email, full_name: email.split('@')[0], role: 'buyer', created_at: new Date().toISOString() };
  }
  user = stored;
  userProfile = { full_name: stored.full_name, role: stored.role };
  localStorage.setItem('th_user', JSON.stringify(stored));
  updateAvatarUI();
  loadCart();
  toast('Welcome back, ' + userProfile.full_name + '!');
  closeLogin();
  progressDone();
  btnRestore(btn);
}

async function doRegister() {
  hideAuthAlert();
  var getName = function(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
  var name = getName('reg_name');
  var email = getName('reg_email');
  var phone = getName('reg_phone');
  var passEl = document.getElementById('reg_pass');
  var pass = passEl ? passEl.value : '';
  var confEl = document.getElementById('reg_conf');
  var conf = confEl ? confEl.value : '';
  var roleEl = document.getElementById('reg_role');
  var role = roleEl ? roleEl.value : 'buyer';
  if (!name || !email || !pass) { showAuthAlert('Please fill in all required fields.'); return; }
  if (pass.length < 6) { showAuthAlert('Password must be at least 6 characters.'); return; }
  if (pass !== conf) { showAuthAlert('Passwords do not match.'); return; }
  var btn = document.getElementById('regBtn');
  btnLoad(btn, 'Creating account...');
  progressStart();
  if (_supabaseReady && window.supabaseClient) {
    try {
      var result = await sb().auth.signUp({ email: email, password: pass, options: { data: { full_name: name, role: role } } });
      if (result.error) { showAuthAlert(result.error.message); progressDone(); btnRestore(btn); return; }
      progressDone();
      btnRestore(btn);
      showAuthAlert('Account created! Check your email to confirm.', 'ok');
      setTimeout(function() { closeLogin(); }, 2000);
      return;
    } catch (e) { showAuthAlert('Registration failed.'); progressDone(); btnRestore(btn); return; }
  }
  var stored = { id: 'local-' + Date.now(), email: email, full_name: name, role: role, phone: phone, created_at: new Date().toISOString() };
  user = stored;
  userProfile = { full_name: name, role: role };
  localStorage.setItem('th_user', JSON.stringify(stored));
  updateAvatarUI();
  loadCart();
  toast('Welcome to TindaHub, ' + name + '!');
  closeLogin();
  progressDone();
  btnRestore(btn);
}

async function doLogout() {
  progressStart();
  if (_supabaseReady && window.supabaseClient) {
    try { await sb().auth.signOut(); } catch (e) {}
  }
  user = null; userProfile = null; cartItems = []; cartCount = 0;
  localStorage.removeItem('th_user');
  updateAvatarUI(); updateCartBadge(0);
  toast('Logged out. See you next time!');
  switchPage('home', document.getElementById('tnav-home'));
  progressDone();
}

function attachAuthListener() {
  if (!window.supabaseClient) return;
  window.supabaseClient.auth.onAuthStateChange(function(event, session) {
    if (event === 'SIGNED_IN' && session && session.user) {
      user = session.user;
      window.supabaseClient.from('profiles').select('*').eq('id', session.user.id).single().then(function(r) {
        userProfile = r.data;
        updateAvatarUI();
        loadCart();
      }).catch(function() {});
    } else if (event === 'SIGNED_OUT') {
      user = null; userProfile = null; cartItems = []; cartCount = 0;
      updateAvatarUI(); updateCartBadge(0);
    }
  });
}

var MOON_SVG = '<svg id="darkIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
var SUN_SVG = '<svg id="darkIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function toggleDarkMode() {
  var isDark = document.body.classList.toggle('dark');
  var btn = document.getElementById('darkToggle');
  if (btn) btn.innerHTML = isDark ? SUN_SVG : MOON_SVG;
  if (btn) btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  localStorage.setItem('tindahub_dark', isDark ? '1' : '0');
  toast(isDark ? 'Dark mode on' : 'Light mode on');
}
function initDarkMode() {
  var saved = localStorage.getItem('tindahub_dark');
  if (saved === '1') {
    document.body.classList.add('dark');
    var btn = document.getElementById('darkToggle');
    if (btn) { btn.innerHTML = SUN_SVG; btn.title = 'Switch to Light Mode'; }
  }
}

document.addEventListener('click', function(e) {
  var wrap = document.querySelector('.topbar-search');
  if (!wrap || !wrap.contains(e.target)) {
    var dd = document.getElementById('searchDrop');
    if (dd) dd.classList.remove('open');
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  var lm = document.getElementById('loginModal');
  if (lm && lm.classList.contains('open')) {
    authTab === 'login' ? doLogin() : doRegister();
  }
});

function hideSplash() {
  var el = document.getElementById('splash');
  if (el) el.classList.add('out');
}

window.addEventListener('DOMContentLoaded', async function() {
  try {
    initDarkMode();
    setGreeting();
    var splashTimer = setTimeout(hideSplash, 3000);
    if (!window.supabase || !window.supabase.createClient) {
      console.warn('supabase-js not loaded from CDN - using localStorage fallback');
    } else {
      try {
        await initSupabase();
      } catch (e) {
        console.warn('Supabase init threw:', e);
      }
      console.log('Supabase status - ready:', _supabaseReady, 'client:', !!window.supabaseClient);
      if (window.supabaseClient) {
        try { attachAuthListener(); } catch (e) { console.warn('auth listener:', e); }
        try {
          var session = await sb().auth.getSession();
          console.log('Session check:', session ? 'got response' : 'null', session?.data?.session ? 'has session' : 'no session');
          if (session && session.data && session.data.session && session.data.session.user) {
            user = session.data.session.user;
            console.log('User restored from session:', user.id);
            try {
              var pr = await sb().from('profiles').select('*').eq('id', user.id).single();
              userProfile = pr.data;
              console.log('Profile loaded:', userProfile ? userProfile.full_name : 'none');
            } catch (e) { console.warn('Profile load error:', e); }
            updateAvatarUI();
          }
        } catch (e) { console.warn('Session restore error:', e); }
      }
    }
    try {
      loadProducts();
      loadTicker();
      if (user) loadCart();
    } catch (e) { console.warn('Data load error:', e); }
    clearTimeout(splashTimer);
    hideSplash();
  } catch (e) {
    console.warn('FATAL init error:', e.message, e.stack);
    var el = document.getElementById('splash');
    if (el) el.classList.add('out');
  }
});
