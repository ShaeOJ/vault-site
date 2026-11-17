# vault-site

Source for [vault.undergroundroots.ca](https://vault.undergroundroots.ca) — a small static download hub for open-source software built by Shae Jones Thomson. First release: [TheVault](https://github.com/ShaeOJ/GoVault), a Stratum V1 solo/proxy mining app.

Plain static HTML/CSS/JS, no build step, no backend. Deployed by copying `index.html`, `assets/`, and `downloads/` to the webroot behind nginx.

Large release binaries live under `downloads/` but are gitignored (deployed out-of-band) — only checksums are tracked here.
