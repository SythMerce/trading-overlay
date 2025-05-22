// Create overlay container
const overlay = document.createElement('div');
overlay.id = 'tradingOverlay';
overlay.innerHTML = `
  <style>
    :root {
      --bg: #111;
      --panel: #1a1a1a;
      --neon: #39ff14;
      --text: #ccc;
    }
    * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
    #tradingOverlay {
      position: fixed; top: 0; left: 0; height: 100vh; width: 100vw;
      background-color: rgba(0, 0, 0, 0.8); z-index: 99999; display: flex; color: var(--text);
    }
    .sidebar {
      width: 260px; background-color: var(--panel); padding: 1rem; border-right: 2px solid var(--neon); overflow-y: auto;
    }
    .sidebar h2 {
      color: var(--neon); font-size: 1.2rem; margin-bottom: 1rem;
    }
    .menu-item {
      margin-bottom: 0.5rem; cursor: pointer; color: var(--text);
    }
    .menu-item:hover {
      color: var(--neon);
    }
    .panel {
      flex-grow: 1; padding: 2rem; background-color: var(--bg); overflow-y: auto;
    }
    .hidden {
      display: none;
    }
    .input-row {
      margin: 1rem 0;
    }
    label {
      display: block; margin-bottom: 0.2rem;
    }
    input[type="text"], input[type="number"] {
      background-color: #222;
      color: var(--text);
      padding: 0.5rem;
      border: 1px solid var(--neon);
      width: 100%;
    }
    .toggle {
      display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;
    }
    .toggle input[type="checkbox"] {
      width: 20px; height: 20px;
    }
    .toggle label {
      margin: 0;
    }
  </style>
  <div class="sidebar">
    <h2>Trader UI</h2>
    <div class="menu-item" onclick="showPanel('home')">🏠 Home</div>
    <div class="menu-item" onclick="showPanel('pnl')">📉 PnL Tracker</div>
    <div class="menu-item" onclick="showPanel('sniper')">🎯 Auto Sniper</div>
    <div class="menu-item" onclick="showPanel('copy')">👥 Copy Trading</div>
    <div class="menu-item" onclick="showPanel('wallet')">👛 Wallet Tracker</div>
    <div class="menu-item" onclick="showPanel('twitter')">🐦 Twitter Tracker</div>
    <div class="menu-item" onclick="showPanel('coin')">🪙 Coin Tracker</div>
    <div class="menu-item" onclick="showPanel('autobuy')">🤖 Auto Buyer</div>
    <div class="menu-item" onclick="showPanel('autosell')">🤖 Auto Seller</div>
    <div class="menu-item" onclick="showPanel('alpha')">📡 Alpha & Signals</div>
    <div class="menu-item" onclick="showPanel('utils')">🧰 Utilities</div>
    <div class="menu-item" onclick="showPanel('dev')">🛠️ Dev Tools</div>
    <div class="menu-item" onclick="showPanel('rug')">🚨 Anti Rug Pull</div>
  </div>
  <div class="panel">
    <div id="home">
      <h3>🏠 Dashboard</h3>
      <div class="input-row"><label>All-Time PnL</label><input type="text" value="+420.69 SOL"></div>
      <div class="input-row"><label>Daily PnL</label><input type="text" value="+69.42 SOL"></div>
      <div class="input-row"><label>Total SOL Earned</label><input type="text" value="123.456 SOL"></div>
      <div class="input-row"><label>% Gain</label><input type="text" value="+9999%"></div>
    </div>
    <!-- other panels remain unchanged -->
    <div id="rug" class="hidden">
      <h3>🚨 Anti Rug Pull</h3>
      <div class="toggle"><input type="checkbox"><label>Enable Anti-Rug Protection</label></div>
      <div class="input-row"><label>Trigger Loss % (e.g. -25)</label><input type="text" placeholder="-25"></div>
      <div class="input-row"><label>Auto-Sell If Drop Predicted &gt; %</label><input type="text" placeholder="70"></div>
      <div class="toggle"><input type="checkbox"><label>Instant Exit Enabled</label></div>
    </div>
  </div>
`;
document.body.appendChild(overlay);

function showPanel(id) {
  document.querySelectorAll('#tradingOverlay .panel > div').forEach(div => div.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

showPanel('home');
