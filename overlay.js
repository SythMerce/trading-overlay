// Create overlay container
const overlay = document.createElement('div');
overlay.id = 'tradingOverlay';
overlay.innerHTML = `
  <style>
    :root {
      --bg: #0e0e0e;
      --panel: #1b1b1b;
      --neon: #00ffc3;
      --text: #e0e0e0;
      --accent: #00c896;
      --font: 'Segoe UI', sans-serif;
    }
    * {
      box-sizing: border-box;
      font-family: var(--font);
    }
    #tradingOverlay {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.85);
      z-index: 99999;
      display: flex;
      color: var(--text);
    }
    .sidebar {
      width: 280px;
      background-color: var(--panel);
      padding: 1.5rem;
      border-right: 2px solid var(--neon);
      overflow-y: auto;
    }
    .sidebar h2 {
      color: var(--neon);
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
    .menu-item {
      margin-bottom: 1rem;
      cursor: pointer;
      font-size: 1.2rem;
      color: var(--text);
      transition: color 0.3s;
    }
    .menu-item:hover {
      color: var(--neon);
    }
    .content-area {
      flex-grow: 1;
      padding: 2rem;
      background-color: var(--bg);
      overflow-y: auto;
    }
    .panel-content {
      display: none;
    }
    .panel-content.active {
      display: block;
    }
    .input-row {
      margin: 1.5rem 0;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    input[type="text"], input[type="number"] {
      background-color: #222;
      color: var(--text);
      padding: 0.75rem;
      border: 1px solid var(--accent);
      width: 100%;
      font-size: 1rem;
    }
    .toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 26px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #444;
      transition: 0.4s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: var(--neon);
      transition: 0.4s;
      border-radius: 50%;
    }
    .switch input:checked + .slider {
      background-color: #2bffc6;
    }
    .switch input:checked + .slider:before {
      transform: translateX(24px);
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
  <div class="content-area">
    <div id="home" class="panel-content active">
      <h3>🏠 Dashboard</h3>
      <div class="input-row"><label>All-Time PnL</label><input type="text" value="+420.69 SOL"></div>
      <div class="input-row"><label>Daily PnL</label><input type="text" value="+69.42 SOL"></div>
      <div class="input-row"><label>Total SOL Earned</label><input type="text" value="123.456 SOL"></div>
      <div class="input-row"><label>% Gain</label><input type="text" value="+9999%"></div>
    </div>
    ${[
      { id: 'pnl', title: 'PnL Tracker' },
      { id: 'sniper', title: 'Auto Sniper' },
      { id: 'copy', title: 'Copy Trading' },
      { id: 'wallet', title: 'Wallet Tracker' },
      { id: 'twitter', title: 'Twitter Tracker' },
      { id: 'coin', title: 'Coin Tracker' },
      { id: 'autobuy', title: 'Auto Buyer' },
      { id: 'autosell', title: 'Auto Seller' },
      { id: 'alpha', title: 'Alpha & Signals' },
      { id: 'utils', title: 'Utilities' },
      { id: 'dev', title: 'Dev Tools' },
      { id: 'rug', title: 'Anti Rug Pull' }
    ].map(panel => `
      <div id="${panel.id}" class="panel-content">
        <h3>${panel.title}</h3>
        <div class="toggle">
          <label>Enable ${panel.title}</label>
          <label class="switch"><input type="checkbox"><span class="slider"></span></label>
        </div>
        ${panel.id === 'rug' ? `
        <div class="input-row"><label>Trigger Loss % (e.g. -25)</label><input type="text" placeholder="-25"></div>
        <div class="input-row"><label>Auto-Sell If Drop Predicted > %</label><input type="text" placeholder="70"></div>
        <div class="toggle">
          <label>Instant Exit Enabled</label>
          <label class="switch"><input type="checkbox"><span class="slider"></span></label>
        </div>
        ` : ''}
      </div>`).join('')}
  </div>
`;

document.body.appendChild(overlay);

function showPanel(id) {
  document.querySelectorAll('.panel-content').forEach(div => div.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}
