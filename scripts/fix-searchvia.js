const fs = require('fs');
let s = fs.readFileSync('src/js/main.js', 'utf8');

const target =
  "const [serpRes, ebayRes] = await Promise.all([\r\n" +
  '      fetch("/api/search?q=" + encodeURIComponent(query)).catch(() => null),\r\n' +
  '      fetch("/api/ebay?q=" + encodeURIComponent(query)).catch(() => null),\r\n' +
  '\t      fetch("/api/amazon?q=" + encodeURIComponent(query)).catch(() => null),\r\n' +
  '\t      fetch("/api/amazon?q=" + encodeURIComponent(query)).catch(() => null),\r\n' +
  "    ]);";

const replace =
  "const [serpRes, ebayRes, amazonRes] = await Promise.all([\r\n" +
  '      fetch("/api/search?q=" + encodeURIComponent(query)).catch(() => null),\r\n' +
  '      fetch("/api/ebay?q=" + encodeURIComponent(query)).catch(() => null),\r\n' +
  '      fetch("/api/amazon?q=" + encodeURIComponent(query)).catch(() => null),\r\n' +
  "    ]);";

if (s.includes(target)) {
  s = s.replace(target, replace);
  console.log('✅ Fixed Promise.all');
} else {
  console.log('❌ Not found - trying backtick version');
  // Try with template literals
  const t2 = "const [serpRes, ebayRes] = await Promise.all([";
  const idx = s.indexOf(t2);
  if (idx >= 0) {
    // Find the end of this block
    const endIdx = s.indexOf("]);", idx) + 3;
    const block = s.substring(idx, endIdx);
    console.log('Block found:', JSON.stringify(block).slice(0, 200));

    // Manually reconstruct with 3 calls
    const newBlock =
      "const [serpRes, ebayRes, amazonRes] = await Promise.all([\r\n" +
      '      fetch(`/api/search?q=${encodeURIComponent(query)}`).catch(() => null),\r\n' +
      '      fetch(`/api/ebay?q=${encodeURIComponent(query)}`).catch(() => null),\r\n' +
      '      fetch(`/api/amazon?q=${encodeURIComponent(query)}`).catch(() => null),\r\n' +
      "    ]);";

    s = s.substring(0, idx) + newBlock + s.substring(endIdx);
    console.log('✅ Replaced via index');
  }
}

fs.writeFileSync('src/js/main.js', s, 'utf8');
try { require('child_process').execSync('node --check src/js/main.js', {stdio:'inherit'}); console.log('✅ Syntax OK'); } catch(e) { console.log('❌', e.message); }
