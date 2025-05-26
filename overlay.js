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
    ${['home','pnl','sniper','copy','wallet','twitter','coin','autobuy','autosell','alpha','utils','dev','rug'].map(id => `
      <div id="${id}" class="panel-content${id === 'home' ? ' active' : ''}">
        <h3>${document.querySelector(`.menu-item[onclick*='${id}']`).innerText}</h3>
        <div class="toggle">
          <label>Enable ${id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')}</label>
          <label class="switch"><input type="checkbox"><span class="slider"></span></label>
        </div>
        ${id === 'rug' ? `
          <div class="input-row"><label>Trigger Loss % (e.g. -25)</label><input type="text" placeholder="-25"></div>
          <div class="input-row"><label>Auto-Sell If Drop Predicted > %</label><input type="text" placeholder="70"></div>
          <div class="toggle">
            <label>Instant Exit Enabled</label>
            <label class="switch"><input type="checkbox"><span class="slider"></span></label>
          </div>` : ''}
      </div>
    `).join('')}
  </div>
`;
document.body.appendChild(overlay);

function showPanel(id) {
  const panels = document.querySelectorAll('#tradingOverlay .panel-content');
  panels.forEach(div => div.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  } else {
    console.warn('Panel not found:', id);
  }
}

showPanel('home');
