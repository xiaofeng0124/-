const fs = require('fs');

const files = [
  'blog/amazon-vs-walmart-2026.html',
  'blog/best-budget-electronics-2026.html',
  'blog/best-time-to-buy-seasonal-calendar.html',
  'blog/how-to-spot-fake-discounts.html',
  'blog/price-alert-strategies.html'
];

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let changes = [];

  // Fix emoji divs - these are category icons on blog article pages
  if (html.includes('馃帶')) { html = html.split('馃帶').join('📋'); changes.push('馃帶->📋'); }
  if (html.includes('馃攰')) { html = html.split('馃攰').join('💪'); changes.push('馃攰->💪'); }
  if (html.includes('馃挕')) { html = html.split('馃挕').join('🎉'); changes.push('馃挕->🎉'); }
  if (html.includes('馃摫')) { html = html.split('馃摫').join('🔍'); changes.push('馃摫->🔍'); }
  if (html.includes('馃毄')) { html = html.split('馃毄').join('🛒'); changes.push('馃毄->🛒'); }
  if (html.includes('馃')) { html = html.split('馃').join('�'); changes.push('馃->?'); }

  // Fix 鈥 sequences - these are garbled em dashes and smart quotes
  // Common patterns:
  html = html.split('鈥橮').join("'");    // '
  html = html.split('鈥橠').join("'");    // '
  html = html.split('鈥檙').join("'");    // '
  html = html.split('鈥檚').join("'s");   // 's
  html = html.split('鈥檛').join("'");    // '
  html = html.split('鈥檒').join("'");    // '
  html = html.split('鈥檓').join("'");    // '
  html = html.split('鈥檃').join("'");    // '
  html = html.split('鈥檌').join("'");    // '
  html = html.split('鈥?鈥擨').join("—"); // em dash before I
  html = html.split('鈥?').join("'");     // generic smart quote

  // Fix remaining standalone 鈥
  if (html.includes('鈥')) {
    html = html.split('鈥').join('—');
    changes.push('鈥->—');
  }

  // Fix 鈱 -> bullet
  if (html.includes('鈱')) { html = html.split('鈱').join('•'); changes.push('鈱->•'); }

  // Fix 槕
  if (html.includes('槕')) { html = html.split('槕').join('🎮'); changes.push('槕->🎮'); }

  // Fix 揘, 揗
  if (html.includes('揘')) { html = html.split('揘').join('—'); changes.push('揘->—'); }
  if (html.includes('揗')) { html = html.split('揗').join('—'); changes.push('揗->—'); }

  fs.writeFileSync(file, html);
  if (changes.length > 0) {
    console.log(file.split('/')[1] + ': ' + changes.join(', '));
  } else {
    console.log(file.split('/')[1] + ': 无变化');
  }
});

console.log('完成');
