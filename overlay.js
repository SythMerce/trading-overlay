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
    * {
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }
    #tradingOverlay {
      position: fixed; top: 0; left: 0; height: 100vh; width: 100vw;
      background-color: rgba(0, 0, 0, 0.95); z-index: 99999; display: flex; color: var(--text);
    }
    .sidebar {
      width: 260px; background-color: var(--panel); padding: 1rem; border-right: 2px solid var(--neon); overflow-y: auto;
    }
    .sidebar h2 {
      color: var(--neon); font-size: 1.2rem; margin-bottom: 1rem;
    }
    .menu-item {
      margin-bottom: 0.75rem; cursor: pointer; color: var(--text);
      padding: 0.5rem; border-radius: 5px; transition: background 0.2s;
    }
    .menu-item:hover {
      background-color: #2a2a2a;
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
      display: block; margin-bottom: 0.3rem;
    }
    input[type="text"], input[type="number"] {
      background-color: #222;
      color: var(--text);
      padding: 0.6rem;
      border: 1px solid var(--neon);
      width: 100%;
      border-radius: 5px;
    }
    .toggle-switch {
      position: relative; display: inline-block; width: 50px; height: 24px;
    }
    .toggle-switch input {
      opacity: 0; width: 0; height: 0;
    }
    .slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #444; transition: 0.4s; border-radius: 24px;
    }
    .slider:before {
      position: absolute; content: ""; height: 18px; width: 18px;
      left: 3px; bottom: 3px; background-color: white;
      transition: 0.4s; border-radius: 50%;
    }
    .toggle-switch input:checked + .slider {
      background-color: var(--neon);
    }
    .toggle-switch input:checked + .slider:before {
      transform: translateX(26px);
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
      <h1 style="font-size: 3rem; color: var(--neon); margin-bottom: 0.5rem;">Home</h1>
      <h2 style="font-size: 1.5rem; color: var(--neon); margin-bottom: 2rem;">Uxento.gg Advanced Tools</h2>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="font-size: 1.5rem; color: white; line-height: 2.5rem;">
          <div>Total SOL Earned</div>
          <div>All time PnL:</div>
          <div>Daily PnL</div>
          <div>% Gain</div>
        </div>
        <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="Solana Logo" style="height: 120px;">
      </div>
    </div>
    <div id="pnl" class="hidden">
      <h3>📉 PnL Tracker</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable PnL Tracker
    </div>
    <div id="sniper" class="hidden">
      <h3>🎯 Auto Sniper</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Auto Sniper
      <div class="input-row"><label>Buy Delay (ms)</label><input type="text" placeholder="500"></div>
      <div class="input-row"><label>Sell Delay (ms)</label><input type="text" placeholder="1000"></div>
    </div>
    <div id="copy" class="hidden">
      <h3>👥 Copy Trading</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Copy Trading
      <div class="input-row"><label>Wallets to Copy</label><input type="text" placeholder="0xABC123..."></div>
      <div class="input-row"><label>Mirror %</label><input type="text" placeholder="100"></div>
    </div>
    <div id="wallet" class="hidden">
      <h3>👛 Wallet Tracker</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Wallet Tracker
      <div class="input-row"><label>Paste Wallet Addresses (comma separated)</label><input type="text" placeholder="0xABC123..., 0xDEF456..."></div>
    </div>
    <div id="twitter" class="hidden">
      <h3>🐦 Twitter Tracker</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Twitter Tracker
      <div class="input-row"><label>Handles or Keywords</label><input type="text" placeholder="@elonmusk, $BONK"></div>
    </div>
    <div id="coin" class="hidden">
      <h3>🪙 Coin Tracker</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Coin Tracker
      <div class="input-row"><label>Token List</label><input type="text" placeholder="CAKE, BONK"></div>
    </div>
    <div id="autobuy" class="hidden">
      <h3>🤖 Auto Buyer</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Auto Buyer
    </div>
    <div id="autosell" class="hidden">
      <h3>🤖 Auto Seller</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Auto Seller
    </div>
    <div id="alpha" class="hidden">
      <h3>📡 Alpha & Signals</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Alpha Feed
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Call Alerts
    </div>
    <div id="utils" class="hidden">
      <h3>🧰 Utilities</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable TX Builder
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Token Checker
    </div>
    <div id="dev" class="hidden">
      <h3>🛠️ Dev Tools</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Contract Interactor
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Honeypot Checker
    </div>
    <div id="rug" class="hidden">
      <h3>🚨 Anti Rug Pull</h3>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Enable Anti-Rug Protection
      <div class="input-row"><label>Trigger Loss % (e.g. -25)</label><input type="text" placeholder="-25"></div>
      <div class="input-row"><label>Auto-Sell If Drop Predicted > %</label><input type="text" placeholder="70"></div>
      <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label> Instant Exit Enabled
    </div>
  </div>
`;
document.body.appendChild(overlay);

function showPanel(id) {
  document.querySelectorAll('#tradingOverlay .panel > div').forEach(div => div.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

showPanel('home');
