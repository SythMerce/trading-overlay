// Create overlay container
const overlay = document.createElement('div');
overlay.id = 'tradingOverlay';
overlay.innerHTML = `
  <style>
    :root {
      --bg: #0f0f0f;
      --panel: #1c1c1e;
      --neon: #00ff9c;
      --text: #e0e0e0;
      --accent: #ff3cac;
    }
    * {
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }
    #tradingOverlay {
      position: fixed; top: 0; left: 0; height: 100vh; width: 100vw;
      background-color: rgba(15, 15, 15, 0.95); z-index: 99999; display: flex; color: var(--text);
    }
    .sidebar {
      width: 280px; background-color: var(--panel); padding: 1rem; border-right: 2px solid var(--neon); overflow-y: auto;
    }
    .sidebar h2 {
      color: var(--neon); font-size: 1.5rem; margin-bottom: 1rem;
    }
    .menu-item {
      margin-bottom: 0.75rem; cursor: pointer; color: var(--text); font-size: 1.1rem;
    }
    .menu-item:hover {
      color: var(--accent);
    }
    .panel {
      flex-grow: 1; padding: 2rem; background-color: var(--bg); overflow-y: auto;
    }
    .hidden {
      display: none;
    }
    .input-row {
      margin: 1.5rem 0;
    }
    label {
      display: block; margin-bottom: 0.5rem; font-size: 1rem;
    }
    input[type="text"], input[type="number"], textarea {
      background-color: #222; color: var(--text); padding: 0.6rem; border: 1px solid var(--neon); width: 100%; font-size: 1rem;
    }
    textarea {
      resize: vertical;
    }
    .toggle {
      display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .toggle-switch {
      position: relative; width: 50px; height: 26px;
    }
    .toggle-switch input {
      opacity: 0; width: 0; height: 0;
    }
    .slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #555; transition: .4s; border-radius: 34px;
    }
    .slider:before {
      position: absolute; content: ""; height: 18px; width: 18px; left: 4px; bottom: 4px;
      background-color: white; transition: .4s; border-radius: 50%;
    }
    input:checked + .slider {
      background-color: var(--neon);
    }
    input:checked + .slider:before {
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
  <div class="panel" id="panelContainer">
    <!-- Panels will be dynamically inserted here -->
  </div>
`;

document.body.appendChild(overlay);

const panels = {
  home: `
    <h3>🏠 Dashboard</h3>
    <div class="input-row"><label>All-Time PnL</label><input type="text" value="+420.69 SOL"></div>
    <div class="input-row"><label>Daily PnL</label><input type="text" value="+69.42 SOL"></div>
    <div class="input-row"><label>Total SOL Earned</label><input type="text" value="123.456 SOL"></div>
    <div class="input-row"><label>% Gain</label><input type="text" value="+9999%"></div>
  `,
  pnl: `
    <h3>📉 PnL Tracker</h3>
    <div class="toggle"><label>Enable PnL Tracker</label>${toggleHTML()}</div>
    <div class="input-row"><label>Entry Price</label><input type="text"></div>
    <div class="input-row"><label>Exit Price</label><input type="text"></div>
    <div class="input-row"><label>Current Price</label><input type="text"></div>
    <div class="input-row"><label>Gas/Fees</label><input type="text"></div>
  `,
  sniper: `
    <h3>🎯 Auto Sniper</h3>
    <div class="toggle"><label>Enable Auto Sniper</label>${toggleHTML()}</div>
    <div class="input-row"><label>Buy Delay (ms)</label><input type="text"></div>
    <div class="input-row"><label>Sell Delay (ms)</label><input type="text"></div>
    <div class="input-row"><label>Max Slippage %</label><input type="text"></div>
    <div class="input-row"><label>Token CA</label><input type="text"></div>
  `,
  copy: `
    <h3>👥 Copy Trading</h3>
    <div class="toggle"><label>Enable Copy Trading</label>${toggleHTML()}</div>
    <div class="input-row"><label>Wallets to Copy</label><textarea rows="4"></textarea></div>
    <div class="input-row"><label>Mirror %</label><input type="text"></div>
    <div class="input-row"><label>Max Trade Per Wallet</label><input type="text"></div>
  `,
  wallet: `
    <h3>👛 Wallet Tracker</h3>
    <div class="toggle"><label>Enable Wallet Tracker</label>${toggleHTML()}</div>
    <div class="input-row"><label>Tracked Wallets</label><textarea rows="5"></textarea></div>
    <div class="input-row"><label>Alert On Movement</label>${toggleHTML()}</div>
  `,
  twitter: `
    <h3>🐦 Twitter Tracker</h3>
    <div class="toggle"><label>Enable Twitter Tracker</label>${toggleHTML()}</div>
    <div class="input-row"><label>Handles</label><textarea rows="4" placeholder="@elonmusk\n@cz_binance"></textarea></div>
    <div class="input-row"><label>Keyword Filters</label><input type="text" placeholder="launch, token, presale"></div>
    <div class="input-row"><label>Minimum Followers</label><input type="number"></div>
  `,
  coin: `
    <h3>🪙 Coin Tracker</h3>
    <div class="toggle"><label>Enable Coin Tracker</label>${toggleHTML()}</div>
    <div class="input-row"><label>Watchlist Tokens</label><input type="text" placeholder="CAKE, BONK"></div>
    <div class="input-row"><label>Alert if Price Spikes/Drops (%)</label><input type="text"></div>
  `,
  autobuy: `
    <h3>🤖 Auto Buyer</h3>
    <div class="toggle"><label>Enable Auto Buyer</label>${toggleHTML()}</div>
    <div class="input-row"><label>Max Buy Amount</label><input type="text"></div>
    <div class="input-row"><label>Conditions</label><input type="text" placeholder="e.g. after tweet, listing"></div>
  `,
  autosell: `
    <h3>🤖 Auto Seller</h3>
    <div class="toggle"><label>Enable Auto Seller</label>${toggleHTML()}</div>
    <div class="input-row"><label>Take-Profit %</label><input type="text"></div>
    <div class="input-row"><label>Stop-Loss %</label><input type="text"></div>
    <div class="input-row"><label>Trailing Stop %</label><input type="text"></div>
  `,
  alpha: `
    <h3>📡 Alpha & Signals</h3>
    <div class="toggle"><label>Enable Alpha Feed</label>${toggleHTML()}</div>
    <div class="toggle"><label>Enable Call Alerts</label>${toggleHTML()}</div>
    <div class="input-row"><label>Discord Links</label><textarea></textarea></div>
    <div class="input-row"><label>Telegram Handles</label><textarea></textarea></div>
  `,
  utils: `
    <h3>🧰 Utilities</h3>
    <div class="toggle"><label>Enable TX Builder</label>${toggleHTML()}</div>
    <div class="toggle"><label>Enable Token Checker</label>${toggleHTML()}</div>
    <div class="toggle"><label>Enable Mempool Viewer</label>${toggleHTML()}</div>
  `,
  dev: `
    <h3>🛠️ Dev Tools</h3>
    <div class="toggle"><label>Enable Contract Interactor</label>${toggleHTML()}</div>
    <div class="toggle"><label>Enable Honeypot Checker</label>${toggleHTML()}</div>
    <div class="toggle"><label>Enable Gas Estimator</label>${toggleHTML()}</div>
  `,
  rug: `
    <h3>🚨 Anti Rug Pull</h3>
    <div class="toggle"><label>Enable Anti-Rug Detection</label>${toggleHTML()}</div>
    <div class="input-row"><label>Trigger Loss %</label><input type="text"></div>
    <div class="input-row"><label>Prediction Threshold % Drop</label><input type="text"></div>
    <div class="toggle"><label>Instant Exit Enabled</label>${toggleHTML()}</div>
  `
};

function toggleHTML() {
  return `
    <label class="toggle-switch">
      <input type="checkbox">
      <span class="slider"></span>
    </label>
  `;
}

function showPanel(id) {
  const container = document.getElementById('panelContainer');
  container.innerHTML = panels[id] || '<p>Section not found.</p>';
}

showPanel('home');
