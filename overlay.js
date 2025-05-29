document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");
  app.innerHTML = `
    <style>
      body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #111;
        color: white;
      }
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        width: 250px;
        height: 100%;
        background-color: #1e1e1e;
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
        overflow-y: auto;
      }
      .sidebar h2 {
        color: #4CAF50;
        margin-bottom: 20px;
      }
      .sidebar ul {
        list-style: none;
        padding: 0;
      }
      .sidebar ul li {
        padding: 10px;
        cursor: pointer;
        color: #ccc;
      }
      .sidebar ul li:hover {
        background-color: #333;
      }
      .content {
        margin-left: 270px;
        padding: 40px;
      }
      .hidden {
        display: none;
      }
      .center-header {
        text-align: center;
      }
      .center-header h1 {
        font-size: 48px;
        color: lime;
        margin: 0;
      }
      .center-header h2 {
        font-size: 24px;
        color: limegreen;
        margin: 0 0 40px;
      }
      .stats-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }
      .stats {
        font-size: 24px;
        line-height: 2;
      }
      .stats span {
        color: teal;
        font-weight: bold;
      }
      .logo img {
        max-width: 120px;
        height: auto;
      }
      .section {
        margin-bottom: 20px;
      }
      .section input, .section textarea {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        background: #222;
        border: 1px solid #444;
        color: white;
        border-radius: 4px;
      }
    </style>

    <div class="sidebar">
      <h2>Overlay Menu</h2>
      <ul>
        <li onclick="showSection('home')">Home</li>
        <li onclick="showSection('pnlTracker')">PnL Tracker</li>
        <li onclick="showSection('walletTracker')">Wallet Tracker</li>
        <li onclick="showSection('twitterTracker')">Twitter Tracker</li>
        <li onclick="showSection('autoSniper')">Auto Sniper</li>
        <li onclick="showSection('copyTrading')">Copy Trading</li>
        <li onclick="showSection('coinTracker')">Coin Tracker</li>
        <li onclick="showSection('autoBuyer')">Auto Buyer</li>
        <li onclick="showSection('autoSeller')">Auto Seller</li>
        <li onclick="showSection('alphaSignals')">Alpha & Signals</li>
        <li onclick="showSection('utilities')">Utilities</li>
        <li onclick="showSection('devTools')">Dev Tools</li>
        <li onclick="showSection('antiRugPull')">Anti Rug Pull</li>
      </ul>
    </div>

    <div class="content">
      <div id="home" class="page">
        <div class="center-header">
          <h1>Home</h1>
          <h2>Uxento.gg Advanced Tools</h2>
        </div>
        <div class="stats-container">
          <div class="stats">
            <p>Total SOL Earned: <span>+127.14 SOL</span></p>
            <p>All time PnL: <span>2386%</span></p>
            <p>Daily SOL Earned: <span>+4.78 SOL</span></p>
            <p>% Gain: <span>128%</span></p>
          </div>
          <div class="logo">
            <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=029" alt="Solana Logo">
          </div>
        </div>
      </div>

      <div id="pnlTracker" class="page hidden">
        <h1>PnL Tracker</h1>
        <div class="section">
          <label>Track your profits and losses over time</label>
          <textarea placeholder="Enter your PnL data or connect to portfolio..."></textarea>
        </div>
      </div>

      <div id="walletTracker" class="page hidden">
        <h1>Wallet Tracker</h1>
        <div class="section">
          <label>Enter wallet addresses to monitor:</label>
          <textarea placeholder="Paste wallet addresses here..."></textarea>
        </div>
      </div>

      <div id="twitterTracker" class="page hidden">
        <h1>Twitter Tracker</h1>
        <div class="section">
          <label>Accounts or keywords to follow:</label>
          <textarea placeholder="e.g. @elonmusk, #memecoin"></textarea>
        </div>
      </div>

      <div id="autoSniper" class="page hidden">
        <h1>Auto Sniper</h1>
        <div class="section">
          <label>Sniping Parameters</label>
          <textarea placeholder="Set token, slippage, snipe timing..."></textarea>
        </div>
      </div>

      <div id="copyTrading" class="page hidden">
        <h1>Copy Trading</h1>
        <div class="section">
          <label>Wallets to copy:</label>
          <textarea placeholder="Paste wallets to copy trades from..."></textarea>
        </div>
      </div>

      <div id="coinTracker" class="page hidden">
        <h1>Coin Tracker</h1>
        <div class="section">
          <label>Watchlist</label>
          <textarea placeholder="Enter token names or addresses..."></textarea>
        </div>
      </div>

      <div id="autoBuyer" class="page hidden">
        <h1>Auto Buyer</h1>
        <div class="section">
          <label>Auto-buy settings</label>
          <textarea placeholder="Token, conditions, frequency..."></textarea>
        </div>
      </div>

      <div id="autoSeller" class="page hidden">
        <h1>Auto Seller</h1>
        <div class="section">
          <label>Auto-sell rules</label>
          <textarea placeholder="Profit targets, stop-loss, % dump..."></textarea>
        </div>
      </div>

      <div id="alphaSignals" class="page hidden">
        <h1>Alpha & Signals</h1>
        <div class="section">
          <label>Signals feed / Alpha groups:</label>
          <textarea placeholder="Paste links or signals channels..."></textarea>
        </div>
      </div>

      <div id="utilities" class="page hidden">
        <h1>Utilities</h1>
        <div class="section">
          <label>Misc tools:</label>
          <textarea placeholder="Gas checker, wallet viewer, etc..."></textarea>
        </div>
      </div>

      <div id="devTools" class="page hidden">
        <h1>Dev Tools</h1>
        <div class="section">
          <label>Developer options:</label>
          <textarea placeholder="API endpoints, testnet tools..."></textarea>
        </div>
      </div>

      <div id="antiRugPull" class="page hidden">
        <h1>Anti Rug Pull</h1>
        <div class="section">
          <label>Check token safety:</label>
          <textarea placeholder="Paste token address for analysis..."></textarea>
        </div>
      </div>
    </div>
  `;

  // ✅ Define this after injecting HTML
  window.showSection = function (sectionId) {
    const sections = document.querySelectorAll(".page");
    sections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
  };
});
