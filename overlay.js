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
      width: 240px; backgr...
}
