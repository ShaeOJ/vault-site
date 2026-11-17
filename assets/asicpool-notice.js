/* ASICpool cross-promo announcement.
 *
 * TheVault's proxy mode needs an upstream pool if you don't run a full node —
 * ASICpool is the free, 0%-fee solo pool this project is built alongside.
 * Reuses the same overlay/box CSS as the beta notice, but is a separate,
 * independently-dismissed popup, shown only after the beta notice (if
 * present) has closed so visitors never see two modals stacked.
 */
(function asicpoolNotice() {
  var NOTICE_VERSION = '2026-11-asicpool-launch';
  var KEY = 'urs.asicpoolNotice';

  try {
    if (localStorage.getItem(KEY) === NOTICE_VERSION) return;
  } catch (e) {
    /* storage blocked (private mode) — show it, just don't persist */
  }

  function dismiss(overlay) {
    overlay.classList.remove('show');
    try { localStorage.setItem(KEY, NOTICE_VERSION); } catch (e) {}
    setTimeout(function () { overlay.remove(); }, 320);
  }

  function build() {
    var overlay = document.createElement('div');
    overlay.className = 'beta-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'asicpoolTitle');

    overlay.innerHTML = [
      '<div class="beta-box">',
      '  <div class="beta-scan" aria-hidden="true"></div>',
      '  <div class="beta-eyebrow">&#9670; Partner Pool &#9670;</div>',
      '  <h2 class="beta-title" id="asicpoolTitle">NO FULL NODE? MINE ANYWAY</h2>',
      '  <p class="beta-lede">TheVault\'s <b>proxy mode</b> can relay your whole miner fleet straight to',
      '     <b>ASICpool</b> &mdash; a free, 0%-fee solo pool with presets built right into the app.</p>',
      '  <ul class="beta-list">',
      '    <li>Solo payouts, direct to your wallet &mdash; the pool never takes custody.</li>',
      '    <li>BTC, BCH, DigiByte, Bitcoin SV, and Bitcoin Silver all supported.</li>',
      '    <li>Pick an ASICpool preset in TheVault\'s Mining tab and you\'re connected in seconds.</li>',
      '  </ul>',
      '  <p class="beta-foot">No signup, no KYC &mdash; just point your miners at it.</p>',
      '  <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">',
      '    <a class="beta-btn" href="https://asicpool.space" target="_blank" rel="noopener">Visit ASICpool &rarr;</a>',
      '    <button class="beta-btn" type="button" style="background:transparent; color:var(--muted); border:1px solid var(--line); box-shadow:none;">Maybe later</button>',
      '  </div>',
      '</div>'
    ].join('');

    var close = function () { dismiss(overlay); };
    var buttons = overlay.querySelectorAll('.beta-btn');
    buttons[buttons.length - 1].addEventListener('click', close); // "Maybe later"
    buttons[0].addEventListener('click', close); // visiting also counts as seen
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape' && document.body.contains(overlay)) {
        close();
        document.removeEventListener('keydown', onKey);
      }
    });

    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('show'); });
  }

  // Don't stack on top of the beta notice — wait for it to clear first.
  function waitThenShow() {
    var tries = 0;
    (function poll() {
      if (!document.querySelector('.beta-overlay')) { build(); return; }
      if (++tries > 100) return; // ~20s safety cap, give up quietly
      setTimeout(poll, 200);
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitThenShow);
  } else {
    waitThenShow();
  }
})();
