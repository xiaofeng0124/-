const fs = require('fs');
let s = fs.readFileSync('src/js/main.js', 'utf8');

// Find the non-logged-in section by markers
const marker = 'favoritesBtn2';
const favIdx = s.indexOf(marker);
const secStart = s.lastIndexOf('<div class="history-wrap desktop-only">', favIdx);
const secEnd = s.indexOf(';\n    document.getElementById("loginBtn")', favIdx);

if (secStart < 0 || secEnd < 0) { console.log('not found', secStart, secEnd); process.exit(1); }

const section = s.substring(secStart, secEnd);

// Get the history-wrap block (from its opening div to its closing div)
const histMatch = section.match(/^(<div class="history-wrap desktop-only">[\s\S]*?<\/div>)\s*/);
const couponMatch = section.match(/<button class="btn-ghost desktop-only" id="couponsNavBtn">[^<]*<\/button>/);
const favMatch = section.match(/<button class="btn-ghost desktop-only" id="favoritesBtn2">[^<]*<\/button>/);

if (!histMatch || !couponMatch || !favMatch) {
  console.log('missing parts', {hist: !!histMatch, coupon: !!couponMatch, fav: !!favMatch});
  process.exit(1);
}

// Rest of section after favorites (premium + login)
const afterFav = section.substring(section.indexOf(favMatch[0]) + favMatch[0].length);

// New order: coupons, favorites, history, rest
const newSection = couponMatch[0] + '\n' + favMatch[0] + '\n' + histMatch[0] + afterFav;
s = s.substring(0, secStart) + newSection + s.substring(secEnd);

fs.writeFileSync('src/js/main.js', s, 'utf8');
try { require('child_process').execSync('node --check src/js/main.js', {stdio:'inherit'}); console.log('✅'); } catch(e) { console.log('❌', e.message); }
