const fs = require('fs');
let s = fs.readFileSync('src/js/main.js', 'utf8');

const newFns = `

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
`;

s = s.replace('function renderDashboardFavorites(contOverride) {', newFns + '\nfunction renderDashboardFavorites(contOverride) {');

fs.writeFileSync('src/js/main.js', s, 'utf8');
try { require('child_process').execSync('node --check src/js/main.js', {stdio:'inherit'}); console.log('✅'); } catch(e) { console.log('❌'); }
