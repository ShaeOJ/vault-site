/* Retro hit counter for the footer. One increment per page load (no
 * dedup/uniqueness tracking — simple total-visits count), backed by a tiny
 * self-hosted Python service on the VPS (see /opt/vault-counter on
 * vpsproxy), proxied at /api/visits. Fails silently if unreachable. */
(function () {
  var el = document.getElementById('visitCount');
  if (!el) return;
  fetch('/api/visits', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (typeof d.count === 'number') {
        el.textContent = 'Visit #' + d.count.toLocaleString();
      } else {
        el.remove();
      }
    })
    .catch(function () { el.remove(); });
})();
