/* Beta notice: tells visitors plainly that TheVault (and this whole software
 * hub) is under active development before they point real hardware/funds at
 * it. Self-contained — static page, no backend — so dismissal is remembered
 * in localStorage.
 *
 * Shown once per version per browser. Bump NOTICE_VERSION to re-show it after
 * a materially different announcement.
 */
(function betaNotice() {
  var NOTICE_VERSION = '2026-11-thevault-launch';
  var KEY = 'urs.betaNotice';

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
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'betaTitle');

    overlay.innerHTML = [
      '<div class="beta-box">',
      '  <div class="beta-scan" aria-hidden="true"></div>',
      '  <div class="beta-eyebrow">&#9670; Software Notice &#9670;</div>',
      '  <h2 class="beta-title" id="betaTitle">THIS PROJECT IS IN BETA</h2>',
      '  <p class="beta-lede"><b>TheVault is at v1.0.0-beta</b> &mdash; the first',
      '     release of this download hub. Everything here is built and run by one',
      '     person, in the open, for fun and for learning.</p>',
      '  <ul class="beta-list">',
      '    <li>Expect rough edges, missing platforms, and the occasional breaking update without notice.</li>',
      '    <li>Installers are unsigned &mdash; Windows SmartScreen will warn. Verify the SHA-256 checksum before running anything.</li>',
      '    <li>Always back up wallet keys / configs before updating mining software.</li>',
      '    <li>Not an investment pitch &mdash; this is free, open-source software.</li>',
      '  </ul>',
      '  <p class="beta-foot">More apps land here over time.</p>',
      '  <button class="beta-btn" type="button">Understood</button>',
      '</div>'
    ].join('');

    var close = function () { dismiss(overlay); };
    overlay.querySelector('.beta-btn').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();            // click the backdrop
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape' && document.body.contains(overlay)) {
        close();
        document.removeEventListener('keydown', onKey);
      }
    });

    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('show'); });
    overlay.querySelector('.beta-btn').focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
